# ADR-0003: R0 demo uses pre-recorded / sample data

## Status

Accepted

## Context

The PRD defines success as a live walk in front of the audience. The venue, lighting, and network conditions on 22 August are unknown. A live walk introduces variables (camera angle, network latency, object detection confidence) that could break the demo.

## Decision

The R0 demo uses **pre-recorded video / sample frames** plus a small set of labeled obstacles. The detection pipeline can switch between live camera and sample data. This guarantees the hazard alert, report, validation, and reward loop can be demonstrated reliably.

A live-camera toggle is still provided for ad-hoc testing, but the main demo path is deterministic.

## Consequences

- **Pros:** Predictable demo, no dependency on venue lighting, no GPS drift, faster debugging.
- **Cons:** Less impressive than a true live walk. The team must be transparent that this is a functional proof-of-concept, not a field-validated product.

## Alternatives considered

- Live walk outside the venue. Rejected because of unknown hazards, weather, and time constraints.
- Live camera pointed at staged obstacles in the demo room. Accepted as the ad-hoc test mode, but not the primary demo path.

## Related

- PRD §2.3 (MVP success criteria)
- PRD §25.2 (critical test cases)
