import { useCallback, useEffect, useRef, useState } from "react";
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

const MIN_MS_BETWEEN_CALLS = 500;

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
}

export function useCameraHazards(enabled: boolean): UseCameraHazardsResult {
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();

  const [detections, setDetections] = useState<HazardDetection[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFrameAt, setLastFrameAt] = useState<number | null>(null);

  const lastCallAtRef = useRef(0);
  const inFlightRef = useRef(false);

  const captureAndDetect = useCallback(async () => {
    if (!enabled || !cameraRef.current) return;

    const now = Date.now();
    if (inFlightRef.current || now - lastCallAtRef.current < MIN_MS_BETWEEN_CALLS) {
      return;
    }
    lastCallAtRef.current = now;
    inFlightRef.current = true;
    setIsDetecting(true);

    try {
      const snapshot = await cameraRef.current.takeSnapshot({ quality: 50 });
      const base64 = await FileSystem.readAsStringAsync(snapshot.path, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setLastFrameAt(Date.now());

      const results = await detectHazards(base64);
      setDetections(results);
      setError(null);
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
      runAtTargetFps(2, () => {
        "worklet";
        runCaptureOnJS();
      });
    },
    [runCaptureOnJS],
  );

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
        .then((granted) => {
          if (!granted) {
            setError("Camera permission denied");
          }
        })
        .catch(() => setError("Camera permission denied"));
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
  };
}
