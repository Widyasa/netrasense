import { useEffect, useRef, useState } from "react";
import { useFrameProcessor } from "react-native-vision-camera";
import type { Camera } from "react-native-vision-camera";
import type { HazardDetection } from "../types/hazard";
import { SAMPLE_DETECTIONS } from "../demo/sampleData";
import type { UseCameraHazardsResult } from "./useCameraHazards";

const CYCLE_MS = 2000;

/**
 * Mimics `useCameraHazards`'s interface but never touches the camera. Cycles
 * through `SAMPLE_DETECTIONS` on an interval so the rest of the hazard
 * pipeline (classification, alerting, reporting) can be exercised without a
 * device camera or Gemini key.
 */
export function useDemoHazards(enabled: boolean): UseCameraHazardsResult {
  const cameraRef = useRef<Camera>(null);
  const [detections, setDetections] = useState<HazardDetection[]>([]);
  const [lastFrameAt, setLastFrameAt] = useState<number | null>(null);
  const indexRef = useRef(0);

  // No-op frame processor: keeps the return shape identical to
  // useCameraHazards even though the camera is never mounted in demo mode.
  const frameProcessor = useFrameProcessor(() => {
    "worklet";
  }, []);

  useEffect(() => {
    if (!enabled) {
      setDetections([]);
      return;
    }

    const tick = () => {
      const base = SAMPLE_DETECTIONS[indexRef.current % SAMPLE_DETECTIONS.length];
      indexRef.current += 1;
      const now = Date.now();
      setDetections([{ ...base, id: `${base.id}-${now}`, timestamp: now }]);
      setLastFrameAt(now);
    };

    tick();
    const interval = setInterval(tick, CYCLE_MS);
    return () => clearInterval(interval);
  }, [enabled]);

  return {
    cameraRef,
    device: undefined,
    hasPermission: true,
    requestPermission: async () => true,
    frameProcessor,
    detections,
    isDetecting: false,
    error: null,
    lastFrameAt,
  };
}
