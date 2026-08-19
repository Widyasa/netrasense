# NetraSense — Domain Glossary

A living glossary for the NetraSense project. Use these terms exactly as defined here; don't swap in synonyms.

## Product layers

| Term | Definition |
|------|------------|
| **SENSE** | The perception layer: real-time obstacle detection, hazard classification, and distance/heading estimation. |
| **GUIDE** | The navigation layer: route selection, turn instructions, and spatial audio guidance. |
| **READ** | The text-recognition layer: OCR, scene description, and currency identification. |
| **BANTU** | The human-assistance layer: volunteer help calls and hazard reporting. |
| **KONTRIB** | The contributor layer: mapping missions, data recording, and validation status. |
| **WEB** | The web dApp layer: public network map, reward claims, governance, and sponsor dashboards. |

## Users / personas

| Term | Definition |
|------|------------|
| **Teman tunanetra** | A person who is blind or has low vision. The primary end user of the SENSE/GUIDE/READ layers. |
| **Kontributor** | A sighted volunteer who collects accessibility data by walking routes. Uses the KONTRIB layer. |
| **Validator** | A trusted contributor who stakes reputation and/or funds to validate data batches. |
| **Sponsor** | An organization (CSR, government) that funds mapping campaigns through the Impact Treasury. |

## Hazard tiers

| Term | Definition |
|------|------------|
| **Kritis** | Life-threatening obstacle (open hole, approaching vehicle). Red octagon, Long Sharp haptic, cuts all audio. |
| **Kepala** | Head-height obstacle (branch, low sign). Amber inverted triangle, Sharp Double haptic. |
| **Waspada** | Caution obstacle (pole, parked bike). Orange triangle, Double haptic. |
| **Aman** | Clear path. Green circle, silence (no audio/haptic). |

## Network concepts

| Term | Definition |
|------|------------|
| **Proof-of-Path Network** | The decentralized data network that records, validates, and rewards contributions of accessibility data. |
| **Observation** | A single accessibility data point captured by a contributor: obstacle type, location, heading, and confidence. |
| **Batch** | A grouped set of observations that are submitted, validated, and attested together. |
| **Attestation** | An on-chain record that a batch's hash has been validated by enough witnesses. Does not store precise coordinates. |
| **Reputation** | A non-transferable contributor score derived from historical accuracy. Gates tier, weight, and reward multiplier. |
| **Poin kontribusi** | The user-facing term for reward balance. Backed by on-chain token accounting in later releases. |

## Feedback channels

| Term | Definition |
|------|------------|
| **Earcon** | Short, non-speech audio glyph that conveys a class of information (e.g., Critical, Clear, Turn). |
| **Haptic pattern** | A timed vibration pattern that carries meaning without visual or audio (e.g., Long Sharp). |
| **Asisten suara** | The voice assistant that gives spoken guidance in Bahasa Indonesia. |

## UI / design

| Term | Definition |
|------|------------|
| **Paper** | Default light-mode background color (#FBFAF7). |
| **Ink** | Default text color (#14181F). |
| **Amber** | Primary brand color for actions and the SENSE layer. |
| **Violet** | Network / Web3 layer accent color. |
| **Red / Orange / Green / Teal** | Semantic status colors; never the sole signal for status. |
| **Target sentuh** | Minimum touch target size: 64 dp (88 dp for primary actions). |
