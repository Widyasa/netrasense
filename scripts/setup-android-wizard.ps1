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
if (-not $JavaHome -or -not (Test-Path "$JavaHome\bin\javac.exe")) {
    $DefaultJdk = "C:\Program Files\Eclipse Adoptium\jdk-17.0.20.8-hotspot"
    $TemurinDir = "C:\Program Files\Eclipse Adoptium"
    if (Test-Path $TemurinDir) {
        $Found = Get-ChildItem -Path $TemurinDir -Filter "jdk-17.*" | Sort-Object Name -Descending
        if ($Found.Count -gt 0) { $DefaultJdk = $Found[0].FullName }
    }
    Write-Host "JDK 17 not found."
    Start-Process "https://adoptium.net/?variant=openjdk17&jvmVariant=hotspot"
    $JavaHome = Read-Default "Enter path to JDK 17" $DefaultJdk
    if (-not (Test-Path "$JavaHome\bin\javac.exe")) {
        Write-Host "javac.exe not found at $JavaHome. Please check the JDK path." -ForegroundColor Red
    }
Write-Host "Using JAVA_HOME: $JavaHome"
}

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
$CmdlineTools = Join-Path $AndroidHome "cmdline-tools"
$FoundMgr = Get-ChildItem -Path $CmdlineTools -Filter "sdkmanager.bat" -Recurse | Select-Object -First 1
if ($FoundMgr) {
    $SdkMgr = $FoundMgr.FullName
} else {
    $SdkMgr = Join-Path $AndroidHome "cmdline-tools\latest\bin\sdkmanager.bat"
}
Write-Host "Using ANDROID_HOME: $AndroidHome"

# Write Env
@"
[Environment]::SetEnvironmentVariable('JAVA_HOME', '$JavaHome', 'Process')
[Environment]::SetEnvironmentVariable('ANDROID_HOME', '$AndroidHome', 'Process')
\$env:Path += ";$JavaHome\bin"
\$env:Path += ";$AndroidHome\platform-tools"
\$env:Path += ";$(Split-Path $SdkMgr)"
"@ | Out-File $EnvFile

# Stage 3: SDK Components
Write-Banner "SDK Components" $CurrentStage $Stages; $CurrentStage++
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

function Test-CommandExitZero {
    param([string]$FilePath, [string]$ArgumentList)
    try {
        $p = Start-Process -FilePath $FilePath -ArgumentList $ArgumentList -NoNewWindow -Wait -PassThru
        return $p.ExitCode -eq 0
    } catch { return $false }
}

# Stage 4: Verify
Write-Banner "Verify" $CurrentStage $Stages; $CurrentStage++
if (Test-CommandExitZero -FilePath "$JavaHome\bin\java.exe" -ArgumentList '-version') { Write-Host "Java: Pass" -ForegroundColor Green } else { Write-Host "Java: Fail" -ForegroundColor Red }
if (Test-CommandExitZero -FilePath "$JavaHome\bin\javac.exe" -ArgumentList '-version') { Write-Host "Javac: Pass" -ForegroundColor Green } else { Write-Host "Javac: Fail" -ForegroundColor Red }
if (Test-CommandExitZero -FilePath "$AndroidHome\platform-tools\adb.exe" -ArgumentList '--version') { Write-Host "ADB: Pass" -ForegroundColor Green } else { Write-Host "ADB: Fail" -ForegroundColor Red }
if (Test-CommandExitZero -FilePath 'cmd' -ArgumentList '/c npx expo --version') { Write-Host "Expo: Pass" -ForegroundColor Green } else { Write-Host "Expo: Fail" -ForegroundColor Red }
if (Test-CommandExitZero -FilePath 'cmd' -ArgumentList '/c .\apps\mobile\android\gradlew.bat --version') { Write-Host "Gradle: Pass" -ForegroundColor Green } else { Write-Host "Gradle: Fail" -ForegroundColor Red }


# Stage 5: Persist
Write-Banner "Persist" $CurrentStage $Stages; $CurrentStage++
[Environment]::SetEnvironmentVariable('JAVA_HOME', $JavaHome, 'User')
[Environment]::SetEnvironmentVariable('ANDROID_HOME', $AndroidHome, 'User')
$Path = [Environment]::GetEnvironmentVariable('Path', 'User')
$NewPaths = @("$JavaHome\bin", "$AndroidHome\platform-tools", (Split-Path $SdkMgr))
foreach ($P in $NewPaths) {
    if (-not $Path.Contains($P)) { $Path += ";$P" }
}
[Environment]::SetEnvironmentVariable('Path', $Path, 'User')
Write-Host "Environment variables set. Restart terminal to apply." -ForegroundColor Yellow
