export type HazardClass =
  | "person"
  | "pole"
  | "vehicle"
  | "branch"
  | "hole"
  | "other";

export interface HazardBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface HazardDetection {
  id: string;
  class: HazardClass;
  confidence: number;
  bbox: HazardBoundingBox;
  distanceMeters?: number | null;
  timestamp: number;
}
