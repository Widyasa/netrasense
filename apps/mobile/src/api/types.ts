export interface ObservationInput {
  type: string;
  geohash: string;
  lat: number;
  lng: number;
  confidence: number;
}

export interface IngestPayload {
  batchId: string;
  dataHash: string;
  storageCID?: string;
  geohashPrefix?: string;
  pointCount: number;
  observations: ObservationInput[];
  contributor: string;
}

export interface IngestResponse {
  status: 'provisional';
}

export interface ValidateResponse {
  success: boolean;
  message?: string;
}

export interface ClaimResponse {
  txHash: string;
}
