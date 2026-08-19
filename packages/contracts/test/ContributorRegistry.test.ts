import { expect } from "chai";
import { ethers } from "hardhat";
import type { ContributorRegistry } from "../typechain-types";

describe("ContributorRegistry", () => {
  let registry: ContributorRegistry;

  beforeEach(async () => {
    const Factory = await ethers.getContractFactory("ContributorRegistry");
    registry = (await Factory.deploy()) as unknown as ContributorRegistry;
    await registry.waitForDeployment();
  });

  it("registers a contributor as Newcomer", async () => {
    const [, contributor] = await ethers.getSigners();
    await registry.register(contributor.address);
    const c = await registry.contributors(contributor.address);
    expect(c.tier).to.equal(0n); // Newcomer
  });

  it("promotes to Verified once validatedPoints >= 50 and reputation >= 800", async () => {
    const [, contributor] = await ethers.getSigners();
    await registry.register(contributor.address);
    await registry.recordValidation(contributor.address, 50);
    const c = await registry.contributors(contributor.address);
    expect(c.validatedPoints).to.equal(50n);
    expect(c.reputation).to.equal(1000n); // no rejections yet -> full reputation
    expect(c.tier).to.equal(1n); // Verified
  });

  it("stays Newcomer below the points threshold", async () => {
    const [, contributor] = await ethers.getSigners();
    await registry.register(contributor.address);
    await registry.recordValidation(contributor.address, 10);

    const c = await registry.contributors(contributor.address);
    expect(c.tier).to.equal(0n); // Newcomer
  });
});
