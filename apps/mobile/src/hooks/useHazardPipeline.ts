import { useMemo } from "react";
import { classifyHazard, estimateDistance, type HazardLevel } from "../engine";
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

  const hazards = useMemo<ClassifiedHazard[]>(() => {
    const classified = detections.map((detection): ClassifiedHazard => {
      const distanceMeters = estimateDistance(detection, detection.distanceMeters ?? null);
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
  }, [detections]);

  return { ...rest, hazards, isBusy: isDetecting, error: rest.error };
}
