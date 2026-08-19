# ADR-0002: R0 Web3 layer uses Hardhat on a local testnet

## Status

Accepted

## Context

The PRD specifies Foundry for smart-contract development. Foundry is not currently installed in the development environment, and installing it on Windows failed cleanly with `foundryup`.

The R0 demo only needs to show a local testnet running the reward attestation flow end-to-end in front of the audience.

## Decision

R0 uses **Hardhat** with a local Hardhat Network node for smart-contract development and the demo. Contracts are written in Solidity and tested with Hardhat/Ethers/Chai.

A migration to Foundry remains possible in R1 if the team prefers it.

## Consequences

- **Pros:** Hardhat runs on the existing Node toolchain; faster setup; good TypeScript/Ethers integration.
- **Cons:** Slower tests than Foundry; different project conventions. Acceptable for R0.

## Alternatives considered

- Install Foundry from source with `cargo install`. Rejected because compile time is long and not needed for the demo.
- Skip on-chain entirely and fake the flow. Rejected because the hackathon demo explicitly asks for an on-chain reward record.

## Related

- PRD §14 (smart contracts)
- PRD §12.3 (data lifecycle)
