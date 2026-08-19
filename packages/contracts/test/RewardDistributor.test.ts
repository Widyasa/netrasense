import { expect } from "chai";
import { ethers } from "hardhat";
import type { AttestationRegistry, RewardDistributor } from "../typechain-types";

describe("RewardDistributor", () => {
  let attestationRegistry: AttestationRegistry;
  let rewardDistributor: RewardDistributor;
  const batchId = ethers.encodeBytes32String("batch-1");
  const dataHash = ethers.encodeBytes32String("data-1");
  const geohashPrefix = "0x6768000000000000";

  beforeEach(async () => {
    const AttestationFactory = await ethers.getContractFactory("AttestationRegistry");
    attestationRegistry = (await AttestationFactory.deploy()) as unknown as AttestationRegistry;
    await attestationRegistry.waitForDeployment();

    const RewardFactory = await ethers.getContractFactory("RewardDistributor");
    rewardDistributor = (await RewardFactory.deploy(
      await attestationRegistry.getAddress()
    )) as unknown as RewardDistributor;
    await rewardDistributor.waitForDeployment();
  });

  it("reverts recording reward for a non-validated batch", async () => {
    const [, contributor] = await ethers.getSigners();
    await attestationRegistry.submitBatch(batchId, dataHash, "ipfs://cid", geohashPrefix, 5);

    await expect(rewardDistributor.recordReward(batchId, contributor.address)).to.be.revertedWith(
      "not validated"
    );
  });

  it("records and claims reward for a validated batch", async () => {
    const [, witness, contributor] = await ethers.getSigners();
    await attestationRegistry.submitBatch(batchId, dataHash, "ipfs://cid", geohashPrefix, 5);
    await attestationRegistry.attest(batchId, witness.address);

    const expectedAmount = ethers.parseEther("5");

    await expect(rewardDistributor.recordReward(batchId, contributor.address))
      .to.emit(rewardDistributor, "RewardRecorded")
      .withArgs(contributor.address, batchId, expectedAmount);

    expect(await rewardDistributor.pendingOf(contributor.address)).to.equal(expectedAmount);
    expect(await rewardDistributor.claimedOf(contributor.address)).to.equal(0n);

    await expect(rewardDistributor.connect(contributor).claim())
      .to.emit(rewardDistributor, "RewardClaimed")
      .withArgs(contributor.address, expectedAmount);

    expect(await rewardDistributor.pendingOf(contributor.address)).to.equal(0n);
    expect(await rewardDistributor.claimedOf(contributor.address)).to.equal(expectedAmount);
  });

  it("reverts claim with nothing pending", async () => {
    const [, contributor] = await ethers.getSigners();
    await expect(rewardDistributor.connect(contributor).claim()).to.be.revertedWith("nothing to claim");
  });

  it("lets a backend signer settle a claim on behalf of a contributor via claimFor", async () => {
    const [backend, witness, contributor] = await ethers.getSigners();
    await attestationRegistry.submitBatch(batchId, dataHash, "ipfs://cid", geohashPrefix, 5);
    await attestationRegistry.attest(batchId, witness.address);
    await rewardDistributor.recordReward(batchId, contributor.address);

    const expectedAmount = ethers.parseEther("5");

    await expect(rewardDistributor.connect(backend).claimFor(contributor.address))
      .to.emit(rewardDistributor, "RewardClaimed")
      .withArgs(contributor.address, expectedAmount);

    expect(await rewardDistributor.pendingOf(contributor.address)).to.equal(0n);
    expect(await rewardDistributor.claimedOf(contributor.address)).to.equal(expectedAmount);
  });
});
