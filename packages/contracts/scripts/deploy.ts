import { ethers } from "hardhat";
import { writeFileSync } from "fs";
import { resolve } from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const AttestationRegistry = await ethers.getContractFactory("AttestationRegistry");
  const attestationRegistry = await AttestationRegistry.deploy();
  await attestationRegistry.waitForDeployment();

  const ContributorRegistry = await ethers.getContractFactory("ContributorRegistry");
  const contributorRegistry = await ContributorRegistry.deploy();
  await contributorRegistry.waitForDeployment();

  const RewardDistributor = await ethers.getContractFactory("RewardDistributor");
  const rewardDistributor = await RewardDistributor.deploy(await attestationRegistry.getAddress());
  await rewardDistributor.waitForDeployment();

  const addresses = {
    attestationRegistry: await attestationRegistry.getAddress(),
    contributorRegistry: await contributorRegistry.getAddress(),
    rewardDistributor: await rewardDistributor.getAddress(),
  };

  console.log("AttestationRegistry:", addresses.attestationRegistry);
  console.log("ContributorRegistry:", addresses.contributorRegistry);
  console.log("RewardDistributor:", addresses.rewardDistributor);

  const outPath = resolve(__dirname, "../deployed.json");
  writeFileSync(outPath, JSON.stringify(addresses, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
