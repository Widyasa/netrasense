# T-05 — READ layer screens (P-11 · P-12 · P-13 · P-14)

| Field | Value |
|---|---|
| **ID** | T-05 |
| **Prioritas** | Should R0 |
| **Layar PRD** | P-11 Baca dunia (kamera) · P-12 Hasil pembacaan teks · P-13 Deskripsi adegan · P-14 Mode uang |
| **Fitur PRD** | F-12 Baca teks dunia nyata · F-13 Deskripsi adegan · F-14 Mode uang · F-15 Pencarian objek |
| **Section PRD** | 7.1, 10.1–10.3 |
| **Blocked by** | T-02 (Home dashboard) |
| **Blocks** | — |

---

## Tujuan

Membuat lapisan READ untuk membaca teks dunia nyata, mendeskripsikan adegan, dan mengenali uang rupiah. R0 minimal: OCR satu arah dan hasil pembacaan.

---

## Acceptance criteria

### P-11 — Baca dunia (kamera)

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-12.x | Tab Baca dipilih di beranda | P-11 dibuka | Kamera aktif dengan indikator perekaman, tombol aksi besar untuk memicu pembacaan |
| AC-12.5 | Pengguna menggerakkan kamera saat pembacaan | Gerakan >20°/detik terdeteksi | Sistem menunggu kamera stabil sebelum menganalisis, dengan panduan audio "tahan sebentar" |
| AC-12.1 | Pengguna memicu pembacaan | Kamera diarahkan ke objek berteks | Hasil dibacakan dalam ≤2,5 detik p95 dengan koneksi, ≤4 detik tanpa koneksi |
| AC-14.x | Mode uang dipilih di P-11 | Kamera diarahkan ke uang | Nominal dibacakan dalam ≤1,5 detik dan ditampilkan dengan ukuran teks terbesar di sistem |

### P-12 — Hasil pembacaan teks

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-12.2 | Teks terdeteksi sebagian buram | Pembacaan selesai | Bagian yang tidak yakin disebutkan secara eksplisit, dan tombol bantuan manusia (F-16) ditawarkan otomatis |
| AC-12.3 | Objek adalah kemasan obat | Teks dikenali sebagai label farmasi | Sistem membacakan dengan urutan tetap: nama, dosis, aturan pakai, kedaluwarsa — bukan urutan tata letak |
| AC-12.4 | Tidak ada teks terdeteksi | Analisis selesai | Sistem mengatakan "Saya tidak menemukan tulisan" dan menyarankan menggeser kamera, bukan menampilkan error |

### P-13 — Deskripsi adegan

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-13.1 | Adegan dianalisis | Deskripsi dihasilkan | Deskripsi tidak melebihi 4 poin dan setiap poin tidak melebihi 12 kata |
| AC-13.2 | Adegan mengandung orang | Deskripsi dihasilkan | Sistem menyebut keberadaan orang tanpa mendeskripsikan ciri fisik, usia, atau identitas apa pun |
| AC-13.3 | Model tidak yakin | Keyakinan di bawah ambang | Sistem mengatakan tidak yakin dengan kalimat eksplisit, bukan menebak dengan percaya diri |

### P-14 — Mode uang

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-14.1 | Lembar uang rupiah diarahkan ke kamera | Deteksi berhasil | Nominal dibacakan dalam ≤1,5 detik dan ditampilkan dengan ukuran teks terbesar di sistem |
| AC-14.2 | Beberapa lembar dihitung berurutan | Mode hitung aktif | Total berjalan dipertahankan dan dapat direset dengan satu ketukan |
| AC-14.3 | Uang terlipat atau rusak | Keyakinan rendah | Sistem menolak menyebutkan nominal dan meminta pengguna meratakan uang — **tidak pernah menebak nominal uang** |

---

## Implementasi

### Komponen baru

- `src/screens/ReadCameraScreen.tsx`
- `src/screens/ReadResultScreen.tsx`
- `src/screens/SceneDescriptionScreen.tsx`
- `src/screens/MoneyModeScreen.tsx`
- `src/components/CaptureButton.tsx` — tombol besar ≥88 dp.
- `src/components/LargeTextResult.tsx` — teks hasil dengan ukuran display.

### Hooks / logika

- `src/hooks/useOCR.ts` — wrapper Gemini Vision / on-device OCR.
- `src/hooks/useSceneDescription.ts` — generate deskripsi terstruktur PRD 10.2.
- `src/hooks/useMoneyRecognition.ts` — klasifikasi nominal uang Rupiah.
- `src/services/gemini.ts` — reuse; extend endpoint OCR & scene.

### Privasi

- Gambar diproses on-device bila memungkinkan.
- Jika dikirim ke awan, gambar dihapus segera setelah respons dan tidak dipakai untuk pelatihan tanpa izin.

### Navigasi

- P-05 tab Baca → P-11.
- P-11 → P-12/P-13/P-14 tergantung mode aktif.

### Desain base

- Hasil OCR: background `colors.paper`, teks `display`/`titleLg`, kontras maksimal.
- Mode uang: hijau/merah hanya untuk nominal, tidak untuk dekorasi.
- Indikator kamera aktif selalu terlihat.

---

## Proof of done

- [ ] Kamera Baca aktif dan bisa memicu OCR.
- [ ] Hasil teks ditampilkan dan dibacakan.
[ ] Mode uang menolak menebak saat keyakinan rendah.
