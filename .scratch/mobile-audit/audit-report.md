# Audit Mobile Screen vs PRD.md

**Tanggal audit:** 2026-08-21  
**Scope:** `apps/mobile/` vs inventaris layar di `PRD.md` Bagian B.7  
**Base design yang sudah ada:** `NavigationScreen.tsx`, `HazardAlert.tsx`, `ReportSheet.tsx`, `ContributorWebViewScreen.tsx`, `VoiceOrb.tsx`.

---

## 1. Kesimpulan eksekutif

Aplikasi mobile saat ini baru mengimplementasikan **3,5 dari 28 layar mobile** yang terdaftar di PRD (hanya sekitar 12 %). Keempat layar yang ada baru berupa **kerangka fungsional** dan masih perlu ditingkatkan agar memenuhi kriteria penerimaan PRD.

Prioritas tertinggi untuk R0 adalah alur **onboarding → beranda → navigasi → laporkan bahaya**, karena itulah jalur demo hackathon. Setelah itu baru READ layer dan Contributor layer.

---

## 2. Layar yang sudah ada

| ID PRD | Nama PRD | File saat ini | Status | Catatan gap |
|---|---|---|---|---|
| P-08/P-09 | Navigasi — jalur aman / waspada | `src/screens/NavigationScreen.tsx` | ⚠️ Kerangka | Belum: panduan belok, audio spasial, jarak dalam langkah, peta rute, perbedaan visual aman vs waspada. Hanya menampilkan daftar hazard. |
| P-10 | Peringatan bahaya kritis | `src/screens/HazardAlert.tsx` | ⚠️ Kerangka | Sudah fullscreen merah. Belum: multi-kanal (haptic/audio sinkron), update isi saat hazard kedua, tidak boleh ada tombol tutup/animasi masuk (sesuai PRD), behave saat app background. |
| P-17 | Laporkan bahaya | `src/screens/ReportSheet.tsx` | ⚠️ Kerangka | Sudah bottom sheet pilihan jenis. Belum: urutan frekuensi Indonesia, lokasi auto-record, offline queue, duplikat <24 jam, selesai dalam dua ketukan. |
| K-05/W-02 | Dompet kontribusi / klaim | `src/screens/ContributorWebViewScreen.tsx` | ⚠️ Fallback | Saat ini hanya webview ke dApp. PRD ingin pengalaman tanpa jargon kripto; R0 minimal memperbolehkan fallback web, tetapi perlu native wrapper/error state yang lebih baik. |

---

## 3. Layar yang belum ada (urutan prioritas R0)

### 3.1 Alur inti R0 (Must)

| ID | Nama | Fitur | Mengapa penting untuk R0 |
|---|---|---|---|
| P-01 | Sambutan / splash bersuara | F-18 | Pengalaman pertama; sapaan suara ≤0,2 s wajib. |
| P-02 | Pilih profil | F-18 | Menentukan preset aksesibilitas & apakah mode kontributor aktif. |
| P-03 | Kalibrasi suara dan getaran | F-18, F-19 | TalkBack & haptic feel right di trotoar. |
| P-04 | Permintaan izin akses | F-18 | Kamera, lokasi, mikrofon dengan penjelasan konsekuensi. |
| P-05 | Beranda | F-06, F-11 | Titik masuk 4 tab: Jalan · Baca · Riwayat · Atur. |
| P-06 | Cari tujuan (suara) | F-06 | R0 minimal: satu rute demo dari suara. |
| P-07 | Pilihan rute | F-07 | R0 minimal: satu rute demo dengan skor aksesibilitas. |
| P-11 | Baca dunia (kamera) | F-12 | R0 minimal: OCR satu arah. |
| P-12 | Hasil pembacaan teks | F-12 | Hasil dibacakan, bantu manusia jika buram. |
| K-01 | Daftar misi | F-21 | R0 minimal: satu misi demo. |
| K-02 | Detail misi | F-21 | R0 minimal: detail misi demo. |
| K-03 | Mode pemetaan aktif | F-22 | R0 penuh: rekam data aksesibilitas. |
| K-04 | Hasil kontribusi | F-23 | R0 penuh: status validasi kontribusi. |

### 3.2 Alur inti diluar R0 tapi backlog penting

| ID | Nama | Fitur | Target |
|---|---|---|---|
| P-13 | Deskripsi adegan | F-13 | R1 |
| P-14 | Mode uang | F-14 | R1 |
| P-15 | Menghubungkan relawan | F-16 | R2 |
| P-16 | Sesi bantuan aktif | F-16 | R2 |
| P-18 | Perjalanan selesai | F-10 | R1 |
| P-19 | Riwayat perjalanan | F-11 | R1 |
| P-20 | Pengaturan aksesibilitas | F-19 | R1 |
| P-21 | Ukuran dan tampilan | F-20, F-05 | R1 |
| K-06 | Profil dan lencana | F-25 | R2 |

---

## 4. Masalah desain/aksesibilitas yang perlu diperhatikan

1. **Navigasi tidak punya bottom tab.** PRD mensyaratkan 4 tab (Jalan · Baca · Riwayat · Atur) dari P-05.
2. **Tidak ada routing/navigation library.** Saat ini semua layar dikelola manual di `App.tsx`.
3. **Font belum pakai Atkinson Hyperlegible / Space Grotesk.** Token sudah ada di `packages/shared`, belum di-mount ke tema RN.
4. **Haptic/audio engine baru dasar.** Perlu earcon library dan pustaka haptic sesuai PRD 22.
5. **Report sheet masih pakai `Modal` bawaan RN.** PRD melarang modal yang mengunci; semua dialog harus bisa ditutup gestur global.

---

## 5. Rekomendasi urutan pengerjaan

```
T-01 (Onboarding P-01..P-04)
    │
    ▼
T-11 (Navigation structure & global gestures)
    │
    ▼
T-02 (Home P-05)
    │
    ▼
T-03 (Search & route P-06/P-07)
    │
    ▼
T-04 (Navigation + critical alert P-08..P-10)
    │
    ▼
T-06 (Report hazard P-17)
    │
    ▼
T-05 (READ layer P-11..P-14)
    │
    ▼
T-09 (Contributor layer K-01..K-04/K-06)
    │
    ▼
T-07 (Trip summary/history P-18/P-19)
    │
    ▼
T-08 (Settings P-20/P-21)
    │
    ▼
T-10 (Human help P-15/P-16)
```

---

## 6. Daftar tiket yang dibuat

| Tiket | Judul | Layar | Prioritas |
|---|---|---|---|
| [T-01](issues/T-01-onboarding-screens.md) | Onboarding screens (P-01–P-04) | P-01, P-02, P-03, P-04 | Must R0 |
| [T-02](issues/T-02-home-dashboard.md) | Home dashboard (P-05) | P-05 | Must R0 |
| [T-03](issues/T-03-search-route.md) | Voice search & route selection (P-06–P-07) | P-06, P-07 | Should R0 |
| [T-04](issues/T-04-navigation-critical-alert.md) | Complete navigation & critical alert (P-08–P-10) | P-08, P-09, P-10 | Must R0 |
| [T-05](issues/T-05-read-layer.md) | READ layer screens (P-11–P-14) | P-11, P-12, P-13, P-14 | Should R0 |
| [T-06](issues/T-06-report-hazard.md) | Complete hazard report flow (P-17) | P-17 | Must R0 |
| [T-07](issues/T-07-trip-summary-history.md) | Trip summary & history (P-18–P-19) | P-18, P-19 | Should R1 |
| [T-08](issues/T-08-settings.md) | Settings screens (P-20–P-21) | P-20, P-21 | Must R1 |
| [T-09](issues/T-09-contributor-screens.md) | Contributor layer screens (K-01–K-06) | K-01, K-02, K-03, K-04, K-06 | Must R0 / R2 |
| [T-10](issues/T-10-human-help.md) | Human volunteer help (P-15–P-16) | P-15, P-16 | Must R2 |
| [T-11](issues/T-11-navigation-structure.md) | Navigation structure & global gestures | — | Must R0 |
