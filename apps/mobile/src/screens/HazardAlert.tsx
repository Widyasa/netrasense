import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HazardAlertProps } from "./index";

export function HazardAlert({ hazard }: HazardAlertProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.alertText}>CRITICAL HAZARD</Text>
      <Text style={styles.hazardInfo}>{hazard.class} - {hazard.distanceMeters?.toFixed(1)}m</Text>
      <Text style={styles.instruction}>STOP IMMEDIATELY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  alertText: { color: "white", fontSize: 32, fontWeight: "bold" },
  hazardInfo: { color: "white", fontSize: 24 },
  instruction: { color: "white", fontSize: 28, fontWeight: "bold" },
});
