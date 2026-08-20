import type { HazardDetection } from "../types/hazard";

export type HazardLevel = "kritis" | "kepala" | "waspada" | "aman";

export function classifyHazard(
  detection: HazardDetection & { distanceMeters: number },
): HazardLevel {
  const { class: hazardClass, distanceMeters } = detection;

  if (distanceMeters <= 2.0 || (hazardClass === "hole" && distanceMeters <= 3.0)) {
    return "kritis";
  }

  if ((hazardClass === "pole" || hazardClass === "branch") && distanceMeters <= 4.0) {
    return "kepala";
  }

  if (distanceMeters <= 6.0) {
    return "waspada";
  }

  return "aman";
}
