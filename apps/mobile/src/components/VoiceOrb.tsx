import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "@netrasense/shared";

export type VoiceOrbState = "idle" | "listening";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function VoiceOrb({
  state,
  size = 160,
}: {
  state: VoiceOrbState;
  size?: number;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const ring1 = useRef(new Animated.Value(0.15)).current;
  const ring2 = useRef(new Animated.Value(0.25)).current;

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduceMotion(enabled);
    });
    const listener = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      (enabled) => setReduceMotion(enabled),
    );
    return () => {
      mounted = false;
      listener.remove();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const makeLoop = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 0.35,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(anim, {
            toValue: 0.15,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      );

    const loops = [makeLoop(ring1, 0), makeLoop(ring2, 800)];
    loops.forEach((l) => l.start());

    return () => {
      loops.forEach((l) => l.stop());
    };
  }, [reduceMotion, ring1, ring2]);

  const r1 = ring1.interpolate({
    inputRange: [0.15, 0.35],
    outputRange: [0.15, 0.35],
  });
  const r2 = ring2.interpolate({
    inputRange: [0.15, 0.35],
    outputRange: [0.25, 0.45],
  });

  const scale = size / 160;

  return (
    <Svg width={size} height={size} viewBox="0 0 160 160">
      <AnimatedCircle
        cx="80"
        cy="80"
        r="70"
        stroke={colors.amber.solid}
        strokeWidth="2"
        fill="none"
        opacity={r1}
      />
      <AnimatedCircle
        cx="80"
        cy="80"
        r="50"
        stroke={colors.amber.solid}
        strokeWidth="3"
        fill="none"
        opacity={r2}
      />
      <Circle cx="80" cy="80" r="22" fill={colors.amber.solid} />
    </Svg>
  );
}
