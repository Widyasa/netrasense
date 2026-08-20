import { requireNativeModule } from "expo-modules-core";

interface ARCoreDepthNativeModule {
  getDepthAtPoint(x: number, y: number): Promise<number | null>;
  isDepthAvailable(): Promise<boolean>;
}

function loadNativeModule(): ARCoreDepthNativeModule | null {
  try {
    return requireNativeModule<ARCoreDepthNativeModule>("ARCoreDepth");
  } catch {
    // Native module not linked (e.g. Expo Go, iOS, or a build without the
    // ARCore native module compiled in). Callers fall back to the heuristic.
    return null;
  }
}

const ARCoreDepth = loadNativeModule();

export async function getDepthAtPoint(x: number, y: number): Promise<number | null> {
  if (!ARCoreDepth) {
    return null;
  }
  try {
    return await ARCoreDepth.getDepthAtPoint(x, y);
  } catch {
    return null;
  }
}

export async function isDepthAvailable(): Promise<boolean> {
  if (!ARCoreDepth) {
    return false;
  }
  try {
    return await ARCoreDepth.isDepthAvailable();
  } catch {
    return false;
  }
}
