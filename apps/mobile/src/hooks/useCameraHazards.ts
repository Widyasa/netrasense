import { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
  runAtTargetFps,
} from "react-native-vision-camera";
import type { CameraDevice, ReadonlyFrameProcessor } from "react-native-vision-camera";
import { useRunOnJS } from "react-native-worklets-core";
import * as FileSystem from "expo-file-system";
import { detectHazards } from "../services/gemini";
import type { HazardDetection } from "../types/hazard";
import { classifyHazard, type HazardLevel } from "../engine/classifier";

const MIN_MS_BETWEEN_CALLS = 333;
const FPS_WINDOW = 10;

export interface UseCameraHazardsResult {
  cameraRef: React.RefObject<Camera>;
  device: CameraDevice | undefined;
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
  frameProcessor: ReadonlyFrameProcessor;
  detections: HazardDetection[];
  isDetecting: boolean;
  error: string | null;
  lastFrameAt: number | null;
  fps: number;
  targetFps: number;
}

function targetFpsForLevel(level: HazardLevel | null): number {
  if (level === "kritis") return 3;
  if (level === "kepala") return 2;
  return 1;
}

export function useCameraHazards(enabled: boolean): UseCameraHazardsResult {
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();

  const [detections, setDetections] = useState<HazardDetection[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFrameAt, setLastFrameAt] = useState<number | null>(null);
  const [fps, setFps] = useState(0);
  const [targetFps, setTargetFps] = useState(1);

  const lastCallAtRef = useRef(0);
  const inFlightRef = useRef(false);
  const frameTimestampsRef = useRef<number[]>([]);
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      appStateRef.current = nextState;
    });
    return () => subscription.remove();
  }, []);

  const captureAndDetect = useCallback(async () => {
    if (!enabled || !cameraRef.current) return;
    if (appStateRef.current !== "active") return;

    const now = Date.now();
    if (inFlightRef.current || now - lastCallAtRef.current < MIN_MS_BETWEEN_CALLS) {
      return;
    }
    lastCallAtRef.current = now;
    inFlightRef.current = true;
    setIsDetecting(true);

    try {
      const snapshot = await cameraRef.current.takeSnapshot({
        quality: 30,
      });
      const base64 = await FileSystem.readAsStringAsync(snapshot.path, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const frameAt = Date.now();
      setLastFrameAt(frameAt);

      const timestamps = frameTimestampsRef.current;
      timestamps.push(frameAt);
      while (timestamps.length > FPS_WINDOW) timestamps.shift();
      if (timestamps.length >= 2) {
        const spanSeconds = (timestamps[timestamps.length - 1] - timestamps[0]) / 1000;
        setFps(spanSeconds > 0 ? (timestamps.length - 1) / spanSeconds : 0);
      }

      const results = await detectHazards(base64);
      setDetections(results);
      setError(null);

      const topWithDistance = results.find(
        (detection): detection is HazardDetection & { distanceMeters: number } =>
          typeof detection.distanceMeters === "number",
      );
      const level = topWithDistance ? classifyHazard(topWithDistance) : null;
      setTargetFps(targetFpsForLevel(level));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hazard detection failed");
    } finally {
      inFlightRef.current = false;
      setIsDetecting(false);
    }
  }, [enabled]);

  const runCaptureOnJS = useRunOnJS(captureAndDetect, [captureAndDetect]);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      runAtTargetFps(targetFps, () => {
        "worklet";
        runCaptureOnJS();
      });
    },
    [runCaptureOnJS, targetFps],
  );

  useEffect(() => {
    if (!hasPermission) {
      void requestPermission();
    }
  }, [hasPermission, requestPermission]);

  return {
    cameraRef,
    device,
    hasPermission,
    requestPermission,
    frameProcessor,
    detections,
    isDetecting,
    error,
    lastFrameAt,
    fps,
    targetFps,
  };
}
