import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import {
  User,
  Signpost,
  Car,
  Tree,
  RadioButton,
  DotsThree,
  X,
} from "phosphor-react-native";
import { colors } from "@netrasense/shared";
import { ReportSheetProps } from "./index";

const TYPES: { value: string; label: string; icon: React.ElementType }[] = [
  { value: "person", label: "Orang", icon: User },
  { value: "pole", label: "Tiang", icon: Signpost },
  { value: "vehicle", label: "Kendaraan", icon: Car },
  { value: "branch", label: "Dahan", icon: Tree },
  { value: "hole", label: "Lubang", icon: RadioButton },
  { value: "other", label: "Lainnya", icon: DotsThree },
];

export function ReportSheet({ visible, onClose, onReport }: ReportSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Laporkan hambatan</Text>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.closeIcon, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Tutup"
            >
              <X size={24} color={colors.ink2} weight="bold" />
            </Pressable>
          </View>

          <View style={styles.grid}>
            {TYPES.map((t) => {
              const Icon = t.icon;
              return (
                <Pressable
                  key={t.value}
                  style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                  onPress={() => onReport(t.value)}
                  accessibilityRole="button"
                  accessibilityLabel={`Laporkan ${t.label}`}
                >
                  <View style={styles.iconCircle}>
                    <Icon size={28} color={colors.ink} weight="bold" />
                  </View>
                  <Text style={styles.buttonText}>{t.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Batal"
          >
            <Text style={styles.cancelButtonText}>Batal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(20,24,31,0.65)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.paper,
    padding: 24,
    paddingBottom: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: colors.ink,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
  },
  closeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  button: {
    flexBasis: "30%",
    flexGrow: 1,
    minHeight: 104,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.alt,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
  cancelButton: {
    minHeight: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.line,
  },
  cancelButtonText: {
    color: colors.ink2,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
