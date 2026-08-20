import api from './client';
import { ClaimResponse } from './types';

export async function claimReward(contributor: string): Promise<ClaimResponse> {
  try {
    const { data } = await api.post<ClaimResponse>('/reward/claim', { contributor });
    return data;
  } catch (error) {
    throw new Error(`Claim failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
