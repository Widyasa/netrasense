/**
 * Voice Orb — the only component allowed to run a recurring animation.
 *
 * A solid amber core sits at the center, surrounded by thin amber rings
 * that breathe very gently. All motion is gated behind
 * `prefers-reduced-motion: no-preference`; when motion safety is needed
 * the orb falls back to a completely static mark.
 */
export type VoiceOrbState = "idle" | "listening";

export function VoiceOrb({
  state,
  size = 160,
}: {
  state: VoiceOrbState;
  size?: number;
}) {
  const isListening = state === "listening";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Thin breathing halo rings behind the core */}
      <circle
        cx="80"
        cy="80"
        r="70"
        stroke="#FFC53D"
        strokeWidth="2"
        fill="none"
        opacity="0.15"
        className={
          isListening ? "animate-voice-breathe-2" : "animate-voice-breathe-1"
        }
      />
      <circle
        cx="80"
        cy="80"
        r="50"
        stroke="#FFC53D"
        strokeWidth="3"
        fill="none"
        opacity="0.25"
        className={
          isListening ? "animate-voice-breathe-1" : "animate-voice-breathe-2"
        }
      />

      {/* Solid amber core */}
      <circle cx="80" cy="80" r="22" fill="#FFC53D" />
    </svg>
  );
}
