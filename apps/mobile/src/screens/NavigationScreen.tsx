import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { NavigationScreenProps } from "./index";

export function NavigationScreen({ hazards, onReportPress }: NavigationScreenProps) {
  const topHazards = hazards.slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>Navigating home</Text>
        <Text style={styles.instructionText}>Next: straight</Text>
      </View>

      <View style={styles.hazardList}>
        {topHazards.map((h, i) => (
          <Text key={i} style={styles.hazardItem}>
            {h.class} - {h.distanceMeters ? `${h.distanceMeters.toFixed(1)}m` : "unknown"}
          </Text>
        ))}
      </View>

      <Pressable
        style={styles.reportButton}
        onPress={onReportPress}
        accessibilityLabel="Report hazard"
      >
        <Text style={styles.buttonText}>Report</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statusBar: { position: "absolute", top: 40, left: 20, right: 20 },
  statusText: { color: "white", fontSize: 16 },
  instructionText: { color: "white", fontSize: 24, fontWeight: "bold" },
  hazardList: { position: "absolute", top: 120, left: 20 },
  hazardItem: { color: "yellow", fontSize: 14 },
  reportButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
