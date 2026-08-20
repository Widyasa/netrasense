# NetraSense Android React Native MVP Design

## Table of Contents
- [Context](#context)
- [Decision: Android first, iOS later](#decision-android-first-ios-later)
- [Smart contract / backend strategy](#smart-contract--backend-strategy)
- [Tech stack](#tech-stack)
- [Distance estimation](#distance-estimation)
- [Architecture](#architecture)
- [Components / screens](#components--screens)
- [Audio & haptic](#audio--haptic)
- [Data flow](#data-flow)
- [Error handling](#error-handling)
- [Testing](#testing)
- [Files / monorepo impact](#files--monorepo-impact)
- [Risks](#risks)

## Context
NetraSense is a hackathon MVP (target demo 22 August). A web-based MVP already exists in `apps/web` (Next.js, Hardhat contracts, backend API). The team now wants an Android React Native app as the primary demo platform, while keeping the web MVP as a fallback.

## Decision: Android first, iOS later
- Android is the primary demo target.
- iOS support is deferred to R1 due to Mac/Xcode requirement and limited time.

## Smart contract / backend strategy
- Smart contracts stay on a local Hardhat node running on the demo laptop. No public testnet/mainnet deployment required.
- The RN app talks to the existing Next.js backend API (`/api/ingest`, `/api/validate`, `/api/reward/claim`) over the local Wi-Fi network.
- For the demo: `pnpm chain` -> `pnpm deploy:contracts` -> `pnpm dev` on the laptop, RN app connects to the laptop's local IP.

## Tech stack
- Framework: React Native + Expo (development build; Expo Go is not supported because native modules are required).
- Camera: `react-native-vision-camera` with Android frame processor.
 - AI: Google Gemini Vision API (cloud).
- Audio: `expo-av` for earcons, `expo-speech` for TTS in Bahasa Indonesia.
- Haptic: `expo-haptics`.
- HTTP: `axios` or `fetch` to backend API.
- State: React Context or Zustand.

## Distance estimation
Primary: ARCore Depth API (Samsung S21 FE 5G).
Fallback: Bounding-box + assumed-object-height heuristic (person ~1.7m, pole ~2.5m, vehicle ~1.5m, branch ~0.3m).
Result rounded to steps (<10m) or meters (>=10m).
## Architecture
```
Camera -> VisionCamera -> Frame Processor -> Base64/JPEG -> Gemini Vision API -> Hazard JSON
                                                                    |
                                                                    v
                                                          Merge ARCore Depth -> Hazard Event
                                                                    |
                                                                    v
                                                          AudioEngine + HapticEngine + UI State
                                                                    |
                                                                    v
                                                            ApiClient -> POST /api/ingest
                                                            Backend -> Hardhat local chain
```

## Components / screens
1. NavigationScreen: single large screen with route status, next instruction, report button.
2. CameraView: full-screen camera with optional debug bounding-box overlay.
3. HazardAlert: full-screen red overlay for Kritis; no close button.
4. ReportSheet: select hazard type; completes in <=2 taps.
5. DemoModeToggle: use sample image/video when live camera unavailable.
6. ContributorWebView: reuse existing web dApp for wallet/claim/map.

## Audio & haptic
- Earcons: Long Sharp (Kritis), Sharp Double (Kepala), Double (Waspada), Clear.
- TTS via `expo-speech` at 1.3x rate.
- Haptic via `expo-haptics` matching audio patterns.
- Hazard priority: Kritis interrupts everything.

## Data flow
1. Camera captures frame -> Convert to JPEG/Base64.
2. Send to Gemini Vision API -> Parse hazard JSON.
3. Merge with ARCore Depth data -> Hazard event -> Trigger audio/haptic/UI.
4. User reports -> POST /api/ingest.
5. Backend validates -> AttestationRegistry.

## Error handling
- Camera permission denied -> auto switch to demo mode.
- Backend unreachable -> local queue, retry when online.
- Model load failure -> demo mode with simulated detections.
- Chain unavailable -> backend still records data; reward txHash shows warning.

## Testing
- Manual test on Android device.
- Development build via `npx expo run:android`.
- Release APK via `npx expo run:android --variant release` or EAS.

## Files / monorepo impact
- New `apps/mobile/` package in the pnpm workspace.
- Reuses `@netrasense/shared` for design tokens.
- Reuses backend API and contracts unchanged.
- Update `README.md` and ADRs after implementation to reflect new primary platform.

## Risks
 - API latency, internet dependency, API key management (`GEMINI_API_KEY`).
 - ARCore native setup, device compatibility.
 - Demo mode (offline) uses pre-canned Gemini responses.
