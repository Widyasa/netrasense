import type { HazardDetection } from "../types/hazard";
import type { ObservationInput } from "../api/types";

/** Valid geohash covering a demo point (used when no real GPS fix is available). */
export const DEMO_GEOHASH = "qqgg7z";

/** Fallback demo location paired with DEMO_GEOHASH. */
export const DEMO_LOCATION = { lat: -6.2, lng: 106.8 };

export const SAMPLE_DETECTIONS: HazardDetection[] = [
  {
    id: "demo-branch",
    class: "branch",
    confidence: 0.92,
    bbox: { x: 120, y: 80, width: 140, height: 160 },
    distanceMeters: 2.0,
    timestamp: Date.now(),
  },
  {
    id: "demo-person",
    class: "person",
    confidence: 0.88,
    bbox: { x: 60, y: 40, width: 180, height: 320 },
    distanceMeters: 4.0,
    timestamp: Date.now(),
  },
];

export function SAMPLE_OBSERVATION(type: string, lat: number, lng: number): ObservationInput {
  return {
    type,
    geohash: DEMO_GEOHASH,
    lat,
    lng,
    confidence: 0.9,
  };
}
