# NetraSense — R0 Hackathon MVP

Web-based MVP for the 22 August hackathon demo. One repo, one command, one closed loop.

## Quick start

```bash
# Install everything (Node 20+, pnpm 9+)
pnpm install

# Start local Hardhat node + deploy contracts
pnpm chain
pnpm deploy:contracts

# In another terminal, start the web app
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
netrasense/
  apps/
    web/              Next.js 14 user + contributor dApp
  packages/
    contracts/        Hardhat Solidity contracts
    shared/           Design tokens, types, and utilities
  docs/adr/           Architecture Decision Records
  docs/agents/        Agent skill configuration
```

## R0 MVP scope

- Web app with camera-based object detection (TensorFlow.js COCO-SSD).
- Multi-channel hazard warnings (Web Audio + Vibration API + TTS).
- Two-tap hazard reporting.
- Mock ingest / validation API.
- Local Hardhat testnet contracts (AttestationRegistry, ContributorRegistry, RewardDistributor).
- Contributor dApp: wallet/claim and network map.
- Demo mode with deterministic sample data.

See the spec in GitHub issue [#1](../../issues/1) and the tracer-bullet tickets linked there.

## Tech stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **AI / perception:** TensorFlow.js COCO-SSD
- **Audio / haptic:** Web Audio API, Vibration API, Web Speech API
- **Contracts:** Solidity + Hardhat
- **Monorepo:** pnpm workspaces

## Important decisions

- [ADR-0001](docs/adr/0001-r0-web-mvp.md) — R0 is web-only.
- [ADR-0002](docs/adr/0002-r0-hardhat-local-testnet.md) — Hardhat local testnet instead of Foundry.
- [ADR-0003](docs/adr/0003-r0-sample-data-demo.md) — Demo uses sample data for reliability.
- [ADR-0004](docs/adr/0004-monorepo-pnpm-layout.md) — pnpm monorepo layout.

## Useful commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start web dev server |
| `pnpm chain` | Start local Hardhat node |
| `pnpm deploy:contracts` | Deploy contracts to localhost |
| `pnpm --filter contracts test` | Run contract tests |
| `pnpm --filter web build` | Build web app |

## Labels

Engineering area labels:

- `fe` — front-end / mobile UI
- `be` — back-end / API / indexer
- `ai` — AI / CV / perception / audio
- `web3` — smart contracts / wallet / dApp

Plus the five triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`.
