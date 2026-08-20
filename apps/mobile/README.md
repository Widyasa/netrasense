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

   Set `EXPO_PUBLIC_GEMINI_API_KEY` in `apps/mobile/.env` to a valid Google
   Gemini API key. The `EXPO_PUBLIC_` prefix is required for Expo to inline
   the value into the app bundle. If left empty, the hazard detector falls
   back to a demo detection so the camera flow still works without a key.

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
- ARCore Depth is wired via `src/native/ARCoreModule.ts`, a JS-only stub
  (`getDepthAtPoint` resolves to `null` when `NativeModules.ARCoreModule`
  is absent). Real depth requires a Kotlin/Java native module implementing
  `getDepthAtPoint(x, y)` against the ARCore Depth API; until that lands,
  `useHazardPipeline` falls back to the bounding-box distance heuristic in
  `src/engine/distance.ts`.

## Environment Variables
`EXPO_PUBLIC_API_URL` - Base URL for the backend API. Default: `http://localhost:3000/api`.

`EXPO_PUBLIC_GEMINI_API_KEY` - Google Gemini API key used for hazard
detection frame analysis. Falls back to a demo detection when unset.

`EXPO_PUBLIC_WEB_DAPP_URL` - URL for the web dApp. Default: `http://localhost:3000`.

`EXPO_PUBLIC_DEMO_CONTRIBUTOR` - Wallet address used as the `contributor` for
the demo report/claim flow. Default: `0x1111111111111111111111111111111111111111`.

`EXPO_PUBLIC_DEMO_MODE` - When `true`, the app starts with demo mode enabled
(sample hazards instead of camera). Default: `false`.

## E2E Demo Loop

For demoing without a device camera or Gemini key, toggle "Demo: ON/OFF" in
the top-right corner of the app (or set `EXPO_PUBLIC_DEMO_MODE=true` in your
`.env` to default to it). In demo mode:

1. `useDemoHazards` (`src/hooks/useDemoHazards.ts`) cycles through
   `SAMPLE_DETECTIONS` (`src/demo/sampleData.ts`) every 2 seconds instead of
   reading the camera.
2. `useHazardPipeline` classifies each sample detection exactly like a real
   camera frame (distance heuristic + `classifyHazard`).
3. Whenever the top hazard changes and its level is not `aman`, `App.tsx`
   calls `alertHazard` (`src/engine/hazardAlert.ts`) to fire the audio
   earcon, haptic pulse, and TTS message.
4. Tapping "Report" in the sheet calls `useReportFlow().submit`
   (`src/hooks/useReportFlow.ts`), which:
   - generates a `batchId`/`dataHash` and builds an `ObservationInput` from
     `SAMPLE_OBSERVATION`,
   - calls `submitReport` (`POST /ingest`),
   - calls `validateBatch` (`POST /validate`),
   - calls `claimReward` (`POST /reward/claim`) using
     `EXPO_PUBLIC_DEMO_CONTRIBUTOR`.
   The result (or error) is shown in a status banner at the bottom of the
   screen.

## APK Build

```sh
cd apps/mobile
npx expo prebuild --platform android   # regenerate native project if needed
npm run apk                            # expo run:android --variant release
```

The `apk` script builds and installs a release APK on a connected
device/emulator via `expo run:android --variant release`. The built APK is
left under `android/app/build/outputs/apk/release/`.
