import api from './client';
import { ValidateResponse } from './types';

export async function validateBatch(batchId: string): Promise<ValidateResponse> {
  try {
    const { data } = await api.post<ValidateResponse>('/validate', { batchId });
    return data;
  } catch (error) {
    throw new Error(`Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
