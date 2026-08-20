import { playEarcon, speak, stopSpeech } from './audio';
import { triggerHaptic } from './haptics';

export async function alertHazard(level: 'kritis' | 'kepala' | 'waspada' | 'clear', message?: string) {
  if (level === 'kritis') stopSpeech();
  
  await Promise.all([
    playEarcon(level),
    triggerHaptic(level),
    message ? Promise.resolve(speak(message)) : Promise.resolve(),
  ]);
}
