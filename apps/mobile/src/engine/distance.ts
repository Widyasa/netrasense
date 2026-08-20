import type { HazardClass, HazardDetection } from "../types/hazard";

const FOCAL_FACTOR_PX = 500;
const MIN_DISTANCE_M = 0.3;
const MAX_DISTANCE_M = 50;

const ASSUMED_HEIGHT_METERS: Record<HazardClass, number> = {
  person: 1.7,
  pole: 2.5,
  vehicle: 1.5,
  branch: 0.3,
  hole: 0,
  other: 1.0,
};

export function estimateDistance(
  detection: HazardDetection,
  depthMeters?: number | null,
): number | null {
  if (typeof depthMeters === "number" && depthMeters > 0) {
    return depthMeters;
  }

  const bboxHeight = detection.bbox.height;
  if (bboxHeight <= 0) {
    return null;
  }

  const assumedHeight = ASSUMED_HEIGHT_METERS[detection.class];
  const rawDistance = (assumedHeight * FOCAL_FACTOR_PX) / bboxHeight;

  return Math.min(Math.max(rawDistance, MIN_DISTANCE_M), MAX_DISTANCE_M);
}
