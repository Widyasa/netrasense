// Demo-grade persistence layer.
// Uses Neon (Postgres over HTTP) when DATABASE_URL is set, otherwise falls
// back to a JSON-file store under apps/web/data/ so the demo works without
// a live database.

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export type BatchStatus = "provisional" | "validated" | "rejected";
export type RewardStatus = "pending" | "claimed";

export interface Observation {
  id: string;
  batchId: string;
  type: string;
  geohash: string;
  lat: number;
  lng: number;
  confidence: number;
  createdAt: string;
  contributor: string;
}

export interface Batch {
  batchId: string;
  dataHash: string;
  storageCID: string | null;
  geohashPrefix: string | null;
  status: BatchStatus;
  pointCount: number;
  witnesses: string[];
  contributor: string;
  submittedAt: string;
  validatedAt: string | null;
}

export interface Reward {
  contributor: string;
  batchId: string;
  amount: string;
  status: RewardStatus;
  claimedAt: string | null;
}

export interface Db {
  backend: "neon" | "json";
  insertObservations(rows: Observation[]): Promise<void>;
  findWitnessCandidates(
    type: string,
    lat: number,
    lng: number,
    sinceIso: string,
    excludeContributor: string,
  ): Promise<Observation[]>;
  upsertBatch(batch: Batch): Promise<void>;
  getBatch(batchId: string): Promise<Batch | null>;
  updateBatchStatus(
    batchId: string,
    status: BatchStatus,
    validatedAt: string | null,
    witnesses: string[],
  ): Promise<void>;
  insertReward(reward: Reward): Promise<void>;
  getPendingReward(contributor: string, batchId: string): Promise<Reward | null>;
  markRewardClaimed(contributor: string, batchId: string, claimedAt: string): Promise<void>;
  markAllRewardsClaimed(contributor: string, claimedAt: string): Promise<void>;
  ping(): Promise<boolean>;
}

// ---------------------------------------------------------------------------
// Neon (Postgres) backend
// ---------------------------------------------------------------------------

class NeonDb implements Db {
  backend: "neon" = "neon";
  private sql: NeonQueryFunction<false, false>;
  private ready: Promise<void>;

  constructor(connectionString: string) {
    this.sql = neon(connectionString);
    this.ready = this.init();
  }

  private async init(): Promise<void> {
    const sql = this.sql;
    await sql`
      CREATE TABLE IF NOT EXISTS observations (
        id TEXT PRIMARY KEY,
        batch_id TEXT NOT NULL,
        type TEXT NOT NULL,
        geohash TEXT NOT NULL,
        lat DOUBLE PRECISION NOT NULL,
        lng DOUBLE PRECISION NOT NULL,
        confidence DOUBLE PRECISION NOT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        contributor TEXT NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS batches (
        batch_id TEXT PRIMARY KEY,
        data_hash TEXT NOT NULL,
        storage_cid TEXT,
        geohash_prefix TEXT,
        status TEXT NOT NULL,
        point_count INTEGER NOT NULL,
        witnesses JSONB NOT NULL DEFAULT '[]',
        contributor TEXT NOT NULL,
        submitted_at TIMESTAMPTZ NOT NULL,
        validated_at TIMESTAMPTZ
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS rewards (
        contributor TEXT NOT NULL,
        batch_id TEXT NOT NULL,
        amount TEXT NOT NULL,
        status TEXT NOT NULL,
        claimed_at TIMESTAMPTZ,
        PRIMARY KEY (contributor, batch_id)
      )
    `;
  }

  async insertObservations(rows: Observation[]): Promise<void> {
    await this.ready;
    for (const row of rows) {
      await this.sql`
        INSERT INTO observations (id, batch_id, type, geohash, lat, lng, confidence, created_at, contributor)
        VALUES (${row.id}, ${row.batchId}, ${row.type}, ${row.geohash}, ${row.lat}, ${row.lng}, ${row.confidence}, ${row.createdAt}, ${row.contributor})
        ON CONFLICT (id) DO NOTHING
      `;
    }
  }

  async findWitnessCandidates(
    type: string,
    lat: number,
    lng: number,
    sinceIso: string,
    excludeContributor: string,
  ): Promise<Observation[]> {
    await this.ready;
    // Coarse bounding box (~0.02 deg ~ 2.2km) then exact distance filter happens in caller.
    const rows = await this.sql`
      SELECT id, batch_id AS "batchId", type, geohash, lat, lng, confidence, created_at AS "createdAt", contributor
      FROM observations
      WHERE type = ${type}
        AND created_at >= ${sinceIso}
        AND contributor != ${excludeContributor}
        AND lat BETWEEN ${lat - 0.02} AND ${lat + 0.02}
        AND lng BETWEEN ${lng - 0.02} AND ${lng + 0.02}
    `;
    return rows as unknown as Observation[];
  }

  async upsertBatch(batch: Batch): Promise<void> {
    await this.ready;
    await this.sql`
      INSERT INTO batches (batch_id, data_hash, storage_cid, geohash_prefix, status, point_count, witnesses, contributor, submitted_at, validated_at)
      VALUES (${batch.batchId}, ${batch.dataHash}, ${batch.storageCID}, ${batch.geohashPrefix}, ${batch.status}, ${batch.pointCount}, ${JSON.stringify(batch.witnesses)}, ${batch.contributor}, ${batch.submittedAt}, ${batch.validatedAt})
      ON CONFLICT (batch_id) DO UPDATE SET
        data_hash = EXCLUDED.data_hash,
        storage_cid = EXCLUDED.storage_cid,
        geohash_prefix = EXCLUDED.geohash_prefix,
        status = EXCLUDED.status,
        point_count = EXCLUDED.point_count,
        witnesses = EXCLUDED.witnesses,
        submitted_at = EXCLUDED.submitted_at,
        validated_at = EXCLUDED.validated_at
    `;
  }

  async getBatch(batchId: string): Promise<Batch | null> {
    await this.ready;
    const rows = await this.sql`
      SELECT batch_id AS "batchId", data_hash AS "dataHash", storage_cid AS "storageCID",
             geohash_prefix AS "geohashPrefix", status, point_count AS "pointCount",
             witnesses, contributor, submitted_at AS "submittedAt", validated_at AS "validatedAt"
      FROM batches WHERE batch_id = ${batchId}
    `;
    if (rows.length === 0) return null;
    // Neon returns untyped rows; row shape matches the SELECT above by construction.
    const row = rows[0] as unknown as Batch;
    return { ...row, witnesses: row.witnesses ?? [] };
  }

  async updateBatchStatus(
    batchId: string,
    status: BatchStatus,
    validatedAt: string | null,
    witnesses: string[],
  ): Promise<void> {
    await this.ready;
    await this.sql`
      UPDATE batches SET status = ${status}, validated_at = ${validatedAt}, witnesses = ${JSON.stringify(witnesses)}
      WHERE batch_id = ${batchId}
    `;
  }

  async insertReward(reward: Reward): Promise<void> {
    await this.ready;
    await this.sql`
      INSERT INTO rewards (contributor, batch_id, amount, status, claimed_at)
      VALUES (${reward.contributor}, ${reward.batchId}, ${reward.amount}, ${reward.status}, ${reward.claimedAt})
      ON CONFLICT (contributor, batch_id) DO UPDATE SET amount = EXCLUDED.amount, status = EXCLUDED.status
    `;
  }

  async getPendingReward(contributor: string, batchId: string): Promise<Reward | null> {
    await this.ready;
    const rows = await this.sql`
      SELECT contributor, batch_id AS "batchId", amount, status, claimed_at AS "claimedAt"
      FROM rewards WHERE contributor = ${contributor} AND batch_id = ${batchId}
    `;
    return rows.length ? (rows[0] as unknown as Reward) : null;
  }

  async markRewardClaimed(contributor: string, batchId: string, claimedAt: string): Promise<void> {
    await this.ready;
    await this.sql`
      UPDATE rewards SET status = 'claimed', claimed_at = ${claimedAt}
      WHERE contributor = ${contributor} AND batch_id = ${batchId}
    `;
  }

  async markAllRewardsClaimed(contributor: string, claimedAt: string): Promise<void> {
    await this.ready;
    await this.sql`
      UPDATE rewards SET status = 'claimed', claimed_at = ${claimedAt}
      WHERE contributor = ${contributor} AND status = 'pending'
    `;
  }

  async ping(): Promise<boolean> {
    await this.ready;
    await this.sql`SELECT 1`;
    return true;
  }
}

// ---------------------------------------------------------------------------
// JSON-file fallback backend
// ---------------------------------------------------------------------------

class JsonDb implements Db {
  backend: "json" = "json";
  private dir: string;

  constructor(dir: string) {
    this.dir = dir;
    mkdirSync(dir, { recursive: true });
  }

  private filePath(name: string): string {
    return resolve(this.dir, `${name}.json`);
  }

  private readAll<T>(name: string): T[] {
    const path = this.filePath(name);
    if (!existsSync(path)) return [];
    const raw = readFileSync(path, "utf-8").trim();
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  }

  private writeAll<T>(name: string, rows: T[]): void {
    writeFileSync(this.filePath(name), JSON.stringify(rows, null, 2));
  }

  async insertObservations(rows: Observation[]): Promise<void> {
    const existing = this.readAll<Observation>("observations");
    const ids = new Set(existing.map((o) => o.id));
    for (const row of rows) {
      if (!ids.has(row.id)) existing.push(row);
    }
    this.writeAll("observations", existing);
  }

  async findWitnessCandidates(
    type: string,
    lat: number,
    lng: number,
    sinceIso: string,
    excludeContributor: string,
  ): Promise<Observation[]> {
    const existing = this.readAll<Observation>("observations");
    return existing.filter(
      (o) =>
        o.type === type &&
        o.createdAt >= sinceIso &&
        o.contributor !== excludeContributor &&
        Math.abs(o.lat - lat) <= 0.02 &&
        Math.abs(o.lng - lng) <= 0.02,
    );
  }

  async upsertBatch(batch: Batch): Promise<void> {
    const existing = this.readAll<Batch>("batches");
    const idx = existing.findIndex((b) => b.batchId === batch.batchId);
    if (idx >= 0) existing[idx] = batch;
    else existing.push(batch);
    this.writeAll("batches", existing);
  }

  async getBatch(batchId: string): Promise<Batch | null> {
    const existing = this.readAll<Batch>("batches");
    return existing.find((b) => b.batchId === batchId) ?? null;
  }

  async updateBatchStatus(
    batchId: string,
    status: BatchStatus,
    validatedAt: string | null,
    witnesses: string[],
  ): Promise<void> {
    const existing = this.readAll<Batch>("batches");
    const idx = existing.findIndex((b) => b.batchId === batchId);
    if (idx < 0) return;
    existing[idx] = { ...existing[idx], status, validatedAt, witnesses };
    this.writeAll("batches", existing);
  }

  async insertReward(reward: Reward): Promise<void> {
    const existing = this.readAll<Reward>("rewards");
    const idx = existing.findIndex(
      (r) => r.contributor === reward.contributor && r.batchId === reward.batchId,
    );
    if (idx >= 0) existing[idx] = reward;
    else existing.push(reward);
    this.writeAll("rewards", existing);
  }

  async getPendingReward(contributor: string, batchId: string): Promise<Reward | null> {
    const existing = this.readAll<Reward>("rewards");
    return (
      existing.find((r) => r.contributor === contributor && r.batchId === batchId) ?? null
    );
  }

  async markRewardClaimed(contributor: string, batchId: string, claimedAt: string): Promise<void> {
    const existing = this.readAll<Reward>("rewards");
    const idx = existing.findIndex(
      (r) => r.contributor === contributor && r.batchId === batchId,
    );
    if (idx < 0) return;
    existing[idx] = { ...existing[idx], status: "claimed", claimedAt };
    this.writeAll("rewards", existing);
  }

  async markAllRewardsClaimed(contributor: string, claimedAt: string): Promise<void> {
    const existing = this.readAll<Reward>("rewards");
    const updated = existing.map((r) =>
      r.contributor === contributor && r.status === "pending"
        ? { ...r, status: "claimed" as RewardStatus, claimedAt }
        : r,
    );
    this.writeAll("rewards", updated);
  }

  async ping(): Promise<boolean> {
    return existsSync(this.dir);
  }
}

// ---------------------------------------------------------------------------

let dbSingleton: Db | null = null;

export function getDb(): Db {
  if (dbSingleton) return dbSingleton;
  const connectionString = process.env.DATABASE_URL;
  dbSingleton = connectionString
    ? new NeonDb(connectionString)
    : new JsonDb(resolve(process.cwd(), "data"));
  return dbSingleton;
}
