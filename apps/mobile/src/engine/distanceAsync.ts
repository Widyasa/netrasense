import { getDepthAtPoint } from "../native/ARCoreModule";
import type { HazardDetection } from "../types/hazard";
import { estimateDistance } from "./distance";

/**
 * Resolves a hazard's distance in meters, preferring live ARCore Depth API
 * samples at the bounding-box center and falling back to the synchronous
 * bounding-box heuristic (`estimateDistance`) whenever ARCore is unavailable
 * or returns `null` (unsupported device, session conflict with the vision
 * camera preview, depth not yet available for the frame, etc.).
 */
export async function estimateDistanceAsync(detection: HazardDetection): Promise<number | null> {
  if (typeof detection.distanceMeters === "number" && detection.distanceMeters > 0) {
    return detection.distanceMeters;
  }

  const centerX = detection.bbox.x + detection.bbox.width / 2;
  const centerY = detection.bbox.y + detection.bbox.height / 2;
  const arCoreDepth = await getDepthAtPoint(centerX, centerY);

  return estimateDistance(detection, arCoreDepth);
}
