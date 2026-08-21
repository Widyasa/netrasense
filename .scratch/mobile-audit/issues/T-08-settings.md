# T-08 — Settings screens (P-20 · P-21)

| Field | Value |
|---|---|
| **ID** | T-08 |
| **Prioritas** | Must R1 |
| **Layar PRD** | P-20 Pengaturan aksesibilitas · P-21 Ukuran dan tampilan |
| **Fitur PRD** | F-19 Pengaturan aksesibilitas · F-20 Mode kontras ekstrem dan skala teks · F-05 Manajemen daya adaptif |
| **Section PRD** | 7.1, 7.2, 8.5, 11.3 |
| **Blocked by** | T-01 (Onboarding) · T-02 (Home dashboard) |
| **Blocks** | — |

---

## Tujuan

Membuat layar pengaturan aksesibilitas dan ukuran/tampilan. Posisi pengaturan aksesibilitas harus di tingkat pertama menu (bukan sub-menu).

---

## Acceptance criteria

### P-20 — Pengaturan aksesibilitas

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-19.1 | Pengaturan dibuka | Daftar ditampilkan | Pengaturan aksesibilitas berada di tingkat pertama menu, bukan di sub-menu |
| AC-19.x | Pengguna mengubah kecepatan bicara | Slider digeser | Suara pratinjau langsung berubah |
| AC-19.x | Pengguna mengubah verbositas | Pilihan dipilih | Level detail pengumuman berubah (minimal/normal/verbose) |
| AC-19.x | Pengguna mematikan haptic | Toggle dimatikan | Tidak ada getaran kecuali peringatan kritis (override keamanan) |

### P-21 — Ukuran dan tampilan

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-20.1 | Skala teks diubah | Slider digeser | Pratinjau berubah langsung memakai kalimat navigasi sungguhan, bukan lorem ipsum |
| AC-20.2 | Skala teks dinaikkan ke 200% | Seluruh layar diperiksa | Tidak ada konten terpotong, tidak ada tombol yang keluar layar, tidak ada teks bertumpuk |
| AC-20.3 | Mode kontras ekstrem diaktifkan | Seluruh aplikasi | Seluruh tint hilang, garis menebal jadi 2 px hitam, gradien dan bayangan dinonaktifkan, tebal huruf minimum naik ke Bold |
| AC-05.1 | Baterai turun di bawah 20% | Navigasi sedang aktif | Sistem menurunkan frame rate deteksi ke 8 fps, mematikan pembacaan teks pasif, dan mengumumkan perubahan satu kali |
| AC-05.2 | Baterai di bawah 10% | Navigasi aktif | Sistem mempertahankan **hanya** deteksi kelas Kritis dan panduan arah; seluruh fitur lain dinonaktifkan |
| AC-05.3 | Pengguna berhenti bergerak >60 detik | Terdeteksi lewat pedometer | Deteksi visual dijeda otomatis dan dilanjutkan saat gerakan terdeteksi lagi |
| AC-05.4 | Perangkat terlalu panas | Suhu melewati ambang sistem | Frame rate diturunkan bertahap, bukan dimatikan mendadak, dan pengguna diberi tahu |

---

## Implementasi

### Komponen baru

- `src/screens/SettingsScreen.tsx`
- `src/screens/DisplaySettingsScreen.tsx`
- `src/components/SettingRow.tsx`
- `src/components/PreviewCard.tsx` — kalimat navigasi sungguhan untuk preview skala teks.
- `src/components/PowerModeBanner.tsx` — notifikasi low battery / overheat.

### Hooks / logika

- `src/hooks/useAccessibilitySettings.ts` — store & persist settings.
- `src/hooks/usePowerManager.ts` — monitor baterai & suhu, turunkan FPS.
- `src/hooks/useMotionIdle.ts` — pedometer idle >60s detection.

### Navigasi

- P-05 tab Atur → P-20.
- P-20 → P-21.

### Desain base

- Setting row: label `bodyLg`, value `body`, touch target ≥64 dp.
- Toggle: accessible, dengan announcement saat berubah.
- Slider: large handle, feedback haptic saat berubah.

---

## Proof of done

- [ ] Pengaturan aksesibilitas di tingkat pertama menu.
- [ ] Skala teks 200% tidak memotong konten.
[ ] Mode kontras ekstrem mengubah seluruh aplikasi.
[ ] Low battery <20% memicu pengurangan FPS dan notifikasi suara.
