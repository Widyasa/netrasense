import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getContractAddresses, getProvider } from "@/lib/chain";

export const runtime = "nodejs";

export async function GET(): Promise<NextResponse> {
  const db = getDb();
  const dbOk = await db.ping().catch(() => false);

  const addresses = getContractAddresses();
  let chainOk = false;
  let chainId: number | null = null;
  try {
    const network = await getProvider().getNetwork();
    chainId = Number(network.chainId);
    chainOk = true;
  } catch {
    chainOk = false;
  }

  return NextResponse.json({
    db: { backend: db.backend, ok: dbOk },
    chain: { ok: chainOk, chainId, rpcUrl: process.env.CHAIN_RPC_URL ?? "http://127.0.0.1:8545", addresses },
  });
}
