# T-09 — Contributor layer screens (K-01 · K-02 · K-03 · K-04 · K-06)

| Field | Value |
|---|---|
| **ID** | T-09 |
| **Prioritas** | Must R0 (K-03/K-04) / Should R0 (K-01/K-02/K-05) / R2 (K-06) |
| **Layar PRD** | K-01 Daftar misi · K-02 Detail misi · K-03 Mode pemetaan aktif · K-04 Hasil kontribusi · K-06 Profil dan lencana |
| **Fitur PRD** | F-21 Daftar misi dan bounty kelangkaan · F-22 Mode pemetaan otomatis · F-23 Validasi dan status kontribusi · F-25 Profil, lencana SBT, papan peringkat |
| **Section PRD** | 7.1, 13.2–13.4 |
| **Blocked by** | T-01 (Onboarding profile) · T-06 (Report hazard / contribution data) |
| **Blocks** | — |

---

## Tujuan

Membuat layar kontributor: daftar misi, mode pemetaan aktif, hasil kontribusi, dan profil/lencana. R0 penuh untuk K-03/K-04; minimal untuk K-01/K-02; K-06 untuk R2.

---

## Acceptance criteria

### K-01 — Daftar misi

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-21.x | Mode kontributor aktif | K-01 dibuka | Daftar misi ditampilkan dengan imbalan transparan sebelum berangkat |
| AC-21.x | Satu misi demo tersedia | R0 | Misi demo terlihat dengan jelas |

### K-02 — Detail misi

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-21.x | Misi dipilih | K-02 dibuka | Detail misi menampilkan area, durasi estimasi, imbalan, dan tombol mulai |

### K-03 — Mode pemetaan aktif

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-22.x | Mode pemetaan dimulai | K-03 aktif | Kamera + IMU + GPS merekam observation sesuai spesifikasi PRD 12.3 |
| AC-22.x | Pengguna berhenti bergerak >60 detik | Perekaman aktif | Perekaman dijeda otomatis, dilanjutkan saat bergerak |
| AC-22.x | Mode privat (rumah sakit/sekolah/tempat ibadah) | Terdeteksi | Perekaman video dijeda; hanya data semantik yang terekam |

### K-04 — Hasil kontribusi

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-23.x | Sesi pemetaan selesai | K-04 dibuka | Status provisional/validated/rejected ditampilkan dengan jelas |
| AC-23.x | Data lolos verifikasi otomatis | Status berubah | Sistem memberi earcon `contribution` dan haptic `tripleSoft` |
| AC-23.x | Data ditolak | Status rejected | Alasan penolakan dijelaskan dengan bahasa yang jelas |

### K-06 — Profil dan lencana (R2)

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-25.x | Profil kontributor dibuka | K-06 aktif | Menampilkan lencana SBT, reputasi, papan peringkat lokal |

---

## Implementasi

### Komponen yang ada

- `ContributorWebViewScreen.tsx` saat ini handle K-05/W-02 via webview. Untuk K-01..K-04/K-06 butuh layar native.

### Komponen baru

- `src/screens/MissionListScreen.tsx`
- `src/screens/MissionDetailScreen.tsx`
- `src/screens/MappingModeScreen.tsx`
- `src/screens/ContributionResultScreen.tsx`
- `src/screens/ContributorProfileScreen.tsx`
- `src/components/MissionCard.tsx`
- `src/components/MappingHUD.tsx` — indikator perekaman, jarak, titik data.
- `src/components/ValidationBadge.tsx` — provisional / validated / rejected.

### Hooks / logika

- `src/hooks/useMissions.ts` — fetch daftar misi.
- `src/hooks/useMappingRecorder.ts` — rekaman observation bundle.
- `src/hooks/useContributionStatus.ts` — polling status validasi.
- `src/services/ingest.ts` — reuse; pastikan handle contribution bundle.

### Navigasi

- Aktivasi mode kontributor dari P-02 atau P-20 → K-01.
- K-01 → K-02 → K-03 → K-04.
- Profil kontributor: K-01 → K-06.

### Desain base

- Aksen utama kontributor: `colors.violet`.
- MissionCard: imbalan transparan, progress bar.
- MappingHUD: indikator rekaman besar, status online/offline.
- ValidationBadge: hijau = validated, oranye = provisional, merah = rejected.

---

## Proof of done

- [ ] Mode pemetaan aktif bisa merekam dan mengirim observation bundle.
- [ ] Status validasi muncul di K-04.
[ ] Daftar misi minimal (satu misi demo) terlihat.
