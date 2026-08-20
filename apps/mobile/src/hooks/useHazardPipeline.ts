import { useEffect, useMemo, useState } from "react";
import { classifyHazard, estimateDistanceAsync, type HazardLevel } from "../engine";
import type { HazardDetection } from "../types/hazard";
import { useCameraHazards, type UseCameraHazardsResult } from "./useCameraHazards";
import { useDemoHazards } from "./useDemoHazards";

export interface ClassifiedHazard extends HazardDetection {
  distanceMeters: number | null;
  level: HazardLevel;
}

export interface UseHazardPipelineResult
  extends Omit<UseCameraHazardsResult, "detections" | "isDetecting"> {
  hazards: ClassifiedHazard[];
  isBusy: boolean;
  error: string | null;
}

const LEVEL_SEVERITY: Record<HazardLevel, number> = {
  kritis: 0,
  kepala: 1,
  waspada: 2,
  aman: 3,
};

export function useHazardPipeline(enabled: boolean, demo = false): UseHazardPipelineResult {
  const cameraResult = useCameraHazards(enabled && !demo);
  const demoResult = useDemoHazards(enabled && demo);
  const { detections, isDetecting, ...rest } = demo ? demoResult : cameraResult;

  // Distances resolve asynchronously (ARCore Depth API sample, falling back
  // to the bounding-box heuristic). Keyed by detection id so in-flight
  // detections keep their last-known distance across renders.
  const [resolvedDistances, setResolvedDistances] = useState<Record<string, number | null>>({});

  useEffect(() => {
    let cancelled = false;

    detections.forEach((detection) => {
      if (detection.id in resolvedDistances) return;

      estimateDistanceAsync(detection).then((distanceMeters) => {
        if (cancelled) return;
        setResolvedDistances((previous) => ({ ...previous, [detection.id]: distanceMeters }));
      });
    });

    const activeIds = new Set(detections.map((detection) => detection.id));
    const staleIds = Object.keys(resolvedDistances).filter((id) => !activeIds.has(id));
    if (staleIds.length > 0) {
      setResolvedDistances((previous) => {
        const next = { ...previous };
        staleIds.forEach((id) => delete next[id]);
        return next;
      });
    }

    return () => {
      cancelled = true;
    };
  }, [detections, resolvedDistances]);

  const hazards = useMemo<ClassifiedHazard[]>(() => {
    const classified = detections.map((detection): ClassifiedHazard => {
      if (!(detection.id in resolvedDistances)) {
        // Distance not resolved yet (ARCore sample + heuristic fallback are
        // both in flight): treat as a moderate hazard until it settles.
        return { ...detection, distanceMeters: null, level: "waspada" };
      }

      const distanceMeters = resolvedDistances[detection.id] ?? null;
      const level =
        distanceMeters === null
          ? "waspada"
          : classifyHazard({ ...detection, distanceMeters });

      return { ...detection, distanceMeters, level };
    });

    return classified.sort((a, b) => {
      const severityDiff = LEVEL_SEVERITY[a.level] - LEVEL_SEVERITY[b.level];
      if (severityDiff !== 0) return severityDiff;

      const distanceA = a.distanceMeters ?? Number.POSITIVE_INFINITY;
      const distanceB = b.distanceMeters ?? Number.POSITIVE_INFINITY;
      return distanceA - distanceB;
    });
  }, [detections, resolvedDistances]);

  return { ...rest, hazards, isBusy: isDetecting, error: rest.error };
}
