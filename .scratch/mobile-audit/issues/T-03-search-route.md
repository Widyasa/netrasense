# T-03 — Voice search & route selection (P-06 · P-07)

| Field | Value |
|---|---|
| **ID** | T-03 |
| **Prioritas** | Should R0 |
| **Layar PRD** | P-06 Cari tujuan (suara) · P-07 Pilihan rute |
| **Fitur PRD** | F-06 Pencarian tujuan lewat suara · F-07 Mesin rute berbasis skor aksesibilitas |
| **Section PRD** | 7.1, 7.2, 9.1, 9.2 |
| **Blocked by** | T-02 (Home dashboard) |
| **Blocks** | T-04 |

---

## Tujuan

Membuat pencarian tujuan dengan suara dan layar pemilihan rute. R0 minimal: satu rute demo yang bisa dipilih, dengan skor aksesibilitas lebih menonjol daripada jarak.

---

## Acceptance criteria

### P-06 — Cari tujuan (suara)

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-06.1 | Pengguna menekan tombol utama di P-05 | Perekaman dimulai | Earcon "mendengarkan" berbunyi dalam ≤150 ms dan transkrip langsung ditampilkan besar untuk pendamping awas |
| AC-06.2 | Ucapan mengandung nama tempat yang cocok >1 kandidat | Pencarian selesai | Sistem membacakan maksimal 3 kandidat teratas dengan jarak masing-masing, lalu menunggu pilihan |
| AC-06.3 | Tidak ada sinyal internet | Pencarian dilakukan | Sistem mencari pada indeks offline berisi tujuan tersimpan dan POI yang sudah diunduh, lalu menyebutkan keterbatasan itu |
| AC-06.4 | Ucapan tidak dikenali | Pengenalan gagal | Sistem meminta ulang satu kali dengan kalimat berbeda, lalu menawarkan daftar tujuan tersimpan |
| AC-06.5 | Pengguna diam >5 detik setelah earcon | Tidak ada ucapan | Perekaman berhenti otomatis dan kembali ke P-05 tanpa pesan error |

### P-07 — Pilihan rute

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-07.1 | Tersedia ≥2 rute alternatif | Perhitungan selesai | Rute diurutkan berdasarkan skor aksesibilitas menurun, bukan jarak menaik |
| AC-07.2 | Rute terpendek memiliki skor <60 | Hasil ditampilkan | Rute itu tetap ditampilkan dengan label risiko eksplisit, tidak disembunyikan |
| AC-07.3 | Tidak ada data Proof-of-Path untuk wilayah tersebut | Rute dihitung | Sistem memakai jaringan jalan dasar, menandai rute sebagai "belum terpetakan", dan menaikkan sensitivitas deteksi F-01 |
| AC-07.4 | Ada laporan bahaya <2 jam pada satu segmen | Rute dihitung | Segmen tersebut diberi penalti berat dan dihindari kecuali tidak ada alternatif |
| AC-07.5 | Selisih skor antar rute <5 poin | Hasil ditampilkan | Sistem memilih yang lebih pendek dan menyebutkan bahwa keduanya setara |
| AC-07.x | Rute dipilih | Pengguna mengetuk kartu | Navigasi ke P-08 dengan parameter rute |

---

## Implementasi

### Komponen baru

- `src/screens/VoiceSearchScreen.tsx` — layar pencarian suara.
- `src/screens/RouteSelectionScreen.tsx` — daftar kartu rute.
- `src/components/RouteCard.tsx` — skor aksesibilitas, jarak, durasi, label risiko.
- `src/components/CandidateList.tsx` — hasil pencarian suara.

### Hooks / logika

- `src/hooks/useVoiceSearch.ts` — wrapper speech-to-text Expo / native, handle silence timeout, fallback offline.
- `src/hooks/useRouteScoring.ts` — hitung skor aksesibilitas dari formula PRD 9.2.
- `src/services/search.ts` — pencarian POI online + cache offline.
- `src/demo/routes.ts` — data satu rute demo untuk hackathon.

### Navigasi

- P-05 → P-06 → P-07 → P-08.
- Kedalaman maksimum 3 dari beranda: OK (Home → Search → Route → Navigasi).

### Desain base

- Voice Orb aktif: `colors.violet.solid` berdenyut, stop saat reduce-motion.
- RouteCard: skor besar di kiri, jarak/durasi di kanan; warna skor mengikuti range (≥80 hijau, 60–80 amber, <60 oranye/merah).
- Font: `title` untuk nama tujuan, `bodyLg` untuk alamat.

---

## Proof of done

- [ ] Pengguna bisa mencari tujuan dengan suara dan mendapat transkrip.
- [ ] Pilihan rute menampilkan skor aksesibilitas lebih menonjol dari jarak.
- [ ] Memilih rute membuka P-08 dengan instruksi pertama.
