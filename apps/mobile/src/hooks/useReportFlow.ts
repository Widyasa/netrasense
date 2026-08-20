import { useCallback, useState } from "react";
import { submitReport, validateBatch, claimReward } from "../api";
import type { ClaimResponse } from "../api/types";
import { SAMPLE_OBSERVATION } from "../demo/sampleData";

const DEFAULT_CONTRIBUTOR =
  process.env.EXPO_PUBLIC_DEMO_CONTRIBUTOR || "0x0000000000000000000000000000000000000000";

export interface ReportFlowResult {
  batchId: string;
  claim: ClaimResponse;
}

export interface UseReportFlowResult {
  submit: (type: string, location: { lat: number; lng: number }) => Promise<void>;
  isSubmitting: boolean;
  result: ReportFlowResult | null;
  error: string | null;
}

function randomHex(byteLength: number): string {
  let out = "0x";
  for (let i = 0; i < byteLength * 2; i++) {
    out += Math.floor(Math.random() * 16).toString(16);
  }
  return out;
}

/**
 * Orchestrates the full demo report loop: ingest -> validate -> claim.
 */
export function useReportFlow(): UseReportFlowResult {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ReportFlowResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reportHazard = useCallback(
    async (type: string, location: { lat: number; lng: number }) => {
      setIsSubmitting(true);
      setError(null);
      setResult(null);

      try {
        const batchId = randomHex(16);
        const dataHash = randomHex(32);
        const observations = [SAMPLE_OBSERVATION(type, location.lat, location.lng)];
        const contributor = DEFAULT_CONTRIBUTOR;

        await submitReport({
          batchId,
          dataHash,
          pointCount: observations.length,
          observations,
          contributor,
        });

        await validateBatch(batchId);
        const claim = await claimReward(contributor);

        setResult({ batchId, claim });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Report flow failed");
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  return { submit: reportHazard, isSubmitting, result, error };
}
