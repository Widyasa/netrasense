## Android Build Setup

To configure your Android build environment, use our setup wizard:

```bash
./scripts/setup-android-wizard.sh
```

### Manual Configuration

If you prefer to configure manually:
1. **JDK 17**: Install Eclipse Temurin JDK 17.
2. **Android SDK**: Install command-line tools from the Android Studio download page.
3. **Environment Variables**:
   - Set `JAVA_HOME` to your JDK installation path.
   - Set `ANDROID_HOME` to your Android SDK installation path.
   - Add `platform-tools`, `cmdline-tools/latest/bin`, and `%JAVA_HOME%\bin` to your system `Path`.
4. **SDK Components**:
   Run the following using the SDK manager:
   ```cmd
   sdkmanager --licenses
   sdkmanager "platform-tools" "build-tools;35.0.0" "platforms;android-35" "ndk;26.1.10909125"
   ```
