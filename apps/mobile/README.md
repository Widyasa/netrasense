# @netrasense/mobile

Android React Native app (Expo development build) for NetraSense.

## Setup

1. Install workspace dependencies from the repo root:

   ```sh
   pnpm install
   ```

2. Copy the env template and fill in your Gemini API key:

   ```sh
   cp apps/mobile/.env.example apps/mobile/.env
   ```

3. Generate the native Android project:

   ```sh
   cd apps/mobile && npx expo prebuild
   ```

4. Build and run on a connected device/emulator:

   ```sh
   npx expo run:android
   ```

## Notes

- Target device: Samsung S21 FE 5G (ARCore Depth API supported).
- `android/build.gradle` pins `com.google.ar:core:1.46.0` and restricts native ABIs to
  `arm64-v8a` and `armeabi-v7a` for ARCore compatibility.
- Camera + frame processing uses `react-native-vision-camera` with
  `react-native-worklets-core`.
