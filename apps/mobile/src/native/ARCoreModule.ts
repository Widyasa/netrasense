import { NativeModules } from "react-native";

interface ARCoreNativeModule {
  getDepthAtPoint(x: number, y: number): Promise<number | null>;
}

const ARCoreModule: ARCoreNativeModule = NativeModules.ARCoreModule ?? {
  getDepthAtPoint: async () => null,
};

export async function getDepthAtPoint(x: number, y: number): Promise<number | null> {
  return ARCoreModule.getDepthAtPoint(x, y);
}
