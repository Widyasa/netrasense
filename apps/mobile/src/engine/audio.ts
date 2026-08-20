import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

const SFX: Record<string, any> = {
  kritis: require('../../assets/sfx/kritis.wav'),
  kepala: require('../../assets/sfx/kepala.wav'),
  waspada: require('../../assets/sfx/waspada.wav'),
  clear: require('../../assets/sfx/clear.wav'),
};

export async function playEarcon(pattern: 'kritis' | 'kepala' | 'waspada' | 'clear') {
  const { sound } = await Audio.Sound.createAsync(SFX[pattern]);
  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && status.didJustFinish) sound.unloadAsync();
  });
}

export function speak(text: string, options?: { rate?: number; language?: string }) {
  Speech.speak(text, {
    rate: options?.rate ?? 1.3,
    language: options?.language ?? 'id-ID',
  });
}

export function stopSpeech() {
  Speech.stop();
}
