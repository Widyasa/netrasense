# T-06 — Complete hazard report flow (P-17)

| Field | Value |
|---|---|
| **ID** | T-06 |
| **Prioritas** | Must R0 |
| **Layar PRD** | P-17 Laporkan bahaya |
| **Fitur PRD** | F-17 Laporkan bahaya |
| **Section PRD** | 7.1, 7.2, 11.2 |
| **Blocked by** | T-04 (Navigation & critical alert) |
| **Blocks** | T-09 (Contributor validation) |

---

## Tujuan

Meningkatkan `ReportSheet.tsx` agar alur pelaporan bahaya memenuhi PRD: lokasi auto-record, urutan jenis berdasarkan frekuensi Indonesia, selesai dalam dua ketukan, offline queue, dan duplikat handling.

---

## Acceptance criteria

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-17.1 | Pengguna menekan tombol laporkan | Layar terbuka | Lokasi sudah terekam otomatis; pengguna hanya memilih jenis bahaya |
| AC-17.2 | Jenis bahaya dipilih | Laporan dikirim | Seluruh alur selesai dalam maksimal **dua ketukan** dari layar navigasi |
| AC-17.3 | Laporan terkirim | Konfirmasi diberikan | Sistem menyebutkan bahwa laporan akan memperingatkan pengguna lain, memberi konteks pada kontribusi tersebut |
| AC-17.4 | Tidak ada koneksi | Laporan dibuat | Laporan diantrekan lokal dan dikirim otomatis saat koneksi kembali |
| AC-17.5 | Laporan dibuat di lokasi yang sudah punya laporan serupa <24 jam | Pengiriman diproses | Laporan dihitung sebagai konfirmasi saksi tambahan, bukan laporan duplikat baru |

**Urutan jenis bahaya** (bukan abjad): lubang/galian → kendaraan parkir → bahaya setinggi kepala → jalur tertutup → permukaan licin → lainnya.

---

## Implementasi

### Komponen yang ada perlu ditingkatkan

- `src/screens/ReportSheet.tsx`:
  - Ubah dari `Modal` bawaan ke bottom sheet yang tidak mengunci (gestur global bisa tutup).
  - Perbarui urutan `TYPES` sesuai frekuensi Indonesia.
  - Tambahkan auto-record lokasi saat sheet dibuka.
  - Hapus tombol "Tutup" yang terlalu kecil; ganti dengan close gesture.

### Komponen baru

- `src/components/ReportSuccessToast.tsx` — konfirmasi suara + haptic `confirm`.
- `src/components/OfflineReportBadge.tsx` — indikator laporan pending.

### Hooks / logika

- `src/hooks/useReportFlow.ts` — perluas dengan:
  - Geolocation auto-capture.
  - Offline queue (`expo-file-system` atau AsyncStorage).
  - Deduplikasi radius & 24 jam.
  - Sync backoff saat online.
- `src/api/ingest.ts` — endpoint yang sudah ada, pastikan handle batch/duplicate.

### Navigasi

- Dari P-08/P-09 tombol laporkan → P-17 (bottom sheet).
- Setelah laporan sukses → kembali otomatis ke P-08/P-09.

### Desain base

- Tombol jenis bahaya: full-width, min-height 88 dp, border `colors.line`, pressed opacity 0.85.
- Warna kategori mengikuti kelas bahaya PRD (lubang = kritis merah, kendaraan parkir = oranye, dahan = amber, dll).

---

## Proof of done

- [ ] Alur pelaporan selesai dalam ≤2 ketukan dari navigasi.
[ ] Laporan offline diantrekan dan terkirim saat online.
[ ] Dua laporan serupa di lokasi yang sama dalam 24 jam dihitung sebagai konfirmasi, bukan duplikat.
