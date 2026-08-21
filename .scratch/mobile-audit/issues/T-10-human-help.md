# T-10 — Human volunteer help (P-15 · P-16)

| Field | Value |
|---|---|
| **ID** | T-10 |
| **Prioritas** | Must R2 |
| **Layar PRD** | P-15 Menghubungkan relawan · P-16 Sesi bantuan aktif |
| **Fitur PRD** | F-16 Bantuan relawan manusia |
| **Section PRD** | 7.1, 11.1 |
| **Blocked by** | T-02 (Home dashboard) · T-05 (READ layer, untuk tombol bantuan otomatis) |
| **Blocks** | — |

---

## Tujuan

Membuat layar permintaan dan sesi bantuan relawan manusia. R2, tidak wajib R0/R1.

---

## Acceptance criteria

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-16.1 | Pengguna meminta bantuan | Permintaan dikirim | Estimasi waktu tunggu dan jumlah relawan aktif ditampilkan jujur — tidak ada spinner tanpa keterangan |
| AC-16.2 | Tidak ada relawan tersedia dalam 90 detik | Waktu habis | Sistem menawarkan penjadwalan ulang atau bantuan berbayar profesional, tidak membiarkan pengguna menunggu tanpa batas |
| AC-16.3 | Sesi berjalan | Kamera aktif | Indikator kamera aktif ditampilkan permanen, dan tombol akhiri sesi berada di posisi tetap yang sama di seluruh sesi |
| AC-16.4 | Sesi berakhir | Relawan atau pengguna memutus | Pengguna dapat menilai sesi; penilaian memengaruhi reputasi on-chain relawan |
| AC-16.5 | Pengguna adalah penyandang tunanetra terverifikasi | Sesi dimulai | Biaya sesi ditarik dari Impact Treasury; pengguna tidak pernah melihat tagihan apa pun |
| AC-12.2 | Teks terdeteksi sebagian buram | Pembacaan selesai | Tombol bantuan manusia (F-16) ditawarkan otomatis dari P-12 |

---

## Implementasi

### Komponen baru

- `src/screens/VolunteerConnectScreen.tsx`
- `src/screens/VolunteerSessionScreen.tsx`
- `src/components/WaitTimeEstimate.tsx`
- `src/components/SessionControls.tsx`

### Hooks / logika

- `src/hooks/useVolunteerMatching.ts` — queue & matching.
- `src/hooks/useVolunteerSession.ts` — WebRTC / live streaming wrapper.

### Navigasi

- P-05 → P-15 via emergency gesture / menu.
- P-12 → P-15 saat OCR buram.
- P-15 → P-16 saat relawan ditemukan.

### Desain base

- Indikator kamera aktif selalu terlihat.
- Tombol akhiri sesi di posisi tetap, warna merah.

---

## Proof of done

- [ ] Pengguna bisa meminta bantuan dari beranda atau P-12.
- [ ] Estimasi waktu tunggu jujur.
- [ ] Sesi aktif dengan indikator kamera dan tombol akhiri tetap.
