# ADR-0001: R0 MVP is a web application

## Status

Accepted

## Context

The PRD lists Android (APK) as the primary platform for NetraSense. However, the R0 release is a 48–72 hour hackathon MVP that must demonstrate a full closed loop in front of a live audience.

Building a native Android application with ARCore Depth API, native camera, custom haptics, and a foreground service in that window carries a high risk of failure. The team does not have a dedicated Android native engineer, and the demo device situation is unknown.

## Decision

R0 is built as a **web application** (Next.js, PWA-capable) that runs in a desktop or mobile browser. It uses `getUserMedia` for camera access, TensorFlow.js for on-device object detection, the Web Audio API for earcons/spatial audio, and the Vibration API for haptic feedback.

Native Android development is deferred to R1.

## Consequences

- **Pros:** Faster iteration, one codebase for user and contributor experiences, no APK build/install friction, easier demo setup.
- **Cons:** No true depth sensing, less precise haptics, no background camera, reliance on browser permissions. These are acceptable for a demo MVP.

## Alternatives considered

- React Native + ARCore: technically closer to PRD, but requires native module work and a high-risk build pipeline. Rejected for R0.
- Flutter: same native concerns. Rejected.

## Related

- PRD §17 (tech stack)
- DESIGN.md §7 (touch targets) and §10 (audio/haptic)
