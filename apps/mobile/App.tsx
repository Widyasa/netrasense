import { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Camera } from "react-native-vision-camera";
import { colors } from "@netrasense/shared";
import { useHazardPipeline } from "./src/hooks/useHazardPipeline";
import { useReportFlow } from "./src/hooks/useReportFlow";
import { alertHazard } from "./src/engine";
import { DEMO_LOCATION } from "./src/demo/sampleData";
import {
  ContributorWebViewScreen,
  NavigationScreen,
  HazardAlert,
  ReportSheet,
} from "./src/screens";

const DEMO_MODE_DEFAULT = process.env.EXPO_PUBLIC_DEMO_MODE === "true";

export default function App() {
  const [showWebView, setShowWebView] = useState(false);
  const [detectionEnabled, setDetectionEnabled] = useState(true);
  const [reportVisible, setReportVisible] = useState(false);
  const [isDemo, setIsDemo] = useState(DEMO_MODE_DEFAULT);

  const {
    cameraRef,
    device,
    hasPermission,
    frameProcessor,
    hazards,
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

  if (showWebView) {
    return (
      <View style={styles.container}>
        <ContributorWebViewScreen />
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

      <Pressable style={styles.demoToggle} onPress={() => setIsDemo((v) => !v)}>
        <Text style={styles.demoToggleText}>{isDemo ? "Demo: ON" : "Demo: OFF"}</Text>
      </Pressable>

      <NavigationScreen 
        hazards={hazards} 
        onReportPress={() => setReportVisible(true)} 
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
  container: { flex: 1, backgroundColor: colors.paper },
  demoBackdrop: { backgroundColor: "#1a1a2e" },
  demoToggle: {
    position: "absolute",
    top: 48,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 10,
  },
  demoToggleText: { color: "white", fontWeight: "600" },
  reportStatus: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 12,
    borderRadius: 8,
  },
  reportStatusText: { color: "white", textAlign: "center" },
});
