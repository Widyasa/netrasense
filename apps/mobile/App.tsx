import { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Camera } from "react-native-vision-camera";
import { colors } from "@netrasense/shared";
import { useHazardPipeline } from "./src/hooks/useHazardPipeline";
import { useReportFlow } from "./src/hooks/useReportFlow";
import { alertHazard } from "./src/engine";
import { DEMO_LOCATION } from "./src/demo/sampleData";
import { NavigationScreen, HazardAlert, ReportSheet } from "./src/screens";

const DEMO_MODE_DEFAULT = process.env.EXPO_PUBLIC_DEMO_MODE === "true";

export default function App() {
  const [reportVisible, setReportVisible] = useState(false);
  const [isDemo, setIsDemo] = useState(DEMO_MODE_DEFAULT);
  const [detectionEnabled, setDetectionEnabled] = useState(true);

  const {
    cameraRef,
    device,
    hasPermission,
    frameProcessor,
    hazards,
    fps,
    depthAvailable,
  } = useHazardPipeline(detectionEnabled, isDemo);

  const { submit: reportHazard, isSubmitting, result, error } = useReportFlow();

  const topHazard = hazards[0];
  const isKritis = topHazard?.level === "kritis";

  useEffect(() => {
    if (!topHazard || topHazard.level === "aman") return;
    alertHazard(
      topHazard.level,
      `${topHazard.class} ${topHazard.distanceMeters?.toFixed(1) ?? "?"} meter`,
    );
  }, [topHazard?.id, topHazard?.level]);

  const handleReport = (type: string) => {
    setReportVisible(false);
    void reportHazard(type, DEMO_LOCATION);
  };

  if (!isDemo && (!hasPermission || !device)) return null;

  if (!detectionEnabled) {
    return (
      <View style={[styles.container, styles.stopped]}>
        <Text style={styles.stoppedTitle}>Navigasi dihentikan</Text>
        <Pressable
          style={({ pressed }) => [styles.resumeButton, pressed && styles.pressed]}
          onPress={() => setDetectionEnabled(true)}
          accessibilityRole="button"
        >
          <Text style={styles.resumeButtonText}>Lanjutkan navigasi</Text>
        </Pressable>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isDemo || !device ? (
        <View style={[StyleSheet.absoluteFill, styles.demoBackdrop]} />
      ) : (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={detectionEnabled}
          frameProcessor={frameProcessor}
          pixelFormat="yuv"
        />
      )}

      <NavigationScreen
        hazards={hazards}
        onReportPress={() => setReportVisible(true)}
        onClosePress={() => setDetectionEnabled(false)}
        isDemo={isDemo}
        onDemoToggle={() => setIsDemo((v) => !v)}
        fps={isDemo ? undefined : fps}
        depthAvailable={isDemo ? undefined : depthAvailable}
      />

      {isKritis && <HazardAlert hazard={topHazard} />}

      <ReportSheet
        visible={reportVisible}
        onClose={() => setReportVisible(false)}
        onReport={handleReport}
      />

      {(isSubmitting || result || error) && (
        <View style={styles.reportStatus} pointerEvents="none">
          <Text style={styles.reportStatusText}>
            {isSubmitting
              ? "Submitting report..."
              : error
                ? `Error: ${error}`
                : result
                  ? `Reward claimed: ${result.claim.txHash}`
                  : ""}
          </Text>
        </View>
      )}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  demoBackdrop: { backgroundColor: colors.ink },
  stopped: {
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    paddingHorizontal: 32,
  },
  stoppedTitle: {
    color: colors.paper,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
    textAlign: "center",
  },
  resumeButton: {
    minHeight: 88,
    width: "100%",
    maxWidth: 320,
    backgroundColor: colors.amber.solid,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  resumeButtonText: {
    color: colors.ink,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  reportStatus: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: "rgba(20,24,31,0.85)",
    padding: 16,
    borderRadius: 16,
  },
  reportStatusText: { color: colors.paper, textAlign: "center", fontSize: 16, fontWeight: "700" },
});
