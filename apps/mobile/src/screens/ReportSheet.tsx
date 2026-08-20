import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { ReportSheetProps } from "./index";

const TYPES = ["person", "pole", "vehicle", "branch", "hole", "other"];

export function ReportSheet({ visible, onClose, onReport }: ReportSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Report Hazard</Text>
          {TYPES.map((t) => (
            <Pressable
              key={t}
              style={styles.button}
              onPress={() => onReport(t)}
              accessibilityLabel={`Report ${t}`}
            >
              <Text>{t}</Text>
            </Pressable>
          ))}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
  sheet: { backgroundColor: "white", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  button: { padding: 15, borderBottomWidth: 1, borderColor: "#ccc" },
  closeButton: { marginTop: 10, padding: 10, alignItems: "center" },
});
