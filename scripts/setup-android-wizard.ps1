# Setup Android build environment for Windows.
# Run: Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process; .\scripts\setup-android-wizard.ps1

$ErrorActionPreference = 'Stop'

function Read-Default {
    param($Prompt, $Default)
    $v = Read-Host "$Prompt [Default: $Default]"
    if ([string]::IsNullOrWhiteSpace($v)) { return $Default }
    return $v
}

function Write-Banner {
    param([string]$Title, [int]$Stage, [int]$TotalStages)
    Write-Host "`n=== $Title (Stage $Stage of $TotalStages) ===`n" -ForegroundColor Cyan
}

$EnvFile = "scripts/android-env.ps1"
$Stages = 5
$CurrentStage = 1

Write-Host "Android Build Setup Wizard" -ForegroundColor Yellow

# Stage 1: JDK
Write-Banner "JDK 17" $CurrentStage $Stages; $CurrentStage++
$JavaHome = [System.Environment]::GetEnvironmentVariable('JAVA_HOME', 'User')
if (-not $JavaHome) {
    try { $JavaHome = (Get-Command javac).Path | Split-Path | Split-Path } catch { $JavaHome = "" }
}

if (-not $JavaHome -or -not (Test-Path "$JavaHome/bin/javac.exe")) {
    Write-Host "JDK 17 not found."
    Start-Process "https://adoptium.net/?variant=openjdk17&jvmVariant=hotspot"
    $JavaHome = Read-Default "Enter path to JDK 17" "C:\Program Files\Eclipse Adoptium\jdk-17.0.12+7-hotspot"
}
Write-Host "Using JAVA_HOME: $JavaHome"

# Stage 2: Android SDK
Write-Banner "Android SDK" $CurrentStage $Stages; $CurrentStage++
$AndroidHome = [System.Environment]::GetEnvironmentVariable('ANDROID_HOME', 'User')
if (-not $AndroidHome) {
    try { $AndroidHome = (Get-Command adb.exe).Path | Split-Path | Split-Path | Split-Path } catch { $AndroidHome = "" }
}

if (-not $AndroidHome -or -not (Test-Path "$AndroidHome/platform-tools/adb.exe")) {
    Write-Host "Android SDK not found."
    Start-Process "https://developer.android.com/studio#downloads"
    $DefaultSdk = "$env:LOCALAPPDATA\Android\Sdk"
    $AndroidHome = Read-Default "Enter path to Android SDK" $DefaultSdk
}
Write-Host "Using ANDROID_HOME: $AndroidHome"

# Write Env
@"
`$env:JAVA_HOME = '$JavaHome'
`$env:ANDROID_HOME = '$AndroidHome'
`$env:PATH += ';$JavaHome\bin'
`$env:PATH += ';$AndroidHome\platform-tools'
`$env:PATH += ';$AndroidHome\cmdline-tools\latest\bin'
"@ | Out-File $EnvFile

# Stage 3: SDK Components
Write-Banner "SDK Components" $CurrentStage $Stages; $CurrentStage++
$SdkMgr = "$AndroidHome\cmdline-tools\latest\bin\sdkmanager.bat"
if (Test-Path $SdkMgr) {
    Write-Host "Commands to run:"
    Write-Host "`"$SdkMgr`" --licenses"
    Write-Host "`"$SdkMgr`" `"platform-tools`" `"build-tools;35.0.0`" `"platforms;android-35`" `"ndk;26.1.10909125`""
    Read-Host "Run these manually or press Enter to continue"
} else {
    Write-Host "sdkmanager not found at $SdkMgr." -ForegroundColor Red
    Write-Host "Download command line tools from:"
    Write-Host "https://developer.android.com/studio#command-line-tools-only"
    Write-Host "Extract zip into folder named `latest` under: $AndroidHome\cmdline-tools"
    Start-Process "https://developer.android.com/studio#command-line-tools-only"
    Read-Host "Press Enter after extraction"
    if (-not (Test-Path $SdkMgr)) {
        Write-Host "Still missing. Check manual install." -ForegroundColor Red
    }
}

# Stage 4: Verify
Write-Banner "Verify" $CurrentStage $Stages; $CurrentStage++
$VerifyList = @(
    @{ Cmd = "`"$JavaHome\bin\java.exe`" -version"; Msg = "Java" },
    @{ Cmd = "`"$JavaHome\bin\javac.exe`" -version"; Msg = "Javac" },
    @{ Cmd = "$AndroidHome\platform-tools\adb.exe --version"; Msg = "ADB" },
    @{ Cmd = "npx expo --version"; Msg = "Expo" },
    @{ Cmd = ".\apps\mobile\android\gradlew.bat --version"; Msg = "Gradle" }
)
foreach ($Item in $VerifyList) {
    try { 
        Invoke-Expression $Item.Cmd 2>&1 | Out-Null
        Write-Host "$($Item.Msg): Pass" -ForegroundColor Green
    } catch { Write-Host "$($Item.Msg): Fail" -ForegroundColor Red }
}

# Stage 5: Persist
Write-Banner "Persist" $CurrentStage $Stages; $CurrentStage++
[Environment]::SetEnvironmentVariable('JAVA_HOME', $JavaHome, 'User')
[Environment]::SetEnvironmentVariable('ANDROID_HOME', $AndroidHome, 'User')
$Path = [Environment]::GetEnvironmentVariable('Path', 'User')
$NewPaths = @("$JavaHome\bin", "$AndroidHome\platform-tools", "$AndroidHome\cmdline-tools\latest\bin")
foreach ($P in $NewPaths) {
    if (-not $Path.Contains($P)) { $Path += ";$P" }
}
[Environment]::SetEnvironmentVariable('Path', $Path, 'User')
Write-Host "Environment variables set. Restart terminal to apply." -ForegroundColor Yellow
