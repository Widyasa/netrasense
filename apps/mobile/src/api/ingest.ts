import api from './client';
import { IngestPayload, IngestResponse } from './types';

export async function submitReport(payload: IngestPayload): Promise<IngestResponse> {
  try {
    const { data } = await api.post<IngestResponse>('/ingest', payload);
    return data;
  } catch (error) {
    throw new Error(`Ingest failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
