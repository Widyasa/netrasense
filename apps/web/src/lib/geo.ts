// Demo-grade geo helpers: haversine distance + loose geohash validation.

const GEOHASH_ALPHABET = "0123456789bcdefghjkmnpqrstuvwxyz";

export function isValidGeohash(geohash: string | undefined | null): boolean {
  if (!geohash || typeof geohash !== "string") return false;
  if (geohash.length < 1 || geohash.length > 12) return false;
  return geohash
    .toLowerCase()
    .split("")
    .every((c) => GEOHASH_ALPHABET.includes(c));
}

export function isValidLatLng(lat: number, lng: number): boolean {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

/** Distance between two points in meters (haversine). */
export function distanceMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const WITNESS_WINDOW_MS = 24 * 60 * 60 * 1000; // 24h
export const WITNESS_RADIUS_METERS = 10; // 10m
