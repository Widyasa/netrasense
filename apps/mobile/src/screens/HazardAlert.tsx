import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@netrasense/shared";
import { HazardAlertProps } from "./index";

const CLASS_LABEL: Record<string, string> = {
  person: "Orang",
  pole: "Tiang",
  vehicle: "Kendaraan",
  branch: "Dahan",
  hole: "Lubang",
  other: "Hambatan",
};

export function HazardAlert({ hazard }: HazardAlertProps) {
  const label = CLASS_LABEL[hazard.class] ?? hazard.class;
  const distance =
    hazard.distanceMeters != null ? `${hazard.distanceMeters.toFixed(1)} meter` : "jarak tidak diketahui";

  return (
    <View style={styles.container} accessibilityRole="alert" accessibilityLiveRegion="assertive">
      <View style={styles.octagon} />
      <Text style={styles.title}>Berhenti</Text>
      <Text style={styles.detail}>
        {label}, {distance}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.red.deep,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    zIndex: 100,
  },
  octagon: {
    width: 64,
    height: 64,
    backgroundColor: colors.paper,
    borderRadius: 16,
    marginBottom: 24,
    transform: [{ rotate: "22.5deg" }],
  },
  title: {
    color: colors.paper,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "700",
    textAlign: "center",
  },
  detail: {
    color: colors.paper,
    fontSize: 20,
    lineHeight: 31,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 12,
  },
});
