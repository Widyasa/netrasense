// Demo-grade contract wiring: local Hardhat node via ethers v6.

import { Contract, JsonRpcProvider, NonceManager, Wallet, type ContractRunner, type InterfaceAbi } from "ethers";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

export const RPC_URL = process.env.CHAIN_RPC_URL ?? "http://127.0.0.1:8545";

export type ContractName = "AttestationRegistry" | "ContributorRegistry" | "RewardDistributor";

interface DeployedAddresses {
  attestationRegistry: string;
  contributorRegistry: string;
  rewardDistributor: string;
}

const ENV_ADDRESS_KEYS: Record<ContractName, string> = {
  AttestationRegistry: "ATTESTATION_REGISTRY_ADDRESS",
  ContributorRegistry: "CONTRIBUTOR_REGISTRY_ADDRESS",
  RewardDistributor: "REWARD_DISTRIBUTOR_ADDRESS",
};

function contractsRoot(): string {
  return resolve(process.cwd(), "../../packages/contracts");
}

function loadDeployedAddresses(): Partial<DeployedAddresses> {
  const path = resolve(contractsRoot(), "deployed.json");
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, "utf-8")) as Partial<DeployedAddresses>;
}

function addressFor(name: ContractName, deployed: Partial<DeployedAddresses>): string | null {
  const deployedKey = {
    AttestationRegistry: "attestationRegistry",
    ContributorRegistry: "contributorRegistry",
    RewardDistributor: "rewardDistributor",
  } satisfies Record<ContractName, keyof DeployedAddresses>;
  return deployed[deployedKey[name]] ?? process.env[ENV_ADDRESS_KEYS[name]] ?? null;
}

function loadAbi(name: ContractName): InterfaceAbi {
  const path = resolve(contractsRoot(), `artifacts/contracts/${name}.sol/${name}.json`);
  if (!existsSync(path)) {
    throw new Error(`Missing contract artifact for ${name}. Run pnpm deploy:contracts first.`);
  }
  const artifact = JSON.parse(readFileSync(path, "utf-8")) as { abi: InterfaceAbi };
  return artifact.abi;
}

let providerSingleton: JsonRpcProvider | null = null;

export function getProvider(): JsonRpcProvider {
  if (!providerSingleton) providerSingleton = new JsonRpcProvider(RPC_URL);
  return providerSingleton;
}

export function getServerSigner(): NonceManager {
  const privateKey = process.env.DEMO_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("DEMO_PRIVATE_KEY is not set; cannot sign transactions server-side.");
  }
  // ethers' JsonRpcProvider short-window-caches eth_getTransactionCount, which
  // can serve a stale "pending" nonce across back-to-back sends in the same
  // request. NonceManager tracks the nonce locally instead, avoiding it.
  return new NonceManager(new Wallet(privateKey, getProvider()));
}

/** Resolves a contract instance by name, connected to the given signer or provider. */
export function getContract(
  name: ContractName,
  runner: ContractRunner = getProvider(),
): Contract {
  const deployed = loadDeployedAddresses();
  const address = addressFor(name, deployed);
  if (!address) {
    throw new Error(
      `No deployed address for ${name}. Set deployed.json or ${ENV_ADDRESS_KEYS[name]}.`,
    );
  }
  return new Contract(address, loadAbi(name), runner);
}

export function getContractAddresses(): Partial<DeployedAddresses> {
  const deployed = loadDeployedAddresses();
  return {
    attestationRegistry: addressFor("AttestationRegistry", deployed) ?? undefined,
    contributorRegistry: addressFor("ContributorRegistry", deployed) ?? undefined,
    rewardDistributor: addressFor("RewardDistributor", deployed) ?? undefined,
  };
}
