import { NextResponse } from "next/server";
import { isAddress } from "ethers";
import { getContract, getServerSigner } from "@/lib/chain";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

interface ClaimBody {
  contributor: string;
}

function isClaimBody(value: unknown): value is ClaimBody {
  if (!value || typeof value !== "object") return false;
  const contributor = (value as Record<string, unknown>).contributor;
  return typeof contributor === "string" && isAddress(contributor);
}

// R0 demo shortcut: the server signer (DEMO_PRIVATE_KEY, funded by the
// Hardhat deployer) submits RewardDistributor.claimFor(contributor) on the
// contributor's behalf, so the demo works without wallet-connected
// transaction signing.
export async function POST(request: Request): Promise<NextResponse> {
  const payload: unknown = await request.json();
  if (!isClaimBody(payload)) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const signer = getServerSigner();
  const rewardDistributor = getContract("RewardDistributor", signer);

  const pending: bigint = await rewardDistributor.pending(payload.contributor);
  if (pending === BigInt(0)) {
    return NextResponse.json({ error: "nothing to claim" }, { status: 400 });
  }

  const claimTx = await rewardDistributor.claimFor(payload.contributor);
  const receipt = await claimTx.wait();

  const db = getDb();
  const claimedAt = new Date().toISOString();
  await db.markAllRewardsClaimed(payload.contributor, claimedAt);

  return NextResponse.json({ txHash: receipt?.hash ?? claimTx.hash });
}
