# ADR-0004: Monorepo layout with pnpm workspaces

## Status

Accepted

## Context

R0 has two distinct runtimes (a Next.js web app and a Hardhat contract package) plus shared design tokens and types. Keeping them in one repository simplifies the demo and lets the web app import contract ABIs directly.

## Decision

Use a **pnpm monorepo** with the following layout:

```
netrasense/
  apps/
    web/              Next.js 14 user + contributor dApp
  packages/
    contracts/        Hardhat + Solidity contracts
    shared/           Design tokens, types, and utilities
  package.json        Root workspace definition
  pnpm-workspace.yaml
```

The web app consumes contract ABIs from `packages/contracts` and design tokens from `packages/shared`.

## Consequences

- **Pros:** One repo, one install command with pnpm, shared types, easy demo.
- **Cons:** Slightly more initial setup than two separate repos. Acceptable.

## Alternatives considered

- Separate repos for web and contracts. Rejected because it slows iteration and complicates the demo.
- Yarn/npm workspaces. Rejected because pnpm is already installed and handles linked packages well.

## Related

- ADR-0001
- ADR-0002
