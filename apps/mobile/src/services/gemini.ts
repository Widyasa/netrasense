import axios from "axios";
import type { HazardClass, HazardDetection } from "../types/hazard";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? "";
const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const HAZARD_PROMPT =
  "You are a hazard detector for a blind navigation assistant. Analyze this image and return a JSON array of hazards. Each object: { class: 'person'|'pole'|'vehicle'|'branch'|'hole'|'other', confidence: 0..1, bbox: [x, y, width, height] in normalized 0..1 coordinates, distanceMeters?: number|null }. Return only valid JSON, no markdown.";

const HAZARD_CLASSES: HazardClass[] = [
  "person",
  "pole",
  "vehicle",
  "branch",
  "hole",
  "other",
];

interface RawHazard {
  class?: string;
  confidence?: number;
  bbox?: unknown;
  distanceMeters?: number | null;
}

function isHazardClass(value: unknown): value is HazardClass {
  return (
    typeof value === "string" &&
    (HAZARD_CLASSES as string[]).includes(value)
  );
}

function toBoundingBox(bbox: unknown): HazardDetection["bbox"] | null {
  if (!Array.isArray(bbox) || bbox.length !== 4) return null;
  const [x, y, width, height] = bbox;
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    typeof width !== "number" ||
    typeof height !== "number"
  ) {
    return null;
  }
  return { x, y, width, height };
}

function parseHazards(raw: unknown): HazardDetection[] {
  if (!Array.isArray(raw)) return [];
  const now = Date.now();
  const detections: HazardDetection[] = [];

  raw.forEach((item, index) => {
    if (typeof item !== "object" || item === null) return;
    const candidate = item as RawHazard;
    const bbox = toBoundingBox(candidate.bbox);
    if (!isHazardClass(candidate.class) || !bbox) return;
    if (typeof candidate.confidence !== "number") return;

    detections.push({
      id: `${now}-${index}`,
      class: candidate.class,
      confidence: candidate.confidence,
      bbox,
      distanceMeters:
        typeof candidate.distanceMeters === "number"
          ? candidate.distanceMeters
          : null,
      timestamp: now,
    });
  });

  return detections;
}

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const jsonCandidate = fencedMatch ? fencedMatch[1] : trimmed;
  return JSON.parse(jsonCandidate);
}

async function getDemoDetection(): Promise<HazardDetection[]> {
  const { promise, resolve } = Promise.withResolvers<HazardDetection[]>();
  setTimeout(() => {
    resolve([
      {
        id: `demo-${Date.now()}`,
        class: "branch",
        confidence: 0.85,
        bbox: { x: 0.3, y: 0.3, width: 0.2, height: 0.2 },
        distanceMeters: null,
        timestamp: Date.now(),
      },
    ]);
  }, 500);
  return promise;
}
export async function detectHazards(
  base64Image: string,
): Promise<HazardDetection[]> {
  if (!GEMINI_API_KEY) {
    return getDemoDetection();
  }

  try {
    const response = await axios.post(
      `${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: HAZARD_PROMPT },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } },
    );

    const text: unknown =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof text !== "string" || text.trim().length === 0) {
      return [];
    }

    const parsed = extractJson(text);
    return parseHazards(parsed);
  } catch {
    return [];
  }
}
