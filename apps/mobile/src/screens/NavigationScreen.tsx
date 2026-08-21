import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "@netrasense/shared";
import { VoiceOrb } from "../components/VoiceOrb";
import { NavigationScreenProps } from "./index";

const LEVEL_LABEL: Record<string, string> = {
  aman: "Aman",
  waspada: "Waspada",
  kepala: "Kepala",
  kritis: "Kritis",
};

const STATUS_BACKGROUND: Record<string, string> = {
  aman: colors.green.deep,
  waspada: colors.orange.deep,
  kepala: colors.amber.deep,
  kritis: colors.red.deep,
};

const STATUS_DOT: Record<string, string> = {
  aman: colors.green.solid,
  waspada: colors.orange.solid,
  kepala: colors.amber.solid,
  kritis: colors.red.solid,
};

export function NavigationScreen({
  hazards,
  onReportPress,
  onClosePress,
  isDemo,
  onDemoToggle,
}: NavigationScreenProps) {
  const topHazard = hazards[0];
  const level = topHazard?.level ?? "aman";
  const instruction = topHazard
    ? `${topHazard.class}${topHazard.distanceMeters != null ? `, ${topHazard.distanceMeters.toFixed(1)} m` : ""}`
    : "Jalan kosong, lanjutkan.";

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: colors.teal.solid }]} />
          <Text style={styles.statusText}>{isDemo ? "Demo aktif" : "Navigasi aktif"}</Text>
        </View>

        <Pressable
          onPress={onDemoToggle}
          style={({ pressed }) => [styles.demoToggle, pressed && styles.pressed]}
          accessibilityRole="switch"
          accessibilityState={{ selected: isDemo }}
        >
          <Text style={styles.demoLabel}>Demo</Text>
          <View
            style={[
              styles.toggleTrack,
              { backgroundColor: isDemo ? colors.amber.solid : "rgba(255,255,255,0.2)" },
            ]}
          >
            <View
              style={[
                styles.toggleThumb,
                { transform: [{ translateX: isDemo ? 24 : 0 }] },
              ]}
            />
          </View>
        </Pressable>
      </View>

      <View style={styles.mainStatus}>
        <VoiceOrb state={level === "aman" ? "idle" : "listening"} size={160} />
        <Text style={styles.instruction}>{instruction}</Text>
      </View>

      <View style={styles.actions}>
        <View style={[styles.hazardBadge, { backgroundColor: STATUS_BACKGROUND[level] }]}>
          <View
            style={[
              styles.hazardDot,
              { backgroundColor: STATUS_DOT[level] ?? colors.paper },
            ]}
          />
          <Text style={styles.hazardBadgeText}>{LEVEL_LABEL[level] ?? level}</Text>
          <Text style={styles.hazardBadgeText} aria-hidden>
            {" "}·{" "}
          </Text>
          <Text style={styles.hazardBadgeText}>{topHazard?.class ?? "Jalan"}</Text>
          {topHazard?.distanceMeters != null && (
            <>
              <Text style={styles.hazardBadgeText} aria-hidden>
                {" "}·{" "}
              </Text>
              <Text style={styles.hazardBadgeText}>
                {topHazard.distanceMeters.toFixed(1)} m
              </Text>
            </>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [styles.reportButton, pressed && styles.pressed]}
          onPress={onReportPress}
          accessibilityRole="button"
          accessibilityLabel="Laporkan hambatan"
        >
          <Text style={styles.reportButtonText}>Laporkan hambatan</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
          onPress={onClosePress}
          accessibilityRole="button"
          accessibilityLabel="Tutup navigasi"
        >
          <Text style={styles.closeButtonText}>Tutup navigasi</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 64,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.teal.deep,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusText: {
    color: colors.paper,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
  demoToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 64,
    paddingHorizontal: 12,
  },
  demoLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
  toggleTrack: {
    width: 48,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.paper,
  },
  mainStatus: {
    marginTop: 48,
    gap: 32,
  },
  instruction: {
    color: colors.paper,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "700",
    maxWidth: "100%",
  },
  actions: {
    marginTop: "auto",
    gap: 32,
    paddingTop: 48,
  },
  hazardBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 64,
    width: "100%",
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  hazardDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  hazardBadgeText: {
    color: colors.paper,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  reportButton: {
    minHeight: 88,
    width: "100%",
    backgroundColor: colors.amber.solid,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  reportButtonText: {
    color: colors.ink,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  closeButton: {
    minHeight: 64,
    width: "100%",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  closeButtonText: {
    color: colors.paper,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
