# T-04 — Complete navigation & critical alert (P-08 · P-09 · P-10)

| Field | Value |
|---|---|
| **ID** | T-04 |
| **Prioritas** | Must R0 |
| **Layar PRD** | P-08 Navigasi — jalur aman · P-09 Navigasi — waspada · P-10 Peringatan bahaya kritis |
| **Fitur PRD** | F-01 Deteksi rintangan real-time · F-02 Klasifikasi kelas bahaya · F-03 Peringatan bahaya kritis multi-kanal · F-04 Estimasi jarak dan arah relatif badan · F-08 Panduan belok dan audio spasial |
| **Section PRD** | 7.1, 7.2, 8.1–8.4, 9.3 |
| **Blocked by** | T-03 (Search & route) · T-11 (Navigation structure) |
| **Blocks** | T-06, T-07 |

---

## Tujuan

Meningkatkan layar navigasi yang sudah ada (`NavigationScreen.tsx`, `HazardAlert.tsx`) agar memenuhi kriteria PRD: panduan belok, audio spasial, jarak dalam langkah, klasifikasi 4 kelas, dan peringatan kritis multi-kanal.

---

## Acceptance criteria

### P-08/P-09 — Navigasi

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-04.1 | Panjang langkah pengguna belum dikalibrasi | Perjalanan pertama dimulai | Sistem memakai nilai baku 0,65 m dan mengoreksinya otomatis dari data pedometer setelah 200 langkah |
| AC-04.2 | Objek berjarak <10 m | Peringatan diumumkan | Jarak disebut dalam langkah, dibulatkan ke bilangan bulat |
| AC-04.3 | Objek berjarak ≥10 m | Peringatan diumumkan | Jarak disebut dalam meter, dibulatkan ke kelipatan 5 |
| AC-08.1 | Audio spasial aktif dan headphone stereo terhubung | Panduan berjalan | Nada pemandu dipanning sesuai arah tujuan berikutnya dengan pembaruan ≥4 Hz |
| AC-08.2 | Belokan berjarak 30 langkah | Pengguna mendekat | Peringatan belok diberikan pada 30, 10, dan 3 langkah — tidak lebih sering |
| AC-08.3 | Pengguna melewati titik belok | Deviasi >15 m terdeteksi | Sistem menghitung ulang rute dan mengumumkan satu kali, tanpa nada menyalahkan |
| AC-08.5 | Panduan navigasi sedang diucapkan | Bahaya kelas Kepala atau Kritis terdeteksi | Ucapan navigasi dipotong seketika, tidak menunggu kalimat selesai |
| AC-02.1 | Objek terdeteksi dengan tinggi dasar >1,4 m dari tanah | Objek berada di jalur | Objek diklasifikasikan Kepala, bukan Waspada |
| AC-02.2 | Dua objek berbeda kelas terdeteksi bersamaan | Keduanya dalam radius peringatan | Hanya kelas tertinggi yang diumumkan; kelas lebih rendah ditahan hingga yang tinggi selesai |
| AC-02.4 | Jalur di depan bersih selama >10 detik | Tidak ada objek terdeteksi | Sistem tetap diam; earcon "Clear" hanya dibunyikan saat keluar dari zona bahaya, bukan secara berkala |

### P-10 — Peringatan kritis

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-03.1 | Kelas Kritis terdeteksi ≤2,5 m di jalur | Deteksi terkonfirmasi 2 frame berturut-turut | Peringatan muncul dalam ≤120 ms sejak frame kedua |
| AC-03.2 | Ponsel dalam mode senyap sistem | Bahaya kritis terdeteksi | Getaran tetap aktif dan audio tetap dibunyikan — perilaku ini dijelaskan saat onboarding dan dapat dimatikan hanya lewat pengaturan eksplisit |
| AC-03.3 | Peringatan sedang ditampilkan | Bahaya keluar dari jalur atau pengguna berhenti bergerak >3 detik | Peringatan hilang otomatis tanpa perlu interaksi apa pun |
| AC-03.4 | Peringatan sedang ditampilkan | Bahaya kritis kedua terdeteksi | Peringatan diperbarui isinya, tidak ditumpuk sebagai peringatan baru |
| AC-03.5 | Aplikasi di latar belakang, layar mati | Bahaya kritis terdeteksi | Audio dan getar tetap dipicu; layar tidak wajib menyala |
| AC-03.x | P-10 aktif | Pengguna mengetuk dua jari / usap tiga jari | Peringatan bisa dipotong/diulang (gestur global) |

---

## Implementasi

### Komponen yang ada perlu ditingkatkan

- `src/screens/NavigationScreen.tsx`:
  - Tambahkan header rute (nama jalan, sisa jarak).
  - Tambahkan indikator arah belokan.
  - Tampilkan hazard list sesuai prioritas kelas, bukan hanya 2 teratas.
  - Pisahkan UI aman (P-08) vs waspada (P-09) secara visual: aman = hanya peta mini + arah; waspada = overlay hazard.
- `src/screens/HazardAlert.tsx`:
  - Hapus tombol tutup / animasi masuk (larangan PRD).
  - Integrasikan audio + haptic sinkron.
  - Support update isi saat hazard baru.

### Komponen baru

- `src/components/CompassCue.tsx` — panning audio / visual arah.
- `src/components/RouteMiniMap.tsx` — peta mini sederhana (SVG/Canvas) untuk R0.
- `src/components/HazardItem.tsx` — tampilan kelas + jarak + arah relatif badan.

### Hooks / logika

- `src/hooks/useHazardPipeline.ts` — perluas return `distanceSteps`, `relativeDirection`, `hazardClass`.
- `src/hooks/useSpatialAudio.ts` — panning earcon berdasarkan bearing.
- `src/engine/audio.ts` — earcon library sesuai PRD 22.2.
- `src/engine/haptics.ts` — perluas dengan pola `ramp`, `longSharp`, `sharpDouble`.
- `src/engine/classifier.ts` — klasifikasi 4 kelas dengan bias ke aman pada kritis.

### Navigasi

- P-10 dapat muncul dari layar mana pun termasuk background (foreground service).
- Saat P-10 muncul, navigasi ke P-10 sebagai overlay, bukan replace.

---

## Proof of done

- [ ] Demo berjalan → deteksi bahaya kritis → P-10 fullscreen merah muncul ≤120 ms.
- [ ] Audio spasial / haptic `longSharp` terpicu saat kritis.
- [ ] Jarak hazard diumumkan dalam langkah (<10 m) atau meter kelipatan 5 (≥10 m).
- [ ] Instruksi belok muncul pada 30/10/3 langkah.
