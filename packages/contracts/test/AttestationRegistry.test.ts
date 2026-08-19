import { expect } from "chai";
import { ethers } from "hardhat";
import type { AttestationRegistry } from "../typechain-types";

describe("AttestationRegistry", () => {
  let registry: AttestationRegistry;
  const batchId = ethers.encodeBytes32String("batch-1");
  const dataHash = ethers.encodeBytes32String("data-1");
  const geohashPrefix = "0x6768000000000000";

  beforeEach(async () => {
    const Factory = await ethers.getContractFactory("AttestationRegistry");
    registry = (await Factory.deploy()) as unknown as AttestationRegistry;
    await registry.waitForDeployment();
  });

  it("submits a batch as Provisional and emits BatchSubmitted", async () => {
    await expect(
      registry.submitBatch(batchId, dataHash, "ipfs://cid", geohashPrefix, 10)
    )
      .to.emit(registry, "BatchSubmitted")
      .withArgs(batchId, dataHash);

    const batch = await registry.batches(batchId);
    expect(batch.status).to.equal(0n); // Provisional
    expect(batch.pointCount).to.equal(10);
  });

  it("validates a batch after one attestation", async () => {
    const [, witness] = await ethers.getSigners();
    await registry.submitBatch(batchId, dataHash, "ipfs://cid", geohashPrefix, 10);

    await expect(registry.attest(batchId, witness.address)).to.emit(registry, "BatchValidated");

    const batch = await registry.batches(batchId);
    expect(batch.status).to.equal(1n); // Validated
    expect(batch.validatedAt).to.be.gt(0n);
  });

  it("marks a batch Disputed", async () => {
    await registry.submitBatch(batchId, dataHash, "ipfs://cid", geohashPrefix, 10);
    await expect(registry.dispute(batchId, "bad data"))
      .to.emit(registry, "BatchDisputed")
      .withArgs(batchId, "bad data");

    const batch = await registry.batches(batchId);
    expect(batch.status).to.equal(2n); // Disputed
  });

  it("expires a stale Provisional batch after 180 days", async () => {
    await registry.submitBatch(batchId, dataHash, "ipfs://cid", geohashPrefix, 10);

    await expect(registry.expire(batchId)).to.be.revertedWith("not expired");

    await ethers.provider.send("evm_increaseTime", [181 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    await expect(registry.expire(batchId)).to.emit(registry, "BatchExpired").withArgs(batchId);
    const batch = await registry.batches(batchId);
    expect(batch.status).to.equal(3n); // Expired
  });
});
