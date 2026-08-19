import { NextResponse } from "next/server";
import { concat, id, isHexString, toUtf8Bytes } from "ethers";
import { getDb } from "@/lib/db";
import { getContract, getServerSigner } from "@/lib/chain";
import { isValidGeohash } from "@/lib/geo";

export const runtime = "nodejs";

interface ValidateBody {
  batchId: string;
}

function isValidateBody(value: unknown): value is ValidateBody {
  if (!value || typeof value !== "object") return false;
  return typeof (value as Record<string, unknown>).batchId === "string";
}

/** Converts an arbitrary string identifier into a bytes32 value for on-chain use. */
function toBytes32(input: string): string {
  return isHexString(input, 32) ? input : id(input);
}

/** Converts a geohash prefix into a bytes8 value, truncating/right-padding as needed. */
function toBytes8(prefix: string): string {
  const bytes = toUtf8Bytes(prefix).slice(0, 8);
  const padding = new Uint8Array(8 - bytes.length);
  return concat([bytes, padding]);
}

export async function POST(request: Request): Promise<NextResponse> {
  const payload: unknown = await request.json();
  if (!isValidateBody(payload)) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const db = getDb();
  const batch = await db.getBatch(payload.batchId);
  if (!batch) {
    return NextResponse.json({ error: "batch not found" }, { status: 404 });
  }

  const isPlausible =
    batch.pointCount > 0 &&
    Boolean(batch.dataHash) &&
    (batch.geohashPrefix === null || isValidGeohash(batch.geohashPrefix));

  if (!isPlausible) {
    await db.updateBatchStatus(batch.batchId, "rejected", null, batch.witnesses);
    return NextResponse.json({ status: "rejected" });
  }

  const signer = getServerSigner();
  const attestationRegistry = getContract("AttestationRegistry", signer);
  const contributorRegistry = getContract("ContributorRegistry", signer);
  const rewardDistributor = getContract("RewardDistributor", signer);

  const batchIdBytes32 = toBytes32(batch.batchId);
  const dataHashBytes32 = toBytes32(batch.dataHash);
  const geohashPrefixBytes8 = toBytes8(batch.geohashPrefix ?? "");

  const submitTx = await attestationRegistry.submitBatch(
    batchIdBytes32,
    dataHashBytes32,
    batch.storageCID ?? "",
    geohashPrefixBytes8,
    batch.pointCount,
  );
  await submitTx.wait();

  const witnessAddress =
    batch.contributor && batch.contributor !== "" ? batch.contributor : await signer.getAddress();
  const attestTx = await attestationRegistry.attest(batchIdBytes32, witnessAddress);
  const attestReceipt = await attestTx.wait();

  const recordValidationTx = await contributorRegistry.recordValidation(
    batch.contributor,
    batch.pointCount,
  );
  await recordValidationTx.wait();

  const recordRewardTx = await rewardDistributor.recordReward(batchIdBytes32, batch.contributor);
  await recordRewardTx.wait();

  const validatedAt = new Date().toISOString();
  const allWitnesses = batch.witnesses.includes(witnessAddress)
    ? batch.witnesses
    : [...batch.witnesses, witnessAddress];
  await db.updateBatchStatus(batch.batchId, "validated", validatedAt, allWitnesses);

  await db.insertReward({
    contributor: batch.contributor,
    batchId: batch.batchId,
    amount: `${batch.pointCount}000000000000000000`, // pointCount * 1 ether, matches RewardDistributor
    status: "pending",
    claimedAt: null,
  });

  return NextResponse.json({
    status: "validated",
    txHash: attestReceipt?.hash ?? attestTx.hash,
  });
}
