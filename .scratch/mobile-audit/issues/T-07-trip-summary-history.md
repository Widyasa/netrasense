# T-07 — Trip summary & history (P-18 · P-19)

| Field | Value |
|---|---|
| **ID** | T-07 |
| **Prioritas** | Should R1 |
| **Layar PRD** | P-18 Perjalanan selesai · P-19 Riwayat perjalanan |
| **Fitur PRD** | F-10 Ringkasan perjalanan · F-11 Riwayat dan rute tersimpan |
| **Section PRD** | 7.1, 7.2, 10.2 |
| **Blocked by** | T-04 (Navigation & critical alert) |
| **Blocks** | T-02 (Home dashboard shortcut data) |

---

## Tujuan

Membuat ringkasan perjalanan saat tiba dan riwayat perjalanan di tab Riwayat. Fokus metrik: rasio waktu sistem diam dan jumlah titik data yang dikirim.

---

## Acceptance criteria

### P-18 — Perjalanan selesai

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-10.1 | Pengguna tiba dalam radius 15 m dari tujuan | Kedatangan terdeteksi | Ringkasan menampilkan jarak, waktu, jumlah peringatan, dan **rasio waktu sistem diam** sebagai metrik yang paling ditonjolkan |
| AC-10.2 | Perjalanan menghasilkan titik data baru | Ringkasan ditampilkan | Jumlah titik data yang dikirim ditampilkan dengan aksen Violet dan status validasinya |

### P-19 — Riwayat perjalanan

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-11.1 | Rute pernah ditempuh ≥3 kali | Beranda dibuka | Rute muncul sebagai pintasan tersimpan tanpa perlu diatur manual |
| AC-11.2 | Pengguna melihat riwayat mingguan | Data tersedia | Jumlah perjalanan solo minggu ini dibandingkan minggu lalu ditampilkan sebagai metrik utama |

---

## Implementasi

### Komponen baru

- `src/screens/TripSummaryScreen.tsx`
- `src/screens/TripHistoryScreen.tsx`
- `src/components/TripMetricCard.tsx`
- `src/components/WeeklyComparison.tsx`

### Hooks / logika

- `src/hooks/useTripRecorder.ts` — rekam jarak, waktu, jumlah peringatan, titik data.
- `src/hooks/useSavedRoutes.ts` — hitung frekuensi perjalanan.
- `src/store/tripStore.ts` — persist riwayat lokal.

### Navigasi

- P-08/P-09 tiba di tujuan → P-18.
- P-18 → P-05 atau tab Riwayat.
- Tab Riwayat di P-05 → P-19.

### Desain base

- Metrik utama (rasio diam) dengan `display` size + `colors.teal.deep`.
- Titik data dengan `colors.violet.solid`.
- Kartu riwayat: route name, date, distance, warning count.

---

## Proof of done

- [ ] Layar ringkasan muncul otomatis saat tiba di tujuan demo.
- [ ] Riwayat menampilkan perbandingan mingguan.
- [ ] Rute yang sering dipakai muncul di beranda.
