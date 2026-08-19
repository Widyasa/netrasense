import { NextResponse } from "next/server";
import { getDb, type Observation, type Batch } from "@/lib/db";
import {
  distanceMeters,
  isValidGeohash,
  isValidLatLng,
  WITNESS_RADIUS_METERS,
  WITNESS_WINDOW_MS,
} from "@/lib/geo";

export const runtime = "nodejs";

interface IngestObservation {
  type: string;
  geohash: string;
  lat: number;
  lng: number;
  confidence: number;
}

interface IngestBody {
  batchId: string;
  dataHash: string;
  storageCID?: string;
  geohashPrefix?: string;
  pointCount: number;
  observations: IngestObservation[];
  contributor: string;
}

function isIngestBody(value: unknown): value is IngestBody {
  if (!value || typeof value !== "object") return false;
  const body = value as Record<string, unknown>;
  return (
    typeof body.batchId === "string" &&
    typeof body.dataHash === "string" &&
    typeof body.pointCount === "number" &&
    typeof body.contributor === "string" &&
    Array.isArray(body.observations)
  );
}

export async function POST(request: Request): Promise<NextResponse> {
  const payload: unknown = await request.json();
  if (!isIngestBody(payload)) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const db = getDb();
  const now = new Date();
  const witnessSince = new Date(now.getTime() - WITNESS_WINDOW_MS).toISOString();
  const witnesses = new Set<string>();
  const rowsToInsert: Observation[] = [];

  for (let index = 0; index < payload.observations.length; index += 1) {
    const obs = payload.observations[index];
    if (!isValidLatLng(obs.lat, obs.lng) || !isValidGeohash(obs.geohash) || !obs.type) {
      return NextResponse.json({ error: `invalid observation at index ${index}` }, { status: 400 });
    }

    const candidates = await db.findWitnessCandidates(
      obs.type,
      obs.lat,
      obs.lng,
      witnessSince,
      payload.contributor,
    );
    const match = candidates.find(
      (c) => distanceMeters(c.lat, c.lng, obs.lat, obs.lng) <= WITNESS_RADIUS_METERS,
    );

    if (match) {
      witnesses.add(payload.contributor);
      continue;
    }

    rowsToInsert.push({
      id: `${payload.batchId}:${index}`,
      batchId: payload.batchId,
      type: obs.type,
      geohash: obs.geohash,
      lat: obs.lat,
      lng: obs.lng,
      confidence: obs.confidence,
      createdAt: now.toISOString(),
      contributor: payload.contributor,
    });
  }

  if (rowsToInsert.length > 0) {
    await db.insertObservations(rowsToInsert);
  }

  const batch: Batch = {
    batchId: payload.batchId,
    dataHash: payload.dataHash,
    storageCID: payload.storageCID ?? null,
    geohashPrefix: payload.geohashPrefix ?? null,
    status: "provisional",
    pointCount: payload.pointCount,
    witnesses: Array.from(witnesses),
    contributor: payload.contributor,
    submittedAt: now.toISOString(),
    validatedAt: null,
  };
  await db.upsertBatch(batch);

  return NextResponse.json({ status: "provisional" });
}
