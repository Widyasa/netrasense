# T-11 — Navigation structure & global gestures

| Field | Value |
|---|---|
| **ID** | T-11 |
| **Prioritas** | Must R0 |
| **Layar PRD** | — (infrastruktur) |
| **Fitur PRD** | F-18 Onboarding, F-06/F-11 Home, semua layar |
| **Section PRD** | 7.2 Aturan navigasi wajib, 21.5, 22 |
| **Blocked by** | — |
| **Blocks** | T-01, T-02, T-04, T-05, T-06, T-09 |

---

## Tujuan

Menyediakan fondasi navigasi dan gestur global yang semua layar bisa andalkan: bottom tab, stack navigation, overlay P-10, dan gestur global (ketuk dua jari, usap tiga jari, guncang).

---

## Acceptance criteria

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-07.2x | Aplikasi aktif | Pengguna mengetuk dua jari | Hentikan panduan / potong ucapan apa pun |
| AC-07.2x | Aplikasi aktif | Pengguna mengusap tiga jari | Ulangi instruksi terakhir |
| AC-07.2x | Aplikasi aktif | Pengguna mengguncang perangkat | Panggil bantuan darurat / tampilkan P-15 |
| AC-07.2x | P-10 aktif | Pengguna melakukan gestur global | Peringatan bisa dipotong/diulang tanpa tombol tutup |
| AC-07.2x | Beranda aktif | Tab dipilih | Pindah layar utama tanpa reload kamera |
| AC-07.2x | Dari beranda | Navigasi ke fitur | Kedalaman maksimum 3 tingkat dari beranda |

---

## Implementasi

### Library

Pilih salah satu:
- `react-navigation` (native stack + bottom tabs) — paling umum, paling baik untuk aksesibilitas.
- Atau tetap manual jika ukuran bundle menjadi masalah, tetapi perlu bottom tab + stack handler yang solid.

Rekomendasi: install `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`.

### Komponen baru

- `src/navigation/RootNavigator.tsx`
- `src/navigation/HomeTabs.tsx`
- `src/components/GlobalGestureHandler.tsx` — ketuk dua jari / usap tiga jari.
- `src/components/ShakeDetector.tsx` — guncang perangkat.
- `src/components/BottomTabBar.tsx` — accessible custom tab bar (opsional, bisa pakai bawaan).

### Hooks / logika

- `src/hooks/useLastInstruction.ts` — menyimpan instruksi terakhir untuk ulang.
- `src/hooks/useEmergencyCall.ts` — guncang → trigger call/help.

### Integrasi

- Semua layar baru dibungkus `GlobalGestureHandler`.
- HazardAlert/P-10 sebagai overlay independent dari stack (render di atas root navigator).
- Pindahkan logika kamera dari `App.tsx` ke dalam layar navigasi agar tidak reload.

### Desain base

- Bottom tab: 4 tab — Jalan, Baca, Riwayat, Atur.
- Active tab: `colors.ink`; inactive: `colors.ink2`.
- Touch target ≥64 dp, jarak antar target ≥16 dp.

---

## Proof of done

- [ ] Bottom tab 4 tab bekerja dengan baik.
- [ ] Ketuk dua jari memotong ucapan di semua layar.
[ ] Guncang memicu emergency/help.
[ ] Kedalaman navigasi dari beranda tidak melebihi 3 tingkat.
