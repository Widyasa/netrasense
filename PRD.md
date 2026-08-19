# NetraSense — Product Requirements Document (PRD)

**Versi 1.0 · 18 Agustus 2026 · Bahasa Indonesia**

| Field | Isi |
|---|---|
| Nama produk | NetraSense |
| Nama jaringan | Proof-of-Path Network |
| Ringkasan satu kalimat | Asisten navigasi spasial berbasis AI dan AR untuk penyandang tunanetra dan low vision, ditopang jaringan peta aksesibilitas terdesentralisasi. |
| Pemilik dokumen | Product & Pitch Lead, Tim NetraSense |
| Status | Draft untuk implementasi — siap dieksekusi tahap MVP |
| Platform target | Android (APK) sebagai platform utama · Web dApp sebagai pendamping |
| Wilayah pilot | Denpasar, Bali — Indonesia |
| Dokumen terkait | Proposal Proyek v2.0 · Design Brief & Design System v2.0 · Konsep Desain UI v2.0 (HTML interaktif) |

---

## Cara membaca dokumen ini

PRD ini ditulis agar bisa dibaca oleh empat orang yang berbeda tanpa saling menunggu:

| Peran | Baca bagian ini | Bisa lewati |
|---|---|---|
| **Product / pitch** | 1, 2, 3, 4, 5, 6, 23, 24 | 11–16 (detail teknis) |
| **Mobile & AI engineer** | 6, 7, 8, 9, 10, 11, 17, 18, 19 | 3, 24 |
| **Web3 engineer** | 5, 12, 13, 14, 15, 16, 20 | 8, 17 |
| **Designer** | 6, 7, 17, 18, 19, 21 | 12–16 |

Setiap fitur diberi ID permanen (`F-xx`), setiap layar diberi ID (`P-xx`, `K-xx`, `W-xx`) yang sama persis dengan Konsep Desain UI, dan setiap kriteria penerimaan ditulis dalam format **Diberikan / Ketika / Maka** supaya bisa langsung dijadikan test case.

> **Catatan khusus untuk pembaca yang belum familier dengan Web3 dan dApp:**
> **Bagian 5** ditulis khusus untuk Anda. Bagian itu menjelaskan seluruh istilah Web3 yang muncul di dokumen ini dengan analogi sehari-hari, tanpa satu pun baris kode. Baca bagian 5 lebih dulu sebelum masuk ke bagian 12–16, dan seluruh bagian teknis akan jauh lebih mudah diikuti.

---

## Daftar Isi

### Bagian A — Fondasi

1. Latar belakang dan pernyataan masalah
2. Tujuan produk dan ukuran keberhasilan
3. Non-tujuan (yang sengaja tidak dibangun)
4. Persona dan konteks pemakaian
5. **Glosarium — memahami dApp tanpa jargon**

### Bagian B — Produk

6. Ruang lingkup rilis dan matriks fitur
7. Peta layar dan navigasi
8. Spesifikasi fungsional — Lapisan SENSE (deteksi)
9. Spesifikasi fungsional — Lapisan GUIDE (navigasi)
10. Spesifikasi fungsional — Lapisan READ (pembacaan)
11. Spesifikasi fungsional — Bantuan manusia dan pelaporan

### Bagian C — Jaringan &amp; Web3

12. Arsitektur jaringan Proof-of-Path
13. Spesifikasi fungsional — Kontributor
14. Spesifikasi smart contract
15. Ekonomi token dan aturan imbalan
16. Dompet, identitas, dan pengalaman tanpa jargon kripto

### Bagian D — Teknis

17. Arsitektur sistem dan tech stack
18. Model data dan skema
19. Spesifikasi API
20. Keamanan, privasi, dan kepatuhan

### Bagian E — Desain &amp; Kualitas

21. Spesifikasi desain dan design token
22. Spesifikasi audio dan haptic
23. Persyaratan non-fungsional
24. Analitik dan instrumentasi
25. Rencana pengujian dan QA

### Bagian F — Eksekusi

26. Rilis, lingkungan, dan CI/CD
27. Roadmap dan milestone
28. Tim, RACI, dan estimasi effort
29. Risiko dan mitigasi
30. Pertanyaan terbuka dan keputusan tertunda

---

# BAGIAN A — FONDASI

## 1. Latar belakang dan pernyataan masalah

### 1.1 Konteks

Organisasi Kesehatan Dunia mencatat sedikitnya **2,2 miliar orang** hidup dengan gangguan penglihatan jauh maupun dekat, dan untuk sedikitnya **1 miliar di antaranya** kondisi tersebut sebenarnya dapat dicegah atau belum tertangani. Beban ekonomi globalnya diperkirakan **US$411 miliar per tahun** dalam bentuk kehilangan produktivitas.

Indonesia berada pada posisi yang sangat buruk. Survei *Rapid Assessment of Avoidable Blindness* (RAAB) 2014–2016 yang dirujuk Kementerian Kesehatan mencatat prevalensi kebutaan **3% di 15 provinsi**, menempatkan Indonesia pada peringkat kedua tertinggi di dunia. Angka ini belum menghitung populasi *low vision* yang jauh lebih besar dan justru paling sering luput dari desain produk mana pun.

### 1.2 Tiga masalah yang saling menumpuk

**Masalah 1 — Tongkat putih buta terhadap ruang di atas pinggang.**
Tongkat mendeteksi permukaan dan rintangan setinggi lutut ke bawah dalam radius satu langkah. Dahan pohon, papan reklame rendah, spion truk, kanopi warung, dan kabel menggantung sama sekali tidak terdeteksi. Cedera kepala dan wajah adalah pola cedera yang paling sering dilaporkan komunitas tunanetra, dan justru pola yang paling tidak tertangani alat bantu yang ada.

**Masalah 2 — Navigasi digital berhenti pada level jalan, bukan level langkah.**
GPS konsumen memiliki presisi 5–15 meter. Itu cukup untuk mengarahkan mobil, tetapi tidak berguna untuk keputusan setengah langkah. Tidak ada aplikasi peta arus utama yang tahu apakah trotoar menyambung, apakah ada ubin pemandu, apakah penyeberangan bersuara, atau apakah ada galian PDAM yang dibuka kemarin sore.

**Masalah 3 — Data aksesibilitas level-mikro tidak pernah ada.**
Ini akar dari masalah 2, dan merupakan hipotesis utama produk ini. Data yang dibutuhkan bersifat sangat lokal, cepat basi, tidak menarik pengiklan, dan padat karya fisik. Empat sifat itu membuat tidak ada perusahaan komersial mana pun yang punya alasan ekonomi untuk mengumpulkannya.

### 1.3 Insight yang menjadi dasar seluruh produk

> Hambatan terbesar NetraSense bukanlah kecerdasan modelnya. Model deteksi objek yang dibutuhkan sudah tersedia dan cukup murah. Hambatannya adalah **ketiadaan data aksesibilitas level-mikro** — dan insentif terdesentralisasi adalah satu-satunya mekanisme yang secara ekonomi masuk akal untuk mengumpulkannya dalam skala kota, apalagi negara.

Dari insight ini lahir dua lapisan produk yang harus selalu dipahami terpisah:

| | Lapisan Produk | Lapisan Jaringan |
|---|---|---|
| **Apa** | Aplikasi yang menjaga seseorang di jalan | Peta aksesibilitas yang dibangun bersama |
| **Untuk siapa** | Penyandang tunanetra & low vision | Relawan awas, sponsor, pemerintah daerah |
| **Nilai** | Kemandirian bergerak | Data publik yang tidak dimiliki siapa pun |
| **Bekerja tanpa yang lain?** | Ya — deteksi real-time jalan penuh tanpa peta | Tidak — butuh pengguna agar datanya bermakna |

Fakta bahwa **Lapisan Produk tetap berguna di hari pertama tanpa satu pun titik data** adalah keputusan arsitektur yang disengaja, dan menjadi jawaban atas masalah *cold start* yang membunuh sebagian besar proyek berbasis kontribusi.

---

## 2. Tujuan produk dan ukuran keberhasilan

### 2.1 Tujuan utama

| # | Tujuan | Ukuran | Target fase pilot |
|---|---|---|---|
| G-1 | Mengurangi kejadian tabrakan saat berjalan | Tabrakan per kilometer berjalan | Turun ≥50% vs baseline tongkat saja |
| G-2 | Meningkatkan frekuensi perjalanan mandiri | Perjalanan solo per pengguna per minggu | Naik ≥40% setelah 8 minggu |
| G-3 | Membangun lapisan data yang belum pernah ada | Kilometer trotoar tervalidasi penuh | 50 km di area pilot |
| G-4 | Membuktikan model ekonomi kontribusi | Biaya per km terpetakan | <20% biaya survei konvensional |
| G-5 | Menjaga kepercayaan pada alat keselamatan | Retensi mingguan pengguna tunanetra | ≥60% pada minggu ke-8 |

### 2.2 Metrik kesehatan produk (guardrail metrics)

Metrik ini tidak dikejar untuk naik — metrik ini dijaga agar tidak rusak. Jika salah satu melanggar ambang, rilis ditahan.

| Metrik | Ambang | Alasan |
|---|---|---|
| Peringatan palsu per perjalanan | ≤2 | Di atas ini pengguna akan mematikan aplikasi, dan aplikasi yang dimatikan tidak menyelamatkan siapa pun |
| Negatif palsu pada kelas Kritis | ≤1% | Melewatkan lubang terbuka adalah kegagalan yang tidak dapat ditoleransi |
| Latensi deteksi hingga peringatan | ≤120 ms p95 | Di atas ini peringatan datang setelah langkah diambil |
| Konsumsi baterai mode navigasi | ≤18%/jam | Di atas ini pengguna tidak berani memakainya untuk perjalanan pulang |
| Rasio sistem diam saat jalur aman | ≥70% waktu perjalanan | Keheningan adalah sinyal aman; sistem cerewet = sistem gagal |

### 2.3 Definisi sukses MVP hackathon

MVP dinyatakan berhasil jika satu lingkaran penuh berjalan langsung di depan penonton, tanpa video:

**berjalan → deteksi bahaya nyata → peringatan audio + haptic → laporan terkirim → validasi → imbalan tercatat on-chain di testnet.**

---

## 3. Non-tujuan (yang sengaja tidak dibangun)

Bagian ini sama pentingnya dengan daftar fitur. Semua hal berikut **dinyatakan di luar ruang lingkup** dan tidak boleh masuk backlog tanpa keputusan ulang tingkat produk.

| # | Non-tujuan | Alasan |
|---|---|---|
| NG-1 | **Menggantikan tongkat putih atau anjing pemandu** | NetraSense adalah pelengkap. Tongkat menangani permukaan; kami menangani ruang di atas pinggang dan konteks. Posisi ini wajib disebut di onboarding. |
| NG-2 | **Diagnosis atau saran medis** | Produk ini bukan alat kesehatan dan tidak memberi penilaian apa pun tentang kondisi mata pengguna. |
| NG-3 | **Navigasi kendaraan** | Seluruh model rute dioptimalkan untuk pejalan kaki tanpa penglihatan. Menambah moda kendaraan akan merusak asumsi dasar mesin rute. |
| NG-4 | **Media sosial atau fitur komunitas dalam aplikasi pengguna** | Feed, komentar, dan profil publik menambah kebisingan pada produk yang inti desainnya adalah keheningan. |
| NG-5 | **Perdagangan token di dalam aplikasi** | Melanggar kebijakan toko aplikasi dan mengalihkan fokus produk. Klaim dan perdagangan hanya di web dApp. |
| NG-6 | **Marketplace NFT, koleksi, atau spekulasi harga** | Bertentangan langsung dengan positioning produk keselamatan. |
| NG-7 | **Dukungan iOS pada MVP** | ARCore, kebijakan toko, dan biaya perangkat menjadikan Android jalur tercepat. iOS masuk fase 3. |
| NG-8 | **Terjemahan multi-bahasa penuh** | MVP hanya Bahasa Indonesia dan Inggris. Bahasa daerah masuk setelah validasi pengguna. |
| NG-9 | **Kacamata AR** | Seluruh arsitektur disiapkan agar bisa dipindahkan, tetapi tidak ada layar yang dirancang sampai perangkatnya jelas. |

---

## 4. Persona dan konteks pemakaian

### 4.1 P1 — Ratna, 34 tahun · tunanetra total · pekerja kantoran

- **Konteks:** berangkat kerja sendiri setiap pagi, rute yang sama, ingin berhenti bergantung pada antaran keluarga.
- **Perangkat:** Android kelas menengah, headphone bone conduction, tongkat putih.
- **Kemampuan teknologi:** mahir TalkBack, memakai kecepatan bicara 2,0–2,5×, tidak sabar dengan aplikasi yang bertele-tele.
- **Kebutuhan utama:** peringatan bahaya setinggi kepala, panduan arah tanpa harus menerjemahkan instruksi verbal.
- **Yang membuatnya berhenti memakai produk:** peringatan palsu berulang, aplikasi yang bicara terus, baterai habis sebelum sampai rumah.

### 4.2 P2 — Bagus, 58 tahun · low vision · pensiunan

- **Konteks:** masih melihat bentuk kasar, tidak bisa membaca. Jarang bepergian jauh.
- **Kebutuhan utama:** membaca label obat, memeriksa nominal uang kembalian, membaca menu warung.
- **Catatan penting:** Bagus hampir tidak pernah memakai fitur navigasi. Bagi dia NetraSense adalah alat kemandirian harian, bukan alat mobilitas. **Segmen ini lebih besar dari segmen tunanetra total dan paling sering diabaikan pesaing.**
- **Yang membuatnya berhenti memakai produk:** teks terlalu kecil, kontras kurang, tombol terlalu rapat.

### 4.3 P3 — Dinda, 20 tahun · mahasiswa awas · kontributor

- **Konteks:** butuh jam pengabdian masyarakat, aktif di organisasi kampus, tertarik teknologi.
- **Motivasi:** pengakuan sosial, jam pengabdian, penghasilan tambahan kecil — dalam urutan itu.
- **Kebutuhan utama:** misi yang jelas, imbalan yang transparan sebelum berangkat, bukti kontribusi yang bisa dicantumkan di CV.
- **Yang membuatnya berhenti:** validasi yang tidak transparan, imbalan yang berubah tanpa penjelasan, aplikasi yang boros baterai saat merekam.

### 4.4 P4 — Ibu Sari, 45 tahun · manajer CSR bank daerah · sponsor

- **Konteks:** mengelola anggaran CSR triwulanan, harus melaporkan dampak ke direksi dan auditor.
- **Kebutuhan utama:** bukti dampak yang dapat diverifikasi pihak ketiga, bukan foto seremonial.
- **Yang membuatnya tidak jadi membeli:** laporan yang hanya bisa dipercaya kalau memercayai tim NetraSense.

### 4.5 Kondisi pemakaian acuan

Seluruh keputusan desain dan teknis diuji terhadap kondisi ini, bukan terhadap ruangan demo:

> Trotoar Denpasar pukul lima sore. Matahari rendah dan menyilaukan. Lalu lintas bising 70–80 dB. Satu tangan memegang tongkat, satu tangan memegang tas. Ponsel di saku atau penyangga dada. Baterai 20%. Sinyal seluler tidak stabil.

---

## 5. Glosarium — memahami dApp tanpa jargon

> Bagian ini ditulis khusus untuk anggota tim dan pembaca yang belum familier dengan Web3. Tidak ada satu pun baris kode di sini. Setelah membaca bagian ini, seluruh bagian 12–16 akan jauh lebih mudah diikuti.

### 5.1 Analogi induk: buku catatan yang disimpan banyak orang sekaligus

Bayangkan sebuah buku catatan besar berisi daftar hambatan di trotoar seluruh kota. Dalam sistem biasa, buku itu disimpan di satu lemari milik satu perusahaan. Kalau perusahaannya tutup, bukunya hilang. Kalau perusahaannya berbohong, tidak ada yang bisa membuktikannya.

**Blockchain adalah buku catatan yang salinannya dipegang ribuan komputer sekaligus.** Setiap kali ada catatan baru, semua salinan ikut diperbarui, dan tidak ada satu pihak pun yang bisa diam-diam menghapus atau mengubah baris lama. Itu saja. Sisanya adalah detail teknis.

### 5.2 Istilah yang muncul di dokumen ini

| Istilah | Penjelasan sederhana | Perannya di NetraSense |
|---|---|---|
| **Blockchain / chain** | Buku catatan bersama yang tidak bisa diubah diam-diam | Menyimpan bukti bahwa satu titik data benar-benar dikirim, divalidasi, dan diberi imbalan |
| **On-chain** | Data yang ditulis ke buku catatan bersama | Hanya ringkasan dan bukti — bukan data mentah, karena mahal |
| **Off-chain** | Data yang disimpan di server biasa | Detail titik data, tile peta, gambar — murah dan cepat dibaca |
| **Smart contract** | Program kecil yang tinggal di dalam buku catatan dan berjalan otomatis mengikuti aturan yang ditulis di dalamnya | Menghitung imbalan, mencatat validasi, mencairkan dana sponsor saat target tercapai |
| **Wallet / dompet** | Identitas digital pengguna di jaringan, sekaligus tempat menyimpan saldo | Di NetraSense, dompet dibuat otomatis dan dikunci sidik jari — pengguna tidak pernah melihatnya sebagai "dompet kripto" |
| **Seed phrase** | 12–24 kata rahasia yang menjadi kunci dompet. Hilang = saldo hilang selamanya | **Tidak dipakai di NetraSense.** Bagi pengguna tunanetra, menghafal dan mengetik 12 kata rahasia adalah hambatan aksesibilitas yang absurd |
| **Passkey** | Kunci yang tersimpan aman di ponsel dan dibuka dengan sidik jari atau wajah | Pengganti seed phrase. Pengguna cukup menempelkan jari |
| **Gas fee** | Biaya kecil yang dibayar setiap kali menulis ke buku catatan | Ditanggung sistem lewat *paymaster*, sehingga pengguna tidak pernah membayar dan tidak pernah tahu ada biaya |
| **Paymaster** | Layanan yang membayarkan gas fee atas nama pengguna | Membuat aplikasi terasa seperti aplikasi biasa |
| **Account Abstraction** | Teknologi yang memungkinkan dompet dibuka dengan sidik jari dan dipulihkan lewat kontak tepercaya, bukan lewat seed phrase | Fondasi seluruh pengalaman dompet NetraSense |
| **Token** | Satuan nilai yang dicatat di buku catatan bersama | `$NETRA` — dipakai sebagai imbalan kontribusi dan hak suara |
| **DePIN** | *Decentralized Physical Infrastructure Network* — jaringan orang yang mengumpulkan data dunia nyata dan diberi imbalan | Model dasar Proof-of-Path |
| **DAO** | Kelompok yang mengambil keputusan bersama lewat pemungutan suara yang tercatat di blockchain | Menentukan prioritas kota dan alokasi dana |
| **Sybil attack** | Satu orang membuat ratusan akun palsu untuk memanen imbalan | Ancaman utama jaringan ini; ditangani enam lapis pertahanan di bagian 12.4 |
| **Slashing** | Menyita jaminan seseorang karena terbukti berbuat curang | Mekanisme hukuman untuk validator yang meloloskan data palsu |
| **Attestation** | Catatan resmi di blockchain yang menyatakan "hal ini sudah diverifikasi" | Bukti bahwa satu titik data lolos validasi |
| **Testnet / Mainnet** | Testnet = jaringan latihan dengan uang mainan. Mainnet = jaringan sungguhan | MVP hackathon berjalan di testnet |
| **dApp** | Aplikasi yang sebagian logikanya berjalan di smart contract, bukan hanya di server perusahaan | Web dApp NetraSense = tempat klaim imbalan, voting, dan dasbor sponsor |
| **Soulbound token (SBT)** | Lencana digital yang tidak bisa dijual atau dipindahkan | Lencana kontributor — nilainya justru karena tidak bisa dibeli |
| **IPFS / storage terdesentralisasi** | Tempat menyimpan berkas besar secara tersebar, bukan di satu server | Menyimpan blob data pemetaan; hanya sidik jarinya yang ditulis on-chain |
| **Hash** | Sidik jari digital sebuah berkas. Berubah satu huruf, sidik jarinya berubah total | Cara membuktikan berkas tidak diubah tanpa harus menyimpan berkasnya di blockchain |

### 5.3 Kesalahpahaman yang sering terjadi — dan koreksinya

**"Kalau pakai blockchain, semua data disimpan di blockchain."**
Salah, dan ini kesalahan desain yang paling mahal. Menulis ke blockchain itu lambat dan berbiaya. NetraSense menulis **hanya sidik jari dan ringkasan** ke on-chain; datanya sendiri hidup di storage biasa. Perbandingannya: yang ditulis ke buku catatan bersama adalah "berkas X sudah diverifikasi, sidik jarinya ABC", bukan isi berkas X.

**"Pengguna harus punya kripto dulu."**
Tidak. Pengguna tunanetra tidak pernah menyentuh token, tidak pernah membayar, dan tidak pernah melihat kata "blockchain" di antarmuka. Dompet dibuat otomatis di balik layar dan dikunci sidik jari.

**"Blockchain membuat data otomatis benar."**
Salah, dan ini penting untuk produk keselamatan. Blockchain hanya menjamin catatan **tidak berubah setelah ditulis**. Kebenaran data dijamin oleh mekanisme validasi di bagian 12.4 — konsensus multi-saksi, reputasi, dan slashing.

**"Web3 selalu lebih baik."**
Tidak. Untuk aplikasinya, database terpusat justru lebih baik: lebih cepat, lebih murah, lebih mudah. NetraSense memakai blockchain **hanya untuk lapisan data jaringan**, karena tiga syarat spesifik terpenuhi sekaligus: kontributor tidak terpercaya dan tidak terbatas, data harus tetap hidup meski perusahaan mati, dan pembayaran mikro lintas wilayah tidak mungkin lewat perbankan biasa.

### 5.4 Diagram mental: apa yang ada di mana

```
PONSEL PENGGUNA                SERVER BIASA                 BLOCKCHAIN
(off-chain, privat)            (off-chain, publik)          (on-chain, permanen)
──────────────────             ────────────────             ───────────────────
video mentah          ✗ tidak  detail titik data            hash paket data
model AI                keluar tile peta rute               attestation validasi
lokasi presisi                 indeks pencarian             saldo imbalan
kunci dompet (passkey)         cache offline                hasil voting DAO
                                                            komitmen dana sponsor

     paling sensitif  ────────────────────────────────>  paling permanen
     paling murah                                        paling mahal
```

Aturan yang menurunkan seluruh keputusan teknis di bagian 17–19: **semakin sensitif sebuah data, semakin dekat ia disimpan ke pengguna. Semakin butuh dipercaya publik, semakin dekat ia ditulis ke blockchain.**

---

# BAGIAN B — PRODUK

## 6. Ruang lingkup rilis dan matriks fitur

### 6.1 Definisi rilis

| Rilis | Nama | Durasi | Tujuan |
|---|---|---|---|
| **R0** | MVP Hackathon | 48–72 jam | Membuktikan satu lingkaran penuh berjalan langsung |
| **R1** | Alpha Tertutup | Bulan 1–3 | Diuji 10–15 pengguna tunanetra nyata di rute nyata |
| **R2** | Pilot Denpasar | Bulan 4–8 | 200+ kontributor, kampanye sponsor pertama, mainnet |
| **R3** | Jaringan Multi-kota | Bulan 9–18 | 3–5 kota, DAO aktif, API publik |

### 6.2 Matriks fitur

Prioritas memakai MoSCoW: **M** = Must, **S** = Should, **C** = Could, **W** = Won't (untuk rilis tersebut).

| ID | Fitur | Lapisan | R0 | R1 | R2 | R3 | Layar |
|---|---|---|:--:|:--:|:--:|:--:|---|
| F-01 | Deteksi rintangan real-time on-device | SENSE | M | M | M | M | P-08, P-09 |
| F-02 | Klasifikasi kelas bahaya | SENSE | M | M | M | M | P-08, P-09 |
| F-03 | Peringatan bahaya kritis multi-kanal | SENSE | M | M | M | M | P-10 |
| F-04 | Estimasi jarak dan arah relatif badan | SENSE | M | M | M | M | P-08, P-09 |
| F-05 | Manajemen daya adaptif | SENSE | W | M | M | M | P-21 |
| F-06 | Pencarian tujuan lewat suara | GUIDE | S | M | M | M | P-06 |
| F-07 | Mesin rute berbasis skor aksesibilitas | GUIDE | S | M | M | M | P-07 |
| F-08 | Panduan belok dan audio spasial | GUIDE | M | M | M | M | P-08 |
| F-09 | Navigasi dan deteksi offline penuh | GUIDE | C | M | M | M | — |
| F-10 | Ringkasan perjalanan | GUIDE | C | S | M | M | P-18 |
| F-11 | Rute tersimpan dan riwayat | GUIDE | W | S | M | M | P-19 |
| F-12 | Baca teks dunia nyata (OCR) | READ | S | M | M | M | P-11, P-12 |
| F-13 | Deskripsi adegan | READ | C | S | M | M | P-13 |
| F-14 | Mode uang rupiah | READ | W | S | M | M | P-14 |
| F-15 | Pencarian objek berpandu audio | READ | W | C | S | M | — |
| F-16 | Bantuan relawan manusia | BANTU | W | C | M | M | P-15, P-16 |
| F-17 | Laporkan bahaya | BANTU | M | M | M | M | P-17 |
| F-18 | Onboarding dan profil pengguna | INTI | S | M | M | M | P-01…P-04 |
| F-19 | Pengaturan aksesibilitas | INTI | C | M | M | M | P-20 |
| F-20 | Mode kontras ekstrem dan skala teks | INTI | S | M | M | M | P-21 |
| F-21 | Daftar misi dan bounty kelangkaan | KONTRIB | S | M | M | M | K-01, K-02 |
| F-22 | Mode pemetaan otomatis | KONTRIB | M | M | M | M | K-03 |
| F-23 | Validasi dan status kontribusi | KONTRIB | M | M | M | M | K-04 |
| F-24 | Dompet kontribusi dan klaim | KONTRIB | S | M | M | M | K-05, W-02 |
| F-25 | Profil, lencana SBT, papan peringkat | KONTRIB | W | C | M | M | K-06 |
| F-26 | Peta jaringan publik | WEB | C | S | M | M | W-01 |
| F-27 | Klaim imbalan di web | WEB | S | M | M | M | W-02 |
| F-28 | Governance dan pemungutan suara | WEB | W | W | S | M | W-03 |
| F-29 | Dasbor sponsor dan proof of impact | WEB | W | C | M | M | W-04 |
| F-30 | API publik data aksesibilitas | WEB | W | W | C | M | — |

### 6.3 Ruang lingkup R0 secara eksplisit

**Termasuk:** F-01, F-02, F-03, F-04, F-08, F-17, F-22, F-23 penuh; F-06, F-07, F-12, F-18, F-20, F-21, F-24, F-27 versi minimal (satu rute demo, satu misi demo, testnet).

**Tidak termasuk:** seluruh fitur bertanda W di kolom R0, tokenomics lengkap, governance, sponsor, dan iOS.

---

## 7. Peta layar dan navigasi

### 7.1 Inventaris layar

| ID | Nama layar | Aplikasi | Fitur terkait |
|---|---|---|---|
| P-01 | Sambutan / splash bersuara | Pengguna | F-18 |
| P-02 | Pilih profil | Pengguna | F-18 |
| P-03 | Kalibrasi suara dan getaran | Pengguna | F-18, F-19 |
| P-04 | Permintaan izin akses | Pengguna | F-18 |
| P-05 | Beranda | Pengguna | F-06, F-11 |
| P-06 | Cari tujuan (suara) | Pengguna | F-06 |
| P-07 | Pilihan rute | Pengguna | F-07 |
| P-08 | Navigasi — jalur aman | Pengguna | F-01…F-04, F-08 |
| P-09 | Navigasi — waspada | Pengguna | F-02, F-04 |
| P-10 | Peringatan bahaya kritis | Pengguna | F-03 |
| P-11 | Baca dunia (kamera) | Pengguna | F-12, F-13, F-14 |
| P-12 | Hasil pembacaan teks | Pengguna | F-12 |
| P-13 | Deskripsi adegan | Pengguna | F-13 |
| P-14 | Mode uang | Pengguna | F-14 |
| P-15 | Menghubungkan relawan | Pengguna | F-16 |
| P-16 | Sesi bantuan aktif | Pengguna | F-16 |
| P-17 | Laporkan bahaya | Pengguna | F-17 |
| P-18 | Perjalanan selesai | Pengguna | F-10 |
| P-19 | Riwayat perjalanan | Pengguna | F-11 |
| P-20 | Pengaturan aksesibilitas | Pengguna | F-19 |
| P-21 | Ukuran dan tampilan | Pengguna | F-20, F-05 |
| K-01 | Daftar misi | Kontributor | F-21 |
| K-02 | Detail misi | Kontributor | F-21 |
| K-03 | Mode pemetaan aktif | Kontributor | F-22 |
| K-04 | Hasil kontribusi | Kontributor | F-23 |
| K-05 | Dompet kontribusi | Kontributor | F-24 |
| K-06 | Profil dan lencana | Kontributor | F-25 |
| W-01 | Peta jaringan | Web dApp | F-26 |
| W-02 | Dompet dan klaim | Web dApp | F-24, F-27 |
| W-03 | Governance | Web dApp | F-28 |
| W-04 | Dasbor sponsor | Web dApp | F-29 |

### 7.2 Model navigasi aplikasi pengguna

```
                        ┌──────────────┐
   onboarding sekali    │   P-05       │  4 tab bawah:
   P-01→P-02→P-03→P-04─>│   BERANDA    │  Jalan · Baca · Riwayat · Atur
                        └──────┬───────┘
              ┌────────────────┼────────────────┐
              v                v                v
        ┌──────────┐    ┌──────────┐     ┌──────────┐
        │ P-06     │    │ P-11     │     │ P-19     │
        │ cari     │    │ baca     │     │ riwayat  │
        └────┬─────┘    └────┬─────┘     └──────────┘
             v               v
        ┌──────────┐    ┌──────────┐
        │ P-07     │    │ P-12/13/14│
        │ rute     │    └──────────┘
        └────┬─────┘
             v
        ┌──────────┐   interupsi   ┌──────────┐
        │ P-08/09  │ ────────────> │  P-10    │
        │ navigasi │ <──────────── │  KRITIS  │
        └────┬─────┘   otomatis    └──────────┘
             │  ┌────────┐
             ├─>│ P-17   │ laporkan bahaya (kembali otomatis)
             v  └────────┘
        ┌──────────┐
        │ P-18     │ selesai
        └──────────┘
```

**Aturan navigasi wajib:**

1. **P-10 dapat muncul dari layar mana pun** ketika bahaya kritis terdeteksi, termasuk saat aplikasi di latar belakang dengan layar mati.
2. **Kedalaman navigasi maksimum 3 tingkat** dari beranda. Tidak ada alur yang memerlukan lebih dari tiga ketukan untuk selesai.
3. **Gestur global** berlaku di semua layar: ketuk dua jari = hentikan panduan/potong ucapan; usap tiga jari = ulangi instruksi terakhir; guncang perangkat = panggil bantuan darurat.
4. **Tidak ada modal yang mengunci** — setiap dialog dapat ditutup dengan gestur global tanpa perlu menemukan tombol.

---

## 8. Spesifikasi fungsional — Lapisan SENSE

### F-01 · Deteksi rintangan real-time on-device

| | |
|---|---|
| **Prioritas** | Must (R0) |
| **Layar** | P-08, P-09 |
| **Persona** | P1, P2 |
| **Ketergantungan** | Izin kamera (F-18), model deteksi terkuantisasi |

**Deskripsi.** Aplikasi memproses aliran kamera dan data kedalaman secara terus-menerus di perangkat, mengidentifikasi objek yang berada di jalur pejalan kaki pengguna dalam radius 0,5–8 meter, dan meneruskan hasilnya ke pengklasifikasi bahaya (F-02).

**User story.** *Sebagai* Ratna yang berjalan di trotoar, *saya ingin* sistem melihat rintangan di depan saya secara terus-menerus, *supaya* saya tahu ada sesuatu sebelum tongkat atau kepala saya menabraknya.

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-01.1 | Izin kamera diberikan dan navigasi aktif | Pengguna berjalan dengan ponsel menghadap depan | Sistem menghasilkan hasil deteksi minimal 12 frame per detik pada perangkat acuan |
| AC-01.2 | Objek berada pada jarak 0,5–8 m dalam koridor jalur selebar 1,2 m | Objek masuk bidang pandang | Objek terdeteksi dan diberi label kelas, jarak, arah, serta skor keyakinan |
| AC-01.3 | Perangkat tidak memiliki sensor kedalaman | Navigasi dimulai | Sistem beralih ke estimasi kedalaman monokular tanpa memberi tahu pengguna, dan ambang keyakinan dinaikkan 15% |
| AC-01.4 | Aplikasi berjalan di latar belakang dengan layar mati | Pengguna terus berjalan | Deteksi tetap berjalan lewat foreground service, dan indikator kamera aktif tetap terlihat dari luar |
| AC-01.5 | Kamera tertutup, gelap total, atau lensa kotor | Kondisi berlangsung >3 detik | Sistem mengumumkan "Saya tidak bisa melihat" satu kali, lalu berhenti memberi peringatan palsu |

**Edge case dan penanganan.**

- **Ponsel di saku:** deteksi gerakan mengenali orientasi tertutup dan menjeda deteksi visual, menyisakan panduan arah saja, dan memberi tahu satu kali.
- **Hujan atau lensa berembun:** skor keyakinan turun drastis; sistem menaikkan ambang dan mengumumkan penurunan kualitas satu kali per sesi.
- **Objek bergerak cepat (motor):** diberi prioritas kelas Kritis meski jaraknya masih >3 m.
- **Kerumunan padat:** sistem tidak menyebutkan setiap orang; agregasi menjadi satu pesan "banyak orang di depan, jalur menyempit".

**Metrik.** Recall kelas Kritis ≥99%, presisi keseluruhan ≥85%, latensi inferensi p95 ≤80 ms.

---

### F-02 · Klasifikasi kelas bahaya

| | |
|---|---|
| **Prioritas** | Must (R0) |
| **Layar** | P-08, P-09 |

**Deskripsi.** Setiap objek terdeteksi dipetakan ke salah satu dari empat kelas bahaya. Kelas, bukan nama objek, yang menentukan seluruh perilaku sistem.

| Kelas | Contoh objek | Warna | Bentuk | Suara | Haptic | Interupsi |
|---|---|---|---|---|---|---|
| **Kritis** | Lubang terbuka, tepi peron, tangga turun, kendaraan mendekat | Red | Oktagon | Nada rendah tajam berulang | Getar panjang 400 ms | Memotong segalanya, tidak dapat diredam mode senyap |
| **Kepala** | Dahan, papan reklame, kabel, kanopi, spion | Amber | Segitiga terbalik | Dua nada tinggi cepat | Denyut ganda tajam | Memotong panduan navigasi |
| **Waspada** | Tiang, pot beton, motor parkir, pedagang | Orange | Segitiga | Denyut spasial, tempo naik | Denyut ganda lembut | Menunggu antrean |
| **Aman** | Jalur bebas, ubin pemandu, ramp | Green | Lingkaran | **Diam** | Tidak ada | — |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-02.1 | Objek terdeteksi dengan tinggi dasar >1,4 m dari tanah | Objek berada di jalur | Objek diklasifikasikan Kepala, bukan Waspada |
| AC-02.2 | Dua objek berbeda kelas terdeteksi bersamaan | Keduanya dalam radius peringatan | Hanya kelas tertinggi yang diumumkan; kelas lebih rendah ditahan hingga yang tinggi selesai |
| AC-02.3 | Skor keyakinan model di bawah ambang kelas | Objek terdeteksi | Objek diturunkan satu tingkat kelas, kecuali kelas Kritis yang justru dipertahankan (bias ke sisi aman) |
| AC-02.4 | Jalur di depan bersih selama >10 detik | Tidak ada objek terdeteksi | Sistem tetap diam; earcon "Clear" hanya dibunyikan saat keluar dari zona bahaya, bukan secara berkala |

**Aturan kalibrasi.** Model dikalibrasi condong ke **peringatan berlebih pada kelas Kritis** dan condong ke **diam pada kelas Waspada**. Ini asimetri yang disengaja: melewatkan lubang jauh lebih mahal daripada memperingatkan tiang yang ternyata bisa dilewati.

---

### F-03 · Peringatan bahaya kritis multi-kanal

| | |
|---|---|
| **Prioritas** | Must (R0) |
| **Layar** | P-10 |

**Deskripsi.** Ketika kelas Kritis terdeteksi dalam radius berhenti, sistem memicu peringatan serentak di tiga kanal: audio, haptic, dan visual.

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-03.1 | Kelas Kritis terdeteksi ≤2,5 m di jalur | Deteksi terkonfirmasi 2 frame berturut-turut | Peringatan muncul dalam ≤120 ms sejak frame kedua |
| AC-03.2 | Ponsel dalam mode senyap sistem | Bahaya kritis terdeteksi | Getaran tetap aktif dan audio tetap dibunyikan — perilaku ini dijelaskan saat onboarding dan dapat dimatikan hanya lewat pengaturan eksplisit |
| AC-03.3 | Peringatan sedang ditampilkan | Bahaya keluar dari jalur atau pengguna berhenti bergerak >3 detik | Peringatan hilang otomatis tanpa perlu interaksi apa pun |
| AC-03.4 | Peringatan sedang ditampilkan | Bahaya kritis kedua terdeteksi | Peringatan diperbarui isinya, tidak ditumpuk sebagai peringatan baru |
| AC-03.5 | Aplikasi di latar belakang, layar mati | Bahaya kritis terdeteksi | Audio dan getar tetap dipicu; layar tidak wajib menyala |

**Larangan desain.** P-10 tidak memiliki tombol tutup, tidak memiliki animasi masuk, dan tidak memakai teks lebih dari dua baris.

---

### F-04 · Estimasi jarak dan arah relatif badan

| | |
|---|---|
| **Prioritas** | Must (R0) |

**Deskripsi.** Jarak disampaikan dalam **langkah**, bukan meter, untuk jarak <10 m. Arah disampaikan relatif terhadap badan pengguna: depan, depan-kiri, kiri, kanan, depan-kanan.

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-04.1 | Panjang langkah pengguna belum dikalibrasi | Perjalanan pertama dimulai | Sistem memakai nilai baku 0,65 m dan mengoreksinya otomatis dari data pedometer setelah 200 langkah |
| AC-04.2 | Objek berjarak <10 m | Peringatan diumumkan | Jarak disebut dalam langkah, dibulatkan ke bilangan bulat |
| AC-04.3 | Objek berjarak ≥10 m | Peringatan diumumkan | Jarak disebut dalam meter, dibulatkan ke kelipatan 5 |
| AC-04.4 | Arah mata angin diminta pengguna lewat pengaturan | Panduan diberikan | Sistem menambahkan arah mata angin **setelah** arah relatif badan, tidak menggantikannya |

---

### F-05 · Manajemen daya adaptif

| | |
|---|---|
| **Prioritas** | Must (R1) · Won't (R0) |
| **Layar** | P-21 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-05.1 | Baterai turun di bawah 20% | Navigasi sedang aktif | Sistem menurunkan frame rate deteksi ke 8 fps, mematikan pembacaan teks pasif, dan mengumumkan perubahan satu kali |
| AC-05.2 | Baterai di bawah 10% | Navigasi aktif | Sistem mempertahankan **hanya** deteksi kelas Kritis dan panduan arah; seluruh fitur lain dinonaktifkan |
| AC-05.3 | Pengguna berhenti bergerak >60 detik | Terdeteksi lewat pedometer | Deteksi visual dijeda otomatis dan dilanjutkan saat gerakan terdeteksi lagi |
| AC-05.4 | Perangkat terlalu panas | Suhu melewati ambang sistem | Frame rate diturunkan bertahap, bukan dimatikan mendadak, dan pengguna diberi tahu |

---

## 9. Spesifikasi fungsional — Lapisan GUIDE

### F-06 · Pencarian tujuan lewat suara

| | |
|---|---|
| **Prioritas** | Should (R0) · Must (R1) |
| **Layar** | P-05, P-06 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-06.1 | Pengguna menekan tombol utama di P-05 | Perekaman dimulai | Earcon "mendengarkan" berbunyi dalam ≤150 ms dan transkrip langsung ditampilkan besar untuk pendamping awas |
| AC-06.2 | Ucapan mengandung nama tempat yang cocok >1 kandidat | Pencarian selesai | Sistem membacakan maksimal 3 kandidat teratas dengan jarak masing-masing, lalu menunggu pilihan |
| AC-06.3 | Tidak ada sinyal internet | Pencarian dilakukan | Sistem mencari pada indeks offline berisi tujuan tersimpan dan POI yang sudah diunduh, lalu menyebutkan keterbatasan itu |
| AC-06.4 | Ucapan tidak dikenali | Pengenalan gagal | Sistem meminta ulang satu kali dengan kalimat berbeda, lalu menawarkan daftar tujuan tersimpan |
| AC-06.5 | Pengguna diam >5 detik setelah earcon | Tidak ada ucapan | Perekaman berhenti otomatis dan kembali ke P-05 tanpa pesan error |

---

### F-07 · Mesin rute berbasis skor aksesibilitas

| | |
|---|---|
| **Prioritas** | Should (R0) · Must (R1) |
| **Layar** | P-07 |

**Deskripsi.** Rute dihitung dengan fungsi biaya yang mengutamakan keterlaluan (*traversability*), bukan jarak.

**Formula skor aksesibilitas (0–100).**

```
skor = 100
     − (kepadatan_hambatan × 3.0)      // hambatan tetap per 100 m
     − (penyeberangan_tanpa_audio × 8)
     − (segmen_tanpa_trotoar_persen × 0.4)
     − (usia_data_hari × 0.15)          // maksimum penalti 20
     + (ubin_pemandu_persen × 0.25)
     + (ramp_tersedia ? 5 : 0)
```

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-07.1 | Tersedia ≥2 rute alternatif | Perhitungan selesai | Rute diurutkan berdasarkan skor aksesibilitas menurun, bukan jarak menaik |
| AC-07.2 | Rute terpendek memiliki skor <60 | Hasil ditampilkan | Rute itu tetap ditampilkan dengan label risiko eksplisit, tidak disembunyikan |
| AC-07.3 | Tidak ada data Proof-of-Path untuk wilayah tersebut | Rute dihitung | Sistem memakai jaringan jalan dasar, menandai rute sebagai "belum terpetakan", dan menaikkan sensitivitas deteksi F-01 |
| AC-07.4 | Ada laporan bahaya <2 jam pada satu segmen | Rute dihitung | Segmen tersebut diberi penalti berat dan dihindari kecuali tidak ada alternatif |
| AC-07.5 | Selisih skor antar rute <5 poin | Hasil ditampilkan | Sistem memilih yang lebih pendek dan menyebutkan bahwa keduanya setara |

**Edge case.** Jika seluruh rute berskor <40, sistem menyampaikan peringatan jujur di awal: "Semua jalur ke tujuan ini sulit dilalui. Pertimbangkan memakai kendaraan."

---

### F-08 · Panduan belok dan audio spasial

| | |
|---|---|
| **Prioritas** | Must (R0) |
| **Layar** | P-08 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-08.1 | Audio spasial aktif dan headphone stereo terhubung | Panduan berjalan | Nada pemandu dipanning sesuai arah tujuan berikutnya dengan pembaruan ≥4 Hz |
| AC-08.2 | Belokan berjarak 30 langkah | Pengguna mendekat | Peringatan belok diberikan pada 30, 10, dan 3 langkah — tidak lebih sering |
| AC-08.3 | Pengguna melewati titik belok | Deviasi >15 m terdeteksi | Sistem menghitung ulang rute dan mengumumkan satu kali, tanpa nada menyalahkan |
| AC-08.4 | Headphone mono atau speaker ponsel | Audio spasial tidak memungkinkan | Sistem beralih ke instruksi verbal arah dan menyebutkan sekali bahwa panduan spasial tidak aktif |
| AC-08.5 | Panduan navigasi sedang diucapkan | Bahaya kelas Kepala atau Kritis terdeteksi | Ucapan navigasi dipotong seketika, tidak menunggu kalimat selesai |

---

### F-09 · Operasi offline penuh

| | |
|---|---|
| **Prioritas** | Must (R1) |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-09.1 | Tidak ada koneksi internet | Aplikasi dibuka | Seluruh fungsi lapisan SENSE berjalan normal tanpa degradasi apa pun |
| AC-09.2 | Wilayah pernah dikunjungi sebelumnya | Navigasi dimulai offline | Tile peta dan data Proof-of-Path dari cache dipakai, dan usia data disebutkan |
| AC-09.3 | Koneksi kembali tersedia | Perjalanan selesai | Titik data hasil perjalanan diunggah otomatis dalam antrean latar belakang |
| AC-09.4 | Antrean unggah gagal 3 kali | Percobaan terakhir gagal | Data disimpan lokal maksimal 30 hari dengan backoff eksponensial, tidak dibuang |

---

### F-10 · Ringkasan perjalanan · F-11 · Riwayat dan rute tersimpan

| | |
|---|---|
| **Prioritas** | F-10 Should (R1) · F-11 Should (R1) |
| **Layar** | P-18, P-19 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-10.1 | Pengguna tiba dalam radius 15 m dari tujuan | Kedatangan terdeteksi | Ringkasan menampilkan jarak, waktu, jumlah peringatan, dan **rasio waktu sistem diam** sebagai metrik yang paling ditonjolkan |
| AC-10.2 | Perjalanan menghasilkan titik data baru | Ringkasan ditampilkan | Jumlah titik data yang dikirim ditampilkan dengan aksen Violet dan status validasinya |
| AC-11.1 | Rute pernah ditempuh ≥3 kali | Beranda dibuka | Rute muncul sebagai pintasan tersimpan tanpa perlu diatur manual |
| AC-11.2 | Pengguna melihat riwayat mingguan | Data tersedia | Jumlah perjalanan solo minggu ini dibandingkan minggu lalu ditampilkan sebagai metrik utama |

---

## 10. Spesifikasi fungsional — Lapisan READ

### F-12 · Baca teks dunia nyata

| | |
|---|---|
| **Prioritas** | Should (R0) · Must (R1) |
| **Layar** | P-11, P-12 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-12.1 | Pengguna memicu pembacaan | Kamera diarahkan ke objek berteks | Hasil dibacakan dalam ≤2,5 detik p95 dengan koneksi, ≤4 detik tanpa koneksi |
| AC-12.2 | Teks terdeteksi sebagian buram | Pembacaan selesai | Bagian yang tidak yakin disebutkan secara eksplisit, dan tombol bantuan manusia (F-16) ditawarkan otomatis |
| AC-12.3 | Objek adalah kemasan obat | Teks dikenali sebagai label farmasi | Sistem membacakan dengan urutan tetap: nama, dosis, aturan pakai, kedaluwarsa — bukan urutan tata letak |
| AC-12.4 | Tidak ada teks terdeteksi | Analisis selesai | Sistem mengatakan "Saya tidak menemukan tulisan" dan menyarankan menggeser kamera, bukan menampilkan error |
| AC-12.5 | Pengguna menggerakkan kamera saat pembacaan | Gerakan >20°/detik terdeteksi | Sistem menunggu kamera stabil sebelum menganalisis, dengan panduan audio "tahan sebentar" |

**Catatan privasi.** Gambar untuk pembacaan diproses on-device bila memungkinkan. Bila dikirim ke model awan, gambar dihapus segera setelah respons dan tidak pernah dipakai untuk pelatihan tanpa izin eksplisit terpisah.

---

### F-13 · Deskripsi adegan

| | |
|---|---|
| **Prioritas** | Should (R1) |
| **Layar** | P-13 |

**Aturan penulisan deskripsi — ini spesifikasi produk, bukan preferensi gaya.**

Deskripsi diurutkan berdasarkan **kegunaan untuk bergerak**, bukan urutan naratif:

1. Apa yang menghalangi jalan (paling dulu, selalu)
2. Apa yang bisa dipegang atau dijadikan pemandu
3. Ke mana jalan keluar atau pintu
4. Konteks sosial (ada orang, antrean) — paling akhir, satu kalimat

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-13.1 | Adegan dianalisis | Deskripsi dihasilkan | Deskripsi tidak melebihi 4 poin dan setiap poin tidak melebihi 12 kata |
| AC-13.2 | Adegan mengandung orang | Deskripsi dihasilkan | Sistem menyebut keberadaan orang tanpa mendeskripsikan ciri fisik, usia, atau identitas apa pun |
| AC-13.3 | Model tidak yakin | Keyakinan di bawah ambang | Sistem mengatakan tidak yakin dengan kalimat eksplisit, bukan menebak dengan percaya diri |

---

### F-14 · Mode uang · F-15 · Pencarian objek

| | |
|---|---|
| **Prioritas** | F-14 Should (R1) · F-15 Could (R1) |
| **Layar** | P-14 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-14.1 | Lembar uang rupiah diarahkan ke kamera | Deteksi berhasil | Nominal dibacakan dalam ≤1,5 detik dan ditampilkan dengan ukuran teks terbesar di sistem |
| AC-14.2 | Beberapa lembar dihitung berurutan | Mode hitung aktif | Total berjalan dipertahankan dan dapat direset dengan satu ketukan |
| AC-14.3 | Uang terlipat atau rusak | Keyakinan rendah | Sistem menolak menyebutkan nominal dan meminta pengguna meratakan uang — **tidak pernah menebak nominal uang** |
| AC-15.1 | Pengguna menyebut objek yang dicari | Pencarian aktif | Sistem memberi panduan audio panas-dingin dengan tempo naik saat mendekat |

**Aturan keselamatan finansial.** AC-14.3 bersifat mutlak. Menebak nominal uang dengan keyakinan rendah dapat menyebabkan kerugian finansial langsung dan merusak kepercayaan secara permanen.

---

## 11. Spesifikasi fungsional — Bantuan manusia dan pelaporan

### F-16 · Bantuan relawan manusia

| | |
|---|---|
| **Prioritas** | Must (R2) |
| **Layar** | P-15, P-16 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-16.1 | Pengguna meminta bantuan | Permintaan dikirim | Estimasi waktu tunggu dan jumlah relawan aktif ditampilkan jujur — tidak ada spinner tanpa keterangan |
| AC-16.2 | Tidak ada relawan tersedia dalam 90 detik | Waktu habis | Sistem menawarkan penjadwalan ulang atau bantuan berbayar profesional, tidak membiarkan pengguna menunggu tanpa batas |
| AC-16.3 | Sesi berjalan | Kamera aktif | Indikator kamera aktif ditampilkan permanen, dan tombol akhiri sesi berada di posisi tetap yang sama di seluruh sesi |
| AC-16.4 | Sesi berakhir | Relawan atau pengguna memutus | Pengguna dapat menilai sesi; penilaian memengaruhi reputasi on-chain relawan |
| AC-16.5 | Pengguna adalah penyandang tunanetra terverifikasi | Sesi dimulai | Biaya sesi ditarik dari Impact Treasury; pengguna tidak pernah melihat tagihan apa pun |

---

### F-17 · Laporkan bahaya

| | |
|---|---|
| **Prioritas** | Must (R0) |
| **Layar** | P-17 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-17.1 | Pengguna menekan tombol laporkan | Layar terbuka | Lokasi sudah terekam otomatis; pengguna hanya memilih jenis bahaya |
| AC-17.2 | Jenis bahaya dipilih | Laporan dikirim | Seluruh alur selesai dalam maksimal **dua ketukan** dari layar navigasi |
| AC-17.3 | Laporan terkirim | Konfirmasi diberikan | Sistem menyebutkan bahwa laporan akan memperingatkan pengguna lain, memberi konteks pada kontribusi tersebut |
| AC-17.4 | Tidak ada koneksi | Laporan dibuat | Laporan diantrekan lokal dan dikirim otomatis saat koneksi kembali |
| AC-17.5 | Laporan dibuat di lokasi yang sudah punya laporan serupa <24 jam | Pengiriman diproses | Laporan dihitung sebagai konfirmasi saksi tambahan, bukan laporan duplikat baru |

**Urutan jenis bahaya** disusun berdasarkan frekuensi nyata di Indonesia, bukan abjad: lubang/galian → kendaraan parkir → bahaya setinggi kepala → jalur tertutup → permukaan licin → lainnya.

---

### F-18 · Onboarding dan profil · F-19 · Pengaturan aksesibilitas · F-20 · Kontras dan skala teks

| | |
|---|---|
| **Prioritas** | F-18 Must (R1) · F-19 Must (R1) · F-20 Must (R1) |
| **Layar** | P-01…P-04, P-20, P-21 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-18.1 | Aplikasi dibuka pertama kali | Splash ditampilkan | Sapaan suara dimulai pada detik ≤0,2, **sebelum** splash selesai — tidak menunggu layar siap |
| AC-18.2 | Onboarding berjalan | Izin diminta | Setiap izin dijelaskan lewat konsekuensinya ("tanpa ini saya tidak bisa melihat tiang di depan Anda"), bukan lewat nama teknisnya |
| AC-18.3 | Pengguna memilih profil | Profil disimpan | Ukuran teks baku, verbositas suara, dan ketersediaan mode kontributor menyesuaikan otomatis |
| AC-18.4 | Onboarding berjalan | Positioning produk disampaikan | Sistem menyatakan eksplisit bahwa NetraSense adalah **pelengkap tongkat, bukan pengganti** — pernyataan ini wajib dan tidak dapat dilewati |
| AC-19.1 | Pengaturan dibuka | Daftar ditampilkan | Pengaturan aksesibilitas berada di tingkat pertama menu, bukan di sub-menu |
| AC-20.1 | Skala teks diubah | Slider digeser | Pratinjau berubah langsung memakai kalimat navigasi sungguhan, bukan lorem ipsum |
| AC-20.2 | Skala teks dinaikkan ke 200% | Seluruh layar diperiksa | Tidak ada konten terpotong, tidak ada tombol yang keluar layar, tidak ada teks bertumpuk |
| AC-20.3 | Mode kontras ekstrem diaktifkan | Seluruh aplikasi | Seluruh tint hilang, garis menebal jadi 2 px hitam, gradien dan bayangan dinonaktifkan, tebal huruf minimum naik ke Bold |

---

# BAGIAN C — JARINGAN & WEB3

## 12. Arsitektur jaringan Proof-of-Path

### 12.1 Tujuan jaringan

Membangun dan memelihara peta aksesibilitas level-mikro yang: **(a)** dikumpulkan oleh kontributor tanpa izin dan tanpa kontrak kerja, **(b)** tetap ada dan dapat dipakai meski entitas NetraSense berhenti beroperasi, **(c)** cukup akurat untuk dijadikan dasar keputusan keselamatan.

### 12.2 Empat syarat yang membenarkan pemakaian blockchain

Keempatnya harus benar sekaligus. Jika salah satu tidak berlaku, database terpusat adalah pilihan yang lebih baik — dan tim harus mampu mengatakan itu dengan jujur.

| # | Syarat | Terpenuhi? | Penjelasan |
|---|---|---|---|
| 1 | Kontributor tidak terpercaya dan tidak terbatas | Ya | Data harus datang dari puluhan ribu orang asing; tidak mungkin disaring manual satu per satu |
| 2 | Data harus jadi barang publik permanen | Ya | Peta yang dibangun komunitas tunanetra bertahun-tahun tidak boleh mati bersama perusahaannya |
| 3 | Insentif bernominal kecil dan lintas wilayah | Ya | Membayar Rp2.000 ke 40.000 orang lewat perbankan konvensional secara ekonomi tidak mungkin |
| 4 | Dampak harus dapat diaudit pihak ketiga | Ya | Sponsor CSR dan pemda butuh bukti yang tidak dapat dimanipulasi penerima dana |

### 12.3 Alur data end-to-end

```
 [1] PEREKAMAN (di ponsel, off-chain, privat)
     kamera + IMU + GPS  →  inferensi on-device
     →  ekstraksi data semantik  →  blur wajah & pelat
     →  kuantisasi koordinat ke grid 1 m
     hasil: Observation JSON (lihat 18.2)

 [2] PENGIRIMAN (off-chain)
     batch observation  →  ditandatangani kunci perangkat
     →  proof-of-location bundle (pola sensor, sidik jari Wi-Fi/BLE)
     →  dikirim ke Indexer API

 [3] VERIFIKASI OTOMATIS (off-chain, server)
     cek plausibilitas geometri  →  cek pola perjalanan
     →  cek duplikasi  →  skor kualitas awal
     hasil: status = provisional | rejected

 [4] KONSENSUS MULTI-SAKSI (off-chain → on-chain)
     menunggu ≥3 observasi independen dalam radius 3 m
     →  bobot suara mengikuti reputasi kontributor
     hasil: status = validated

 [5] PENYELESAIAN (on-chain)
     blob data  →  storage terdesentralisasi  →  dapat CID
     hash + CID + ringkasan  →  AttestationRegistry
     →  RewardDistributor menghitung dan mencatat imbalan

 [6] PENYAJIAN (off-chain)
     Indexer membaca event on-chain  →  membangun tile rute
     →  aplikasi mengunduh tile  →  mesin rute F-07 memakainya
```

**Prinsip pemisahan:** blockchain dipakai untuk **penyelesaian dan kepemilikan**; server biasa dipakai untuk **kueri cepat dan penyajian**. Tidak ada satu pun kueri rute yang menunggu blockchain.

### 12.4 Enam lapis pertahanan anti-sybil

Karena data ini menyangkut keselamatan fisik, satu lapis tidak cukup.

| Lapis | Mekanisme | Menghadang |
|---|---|---|
| **L1 · Proof of Location** | Observasi harus konsisten dengan pola sensor perjalanan nyata: kecepatan langkah, barometer, sidik jari Wi-Fi/BLE sekitar. Lokasi yang "melompat" ditolak | Pemalsuan GPS |
| **L2 · Konsensus multi-saksi** | Titik data berstatus provisional sampai dikonfirmasi ≥3 kontributor independen dalam jendela 14 hari | Satu akun mengarang data |
| **L3 · Verifikasi model** | Klaim yang tidak masuk akal secara geometris (tiang 12 m di dalam ruko) ditolak sebelum masuk antrean | Data acak |
| **L4 · Reputasi bertingkat** | Kontributor baru mulai dari bobot 0,2 dan imbalan 0,3×. Akurasi historis menaikkan bobot. Reputasi **tidak dapat dipindahtangankan** | Pembuatan akun massal |
| **L5 · Stake dan slashing** | Validator tingkat lanjut menyetor jaminan; data terbukti palsu memotong jaminan | Kolusi validator |
| **L6 · Asimetri arah laporan** | Laporan yang **menghapus** bahaya butuh 5 saksi; laporan yang **menambah** bahaya butuh 3 | Serangan yang membuat jalur berbahaya terlihat aman |

**L6 adalah lapis yang paling sering dilupakan dan paling penting.** Sistem harus selalu berpihak pada sisi aman: lebih mudah menandai bahaya daripada menghapusnya.

### 12.5 Siklus hidup titik data

```
   dibuat ──> provisional ──> validated ──> aktif ──> menua ──> kedaluwarsa
                   │              │                      │
                   └─> rejected   └─> disputed ──> re-validasi atau dihapus

   Aturan usia:
   0–30 hari    : bobot penuh
   31–90 hari   : bobot 0,7 · pengguna diberi tahu usia data
   91–180 hari  : bobot 0,4 · wilayah masuk daftar prioritas pemetaan ulang
   >180 hari    : bobot 0,1 · bounty pemetaan ulang naik ke pengganda maksimum
```

---

## 13. Spesifikasi fungsional — Kontributor

### F-21 · Daftar misi dan bounty kelangkaan

| | |
|---|---|
| **Prioritas** | Must (R1) |
| **Layar** | K-01, K-02 |

**Formula pengganda bounty.**

```
pengganda = clamp(0.5, 3.0,
      1.0
    + (1.0 jika ruas belum pernah dipetakan)
    + (usia_data_hari / 90) × 0.8
    + (permintaan_rute_30hari / 100) × 0.5    // wilayah yang sering dilewati pengguna
    − (kontributor_aktif_ruas × 0.15)          // mencegah kerumunan di satu ruas
)
```

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-21.1 | Kontributor membuka daftar misi | Daftar dimuat | Misi diurutkan berdasarkan pengganda bounty menurun, bukan jarak |
| AC-21.2 | Misi dibuka detailnya | Detail ditampilkan | Perkiraan jumlah titik data, imbalan dasar, pengganda, dan **perkiraan total** ditampilkan sebelum kontributor berangkat |
| AC-21.3 | Misi sedang dikerjakan kontributor lain | Daftar dimuat | Misi tetap ditampilkan dengan penanda jumlah kontributor aktif dan pengganda yang sudah turun |
| AC-21.4 | Kontributor berada >5 km dari misi | Misi ditampilkan | Jarak tempuh ke titik awal ditampilkan jelas agar tidak menyesatkan |

---

### F-22 · Mode pemetaan otomatis

| | |
|---|---|
| **Prioritas** | Must (R0) |
| **Layar** | K-03 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-22.1 | Mode pemetaan dimulai | Kontributor berjalan | Titik data direkam otomatis tanpa interaksi; ketukan manual hanya untuk objek yang terlewat |
| AC-22.2 | Perekaman berjalan | Layar dilihat sekilas | Layar menampilkan maksimal 4 informasi: status merekam, progres ruas, jumlah otomatis, jumlah manual |
| AC-22.3 | Kontributor berhenti >3 menit | Tidak ada gerakan | Perekaman dijeda otomatis dan dilanjutkan saat gerakan kembali terdeteksi |
| AC-22.4 | Baterai di bawah 15% | Perekaman aktif | Sistem memperingatkan dan menawarkan menyimpan progres parsial |
| AC-22.5 | Perekaman selesai sebelum ruas tuntas | Kontributor mengakhiri | Progres parsial tetap dihitung dan diberi imbalan proporsional |

---

### F-23 · Validasi dan status kontribusi

| | |
|---|---|
| **Prioritas** | Must (R0) |
| **Layar** | K-04 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-23.1 | Kontribusi dikirim | Hasil ditampilkan | Status dipecah jujur: lolos verifikasi otomatis, menunggu saksi, tervalidasi penuh |
| AC-23.2 | Titik data menunggu saksi | Status ditampilkan | Estimasi waktu validasi disebutkan (umumnya 6–24 jam), bukan dibiarkan tanpa keterangan |
| AC-23.3 | Titik data ditolak | Penolakan terjadi | Alasan penolakan dijelaskan spesifik dan kontributor dapat mengajukan sanggahan |
| AC-23.4 | Titik data tervalidasi setelah kontributor menutup aplikasi | Validasi selesai | Imbalan bertambah dan notifikasi dikirim — namun tidak pernah saat pengguna sedang bernavigasi (prioritas 5, lihat 22.4) |

---

### F-24 · Dompet kontribusi · F-25 · Profil, lencana, papan peringkat

| | |
|---|---|
| **Prioritas** | F-24 Must (R1) · F-25 Must (R2) |
| **Layar** | K-05, K-06, W-02 |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-24.1 | Dompet dibuka di aplikasi | Saldo ditampilkan | Istilah "blockchain", "gas", "on-chain", dan "seed phrase" **tidak muncul sama sekali**; saldo disebut "poin kontribusi", riwayat disebut "riwayat" |
| AC-24.2 | Kontributor menekan klaim | Aksi dipicu | Aplikasi mengarahkan ke web dApp dengan tautan dalam yang sudah terautentikasi — klaim tidak pernah terjadi di dalam aplikasi |
| AC-24.3 | Imbalan terkunci vesting | Saldo ditampilkan | Bagian terkunci ditampilkan terpisah dengan tanggal buka yang jelas |
| AC-25.1 | Lencana diperoleh | Lencana diterbitkan | Lencana berupa soulbound token yang tidak dapat dijual atau dipindahkan |
| AC-25.2 | Papan peringkat ditampilkan | Data dimuat | Peringkat dihitung dari **kontribusi tervalidasi**, bukan volume mentah yang dikirim |

**Alasan AC-24.2** dijelaskan penuh di bagian 20.4 (kepatuhan toko aplikasi).

---

## 14. Spesifikasi smart contract

> Bagian ini menjelaskan program-program kecil yang tinggal di blockchain. Setiap kontrak dijelaskan dulu dalam bahasa biasa, baru kemudian dalam bentuk teknis.

### 14.1 Peta kontrak

| Kontrak | Dalam bahasa biasa | Prioritas |
|---|---|---|
| `AttestationRegistry` | Buku catatan resmi berisi "paket data X sudah divalidasi, sidik jarinya ABC, oleh saksi-saksi ini" | R0 |
| `ContributorRegistry` | Daftar kontributor beserta skor reputasinya yang tidak bisa dijual | R0 |
| `RewardDistributor` | Kasir otomatis yang menghitung dan mencatat imbalan berdasarkan data tervalidasi | R0 |
| `NetraToken` | Buku saldo token `$NETRA` | R1 |
| `BadgeSBT` | Penerbit lencana yang tidak dapat dipindahtangankan | R2 |
| `ImpactTreasury` | Brankas dana sponsor yang hanya terbuka saat target terverifikasi tercapai | R2 |
| `Governance` | Kotak suara yang menghitung hasil pemungutan suara, dengan kuota terjamin untuk organisasi disabilitas | R3 |

### 14.2 `AttestationRegistry`

**Tanggung jawab.** Menyimpan bukti permanen bahwa sekelompok titik data telah divalidasi, tanpa menyimpan data itu sendiri.

**State utama.**

| Field | Tipe | Keterangan |
|---|---|---|
| `batchId` | `bytes32` | Identitas paket data |
| `dataHash` | `bytes32` | Sidik jari isi paket |
| `storageCID` | `string` | Alamat blob di storage terdesentralisasi |
| `geohashPrefix` | `bytes8` | Wilayah kasar, untuk kueri per area |
| `pointCount` | `uint32` | Jumlah titik data dalam paket |
| `witnesses` | `address[]` | Alamat kontributor yang menjadi saksi |
| `validatedAt` | `uint64` | Waktu validasi |
| `status` | `enum` | `Provisional` · `Validated` · `Disputed` · `Expired` |

**Fungsi utama.**

| Fungsi | Akses | Deskripsi |
|---|---|---|
| `submitBatch(batchId, dataHash, storageCID, geohashPrefix, pointCount)` | Indexer bertanda tangan | Mendaftarkan paket baru berstatus Provisional |
| `attest(batchId, witnessSignature)` | Kontributor terdaftar | Menambahkan satu saksi; status berubah Validated saat ambang tercapai |
| `dispute(batchId, reason)` | Siapa pun dengan stake | Menandai paket sebagai Disputed dan memicu peninjauan |
| `expire(batchId)` | Siapa pun | Menandai kedaluwarsa setelah 180 hari tanpa re-validasi |

**Event.** `BatchSubmitted` · `BatchAttested` · `BatchValidated` · `BatchDisputed` · `BatchExpired`

**Aturan penting.** Kontrak ini **tidak pernah menyimpan koordinat presisi atau isi data**. Yang tersimpan hanya sidik jari, jumlah, dan wilayah kasar. Ini keputusan privasi sekaligus penghematan biaya.

### 14.3 `ContributorRegistry`

| Field | Tipe | Keterangan |
|---|---|---|
| `reputation` | `uint16` | 0–1000, naik dari akurasi historis |
| `validatedPoints` | `uint32` | Total titik data tervalidasi |
| `rejectedPoints` | `uint32` | Total ditolak |
| `stakedAmount` | `uint256` | Jaminan untuk peran validator |
| `tier` | `enum` | `Newcomer` · `Verified` · `Validator` |

**Aturan reputasi.**

```
akurasi = validatedPoints / (validatedPoints + rejectedPoints)

tier Newcomer  : akurasi belum cukup sampel (<50 titik)  → bobot 0.2 · imbalan 0.3×
tier Verified  : ≥50 titik dan akurasi ≥0.80              → bobot 1.0 · imbalan 1.0×
tier Validator : ≥500 titik, akurasi ≥0.92, ada stake     → bobot 2.0 · imbalan 1.3×

Penurunan tier bersifat otomatis dan langsung bila akurasi jatuh di bawah ambang.
Reputasi tidak memiliki fungsi transfer — secara teknis tidak mungkin dijual.
```

### 14.4 `RewardDistributor`

**Formula imbalan per paket.**

```
imbalan_dasar   = pointCount × TARIF_PER_TITIK
pengganda_total = pengganda_kelangkaan (F-21) × pengganda_tier (14.3)
imbalan         = imbalan_dasar × pengganda_total

Pembagian:
  70%  langsung dapat diklaim
  30%  vesting linear 14 hari  (mencegah pola tambang-lalu-jual)

Batas:
  maksimum per kontributor per hari      : 500 NETRA
  maksimum per ruas jalan per 7 hari     : 2.000 NETRA
```

**Fungsi.** `claim(batchIds[])` · `pendingOf(address)` · `vestedOf(address)` · `setTariff(uint)` (governance)

### 14.5 `ImpactTreasury`

**Dalam bahasa biasa:** brankas yang dikunci dengan syarat. Sponsor memasukkan dana; brankas hanya membuka sebagian dana setiap kali target pemetaan yang terverifikasi tercapai. Tidak ada satu pihak pun — termasuk tim NetraSense — yang bisa membuka lebih cepat.

| Fungsi | Deskripsi |
|---|---|
| `createCampaign(area, targetKm, totalFund, deadline)` | Sponsor membuat kampanye dan mengunci dana |
| `reportProgress(campaignId)` | Indexer melaporkan progres terverifikasi dari `AttestationRegistry` |
| `release(campaignId)` | Mencairkan dana proporsional terhadap target yang tercapai |
| `refund(campaignId)` | Mengembalikan sisa dana ke sponsor setelah tenggat |

**Proof of Impact.** Setiap kampanye menghasilkan laporan yang dapat diverifikasi ulang siapa pun dengan membaca event on-chain — tanpa perlu memercayai laporan tim NetraSense.

### 14.6 Aturan keamanan kontrak

1. Seluruh kontrak memakai pola **checks-effects-interactions** dan penjaga reentrancy.
2. Kontrak dapat ditingkatkan (*upgradeable*) pada R0–R2 lewat proxy dengan timelock 48 jam; hak upgrade diserahkan ke governance pada R3.
3. Ada **circuit breaker** yang dapat menghentikan distribusi imbalan bila terdeteksi anomali, tetapi **tidak dapat** menghentikan pembacaan data — datanya tetap barang publik apa pun yang terjadi.
4. Tidak ada fungsi yang memungkinkan admin menghapus attestation yang sudah tervalidasi.
5. Audit eksternal wajib sebelum mainnet (R2).

---

## 15. Ekonomi token dan aturan imbalan

### 15.1 Prinsip perancangan

> Pengguna tunanetra tidak pernah menyentuh token, tidak pernah membayar, dan tidak pernah perlu tahu ada blockchain di balik aplikasinya.

### 15.2 Aliran nilai

```
  SPONSOR / CSR / PEMDA            IMPACT TREASURY           KONTRIBUTOR & RELAWAN
  ────────────────────             ───────────────           ─────────────────────
  membeli kredit dampak    ──>     dana terkunci      ──>     imbalan pemetaan
  (fiat atau stablecoin)           cair per target            imbalan validasi
          ^                        terverifikasi              bayaran sesi bantuan
          │                              │
          └── Proof of Impact ───────────┤
              yang dapat diaudit         v
                                   PETA AKSESIBILITAS (barang publik)
                                         │
                                         v
                                   PENGGUNA TUNANETRA — gratis, selamanya
```

### 15.3 Peran token `$NETRA`

| Fungsi | Deskripsi |
|---|---|
| Imbalan kontribusi | Dibayarkan untuk observasi yang lolos validasi; besaran dinamis mengikuti kelangkaan |
| Stake validator | Dikunci sebagai jaminan kejujuran; dipotong bila data terbukti palsu |
| Hak suara | Menentukan prioritas kota, parameter imbalan, dan alokasi perbendaharaan |
| Akses data komersial | Pengembang pihak ketiga membayar untuk akses API skala besar — sumber permintaan yang tidak spekulatif |

### 15.4 Sink dan source

| Source (token masuk sirkulasi) | Sink (token keluar sirkulasi) |
|---|---|
| Emisi imbalan pemetaan, menurun terjadwal | Pembelian akses API pihak ketiga |
| Hadiah kampanye yang didanai sponsor | Stake validator yang terkunci |
| Pendanaan retroaktif dampak tinggi | Biaya kampanye pemetaan sponsor |
| — | Pembakaran sebagian dari setiap transaksi data |

### 15.5 Alokasi indikatif

| Alokasi | Porsi | Penguncian |
|---|---|---|
| Imbalan jaringan | 45% | Emisi bertahap 6–8 tahun, menurun per tahun |
| Impact Treasury / DAO | 20% | Dikendalikan governance, cair per kampanye terverifikasi |
| Tim dan kontributor inti | 15% | Cliff 12 bulan, vesting 36 bulan |
| Kemitraan ekosistem | 12% | Organisasi disabilitas, pemda, mitra akademik |
| Likuiditas dan cadangan | 8% | Cadangan strategis, transparan on-chain |

### 15.6 Guardrail anti-spekulasi

1. **Tidak ada penjualan token publik pada R0–R2.** Distribusi hanya lewat kontribusi terverifikasi — token harus diperoleh dengan berjalan kaki, bukan dibeli.
2. **Vesting 30% selama 14 hari** untuk seluruh imbalan kontributor.
3. **Batas imbalan per wilayah dan per kontributor** (lihat 14.4).
4. **Emisi terikat permintaan nyata**, bukan jadwal inflasi tetap.
5. **Sisi pengguna sepenuhnya bebas token** — tidak ada paywall, tidak ada NFT wajib, tidak ada langganan berbasis kripto bagi penyandang disabilitas.

> **Catatan kepatuhan.** Angka pada 15.5 bersifat indikatif untuk keperluan perencanaan produk dan bukan penawaran instrumen keuangan. Struktur final wajib ditinjau terhadap regulasi aset kripto yang berlaku di Indonesia sebelum penerbitan apa pun. Pada R0–R1, sistem dapat berjalan penuh memakai **poin kontribusi non-transferabel** tanpa token sama sekali — dan rencana ini disiapkan sebagai jalur mundur yang sah.

---

## 16. Dompet, identitas, dan pengalaman tanpa jargon kripto

### 16.1 Masalah yang diselesaikan

Dompet kripto konvensional mengharuskan pengguna menyimpan 12–24 kata rahasia. Bagi pengguna tunanetra, ini bukan sekadar merepotkan — ini **hambatan aksesibilitas yang tidak dapat diterima**: kata-kata itu tidak boleh disimpan di ponsel, tidak boleh dibacakan keras di tempat umum, dan tidak dapat ditulis tangan tanpa bantuan orang lain.

### 16.2 Solusi: dompet tertanam berbasis passkey

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Pembuatan dompet | Embedded wallet SDK (Privy / Dynamic / Web3Auth / Para) | Dompet dibuat otomatis saat onboarding, tanpa langkah tambahan |
| Autentikasi | Passkey (WebAuthn) + biometrik perangkat | Cukup sidik jari; tidak ada yang perlu dihafal |
| Model akun | Account Abstraction (ERC-4337) atau setara | Memungkinkan pemulihan sosial dan transaksi yang disponsori |
| Biaya transaksi | Paymaster | Pengguna tidak pernah membayar dan tidak pernah tahu ada gas fee |
| Pemulihan | Pemulihan sosial lewat 2 dari 3 kontak tepercaya | Tidak ada frasa rahasia yang bisa hilang |

### 16.3 Aturan bahasa antarmuka

| Istilah teknis | Yang ditampilkan ke pengguna |
|---|---|
| Wallet | Akun |
| Balance / token | Poin kontribusi |
| Transaction | Riwayat |
| Sign transaction | Konfirmasi dengan sidik jari |
| Gas fee | *(tidak pernah ditampilkan)* |
| On-chain / blockchain | *(tidak pernah ditampilkan)* |
| Claim rewards | Tukarkan poin |
| Seed phrase | *(tidak ada — fitur tidak dipakai)* |

**Kriteria penerimaan.**

| # | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-16W.1 | Pengguna menyelesaikan onboarding | Akun dibuat | Dompet terbentuk di latar belakang tanpa satu pun langkah tambahan bagi pengguna |
| AC-16W.2 | Transaksi perlu ditandatangani | Aksi dipicu | Sistem meminta sidik jari dengan kalimat "Konfirmasi dengan sidik jari", tanpa menyebut transaksi atau blockchain |
| AC-16W.3 | Pengguna berganti perangkat | Login di perangkat baru | Pemulihan berjalan lewat kontak tepercaya tanpa frasa rahasia |
| AC-16W.4 | Layar dompet dibuka | Antarmuka dirender | Pemindaian teks otomatis memastikan tidak ada istilah dari kolom kiri tabel 16.3 yang muncul — diuji sebagai test otomatis, bukan diperiksa manual |

---

# BAGIAN D — TEKNIS

## 17. Arsitektur sistem dan tech stack

### 17.1 Diagram arsitektur

```
┌─────────────────────────────────────────────────────────────────────┐
│  APLIKASI MOBILE (Android)                                          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────────┐  │
│  │ UI Layer   │ │ Perception │ │ Guidance   │ │ Contribution      │  │
│  │ React      │ │ ARCore +   │ │ Route +    │ │ Recorder + Queue  │  │
│  │ Native     │ │ TFLite     │ │ Spatial    │ │ + Signer          │  │
│  │ + a11y     │ │            │ │ Audio      │ │                   │  │
│  └────────────┘ └────────────┘ └────────────┘ └──────────────────┘  │
│  ┌───────────────────────────┐ └────────────┘ ┌──────────────────┐  │
│  │ Local Store (SQLite +     │                │ Embedded Wallet   │  │
│  │ MBTiles cache + queue)    │                │ (passkey / AA)    │  │
│  └───────────────────────────┘                └──────────────────┘  │
└───────────────┬─────────────────────────────────────┬───────────────┘
                │ HTTPS                                │ HTTPS
                v                                      v
┌───────────────────────────────┐        ┌──────────────────────────────┐
│  BACKEND (off-chain)          │        │  WEB dAPP (Next.js)          │
│  ┌─────────────────────────┐  │        │  peta jaringan · klaim ·     │
│  │ Ingest API              │  │        │  governance · sponsor        │
│  │ Validation Engine       │  │        └──────────────┬───────────────┘
│  │ Route Tile Builder      │  │                       │
│  │ Indexer (event listener)│  │                       │
│  └─────────────────────────┘  │                       │
│  PostgreSQL + PostGIS         │                       │
│  Redis (queue & cache)        │                       │
│  Object storage (tiles)       │                       │
└──────────────┬────────────────┘                       │
               │ RPC                                    │ RPC
               v                                        v
┌─────────────────────────────────────────────────────────────────────┐
│  BLOCKCHAIN (on-chain)                                              │
│  AttestationRegistry · ContributorRegistry · RewardDistributor      │
│  NetraToken · BadgeSBT · ImpactTreasury · Governance                │
└──────────────┬──────────────────────────────────────────────────────┘
               v
┌─────────────────────────────────────────────────────────────────────┐
│  DECENTRALIZED STORAGE — blob data pemetaan (hash tercatat on-chain)│
└─────────────────────────────────────────────────────────────────────┘
```

### 17.2 Tech stack — aplikasi mobile

> **Revisi vs draf awal:** tim memutuskan pindah dari Flutter ke **React Native** demi kecepatan development selama hackathon, karena tim lebih familiar dengan ekosistem RN/JS. Trade-off utamanya ada pada dua titik: (1) ARCore Depth API tidak punya plugin RN yang matang, kemungkinan perlu native module Kotlin custom; (2) API aksesibilitas RN (`AccessibilityInfo`) secara historis kurang matang dibanding Flutter `Semantics` untuk kontrol granular. Disarankan spike kecil di awal R0 untuk validasi kedua titik ini sebelum lanjut ke pipeline penuh.

| Lapisan | Pilihan utama | Alternatif | Alasan pemilihan |
|---|---|---|---|
| Bahasa & framework | **React Native 0.7x (New Architecture / JSI)** | Kotlin native, Flutter | Tim lebih cepat development di RN; New Architecture (JSI, bukan bridge lama) menekan overhead kanal platform. Kotlin native dipertimbangkan ulang jika profiling menunjukkan overhead >15 ms pada guardrail latensi 2.2 |
| Kamera & AR | **ARCore Depth API** via native module Kotlin custom + `react-native-vision-camera` | Plugin RN-ARCore komunitas (terbatas), MediaPipe | Estimasi kedalaman tanpa LiDAR; belum ada binding RN siap-pakai yang matang, jadi expose depth data lewat native module sendiri lalu bridge ke JS via JSI |
| Inferensi on-device | **`react-native-fast-tflite`** (TensorFlow Lite via JSI) dengan delegasi NNAPI/GPU | ONNX Runtime Mobile React Native, native module custom | Binding JSI langsung ke buffer native, menghindari overhead serialization bridge lama; delegasi NNAPI memberi akselerasi NPU pada perangkat target |
| Model deteksi | **YOLO-nano / MobileNet-SSD terkuantisasi INT8**, dilatih ulang pada dataset trotoar Indonesia | EfficientDet-Lite | Trade-off terbaik antara latensi dan recall pada perangkat kelas menengah (tidak berubah dari pilihan model, hanya runtime inferensinya) |
| Estimasi kedalaman fallback | **MiDaS-small terkuantisasi** | Depth Anything (versi kecil) | Untuk perangkat tanpa dukungan Depth API |
| Text-to-Speech | **Android TTS on-device** (`react-native-tts`) | Piper TTS terpaket | Latensi rendah, berfungsi offline, mendukung kecepatan sampai 3× |
| Speech-to-Text | **Android SpeechRecognizer** on-device (`@react-native-voice/voice`) | Whisper-tiny terpaket | Perintah suara harus tetap berfungsi tanpa sinyal |
| Audio spasial | **Oboe / AAudio** via native module custom + HRTF panning | `react-native-track-player` + panner sederhana | Latensi audio rendah wajib untuk peringatan keselamatan; sama seperti di Flutter, tetap butuh bridge native ke Oboe |
| Haptic | **Vibrator API** via native module (`VibrationEffect.createWaveform`) | `react-native-haptic-feedback` (pola terbatas) | Pola getar terkontrol milidetik, bukan getar generik — perlu native module custom untuk waveform kustom |
| Peta & rute | **MapLibre GL** (`@maplibre/maplibre-react-native`) + tile MBTiles offline, graf rute pejalan kaki turunan OSM | Mapbox RN SDK | Lisensi terbuka dan mendukung tile offline penuh |
| Penyimpanan lokal | **SQLite** (`react-native-quick-sqlite` atau `op-sqlite`) + `react-native-keychain` | WatermelonDB, Realm | Kueri geospasial sederhana dan antrean unggah yang tahan mati mendadak; `op-sqlite`/`quick-sqlite` pakai JSI untuk performa dekat native |
| Background service | **Foreground Service** Android via `react-native-background-actions` atau native module custom | Headless JS + WorkManager | Deteksi wajib berjalan saat layar mati |
| Dompet | **Embedded wallet SDK** (Privy / Dynamic / Web3Auth / Para — semua punya RN SDK resmi) | Turnkey | Passkey + Account Abstraction; hindari seed phrase sepenuhnya |
| Analitik | **PostHog self-hosted** (`posthog-react-native`) atau Firebase Analytics dengan event kustom | Amplitude | Kontrol penuh atas data pengguna disabilitas |
| Crash reporting | **Sentry** (`@sentry/react-native`) | Firebase Crashlytics | Pelaporan error dengan konteks aksesibilitas |
| Aksesibilitas | **`AccessibilityInfo` API** + `accessibilityRole`/`accessibilityActions` custom | — | Kurang matang dibanding Flutter `Semantics` untuk live region & custom actions kompleks; wajib uji TalkBack ketat sejak layar pertama dibangun |
| Testing | `Jest`, `@testing-library/react-native`, **Maestro** untuk E2E | Appium, Detox | Maestro mendukung pengujian dengan TalkBack aktif, framework-agnostic |

### 17.3 Tech stack — backend

| Lapisan | Pilihan utama | Alternatif | Alasan |
|---|---|---|---|
| Runtime & bahasa | **Node.js 22 + TypeScript** | Go, Rust | Berbagi tipe dengan web dApp dan pustaka Web3 paling lengkap |
| Framework API | **Fastify** | NestJS, Hono | Overhead rendah untuk endpoint ingest bervolume tinggi |
| Database | **PostgreSQL 16 + PostGIS** | — | Kueri geospasial (radius, koridor, tetangga terdekat) adalah inti sistem |
| Antrean & cache | **Redis + BullMQ** | RabbitMQ, SQS | Antrean validasi dan pembangunan tile bersifat asinkron |
| Object storage | **S3-compatible** (Cloudflare R2 / MinIO) | GCS | Menyimpan tile rute dan cache blob |
| Storage terdesentralisasi | **IPFS via pinning service** atau Arweave | Filecoin, Walrus | Blob data pemetaan permanen; hanya CID yang masuk on-chain |
| Indexer | **Ponder** atau **SubQuery** | The Graph, listener kustom | Membaca event kontrak dan membangun tampilan kueri cepat |
| Route engine | **Valhalla** atau **GraphHopper** dengan profil pejalan kaki kustom | OSRM | Mendukung bobot biaya kustom yang dibutuhkan formula skor aksesibilitas |
| Auth backend | **JWT + tanda tangan perangkat** | OAuth | Kontributor diautentikasi lewat kunci perangkat, bukan kata sandi |
| Observability | **OpenTelemetry + Grafana + Loki** | Datadog | Jejak latensi end-to-end dari ingest sampai attestation |
| Infrastruktur | **Docker + Fly.io / Railway** (R0–R1), **Kubernetes** (R2+) | Vercel + Supabase | Mulai sederhana, naik saat volume nyata |

### 17.4 Tech stack — Web3

| Lapisan | Pilihan utama | Alternatif | Alasan |
|---|---|---|---|
| Chain | **Ikuti chain sponsor hackathon.** Bila bebas: **Base** atau **Arbitrum** (EVM), atau **Solana** | peaq (khusus DePIN), Polygon | Biaya transaksi mikro harus mendekati nol; ekosistem EVM memberi tooling paling matang untuk tim kecil |
| Bahasa kontrak | **Solidity 0.8.24+** (EVM) atau **Anchor/Rust** (Solana) | Vyper | Ekosistem audit dan pustaka paling luas |
| Framework kontrak | **Foundry** | Hardhat | Pengujian cepat berbasis Solidity dan fuzzing bawaan |
| Pustaka kontrak | **OpenZeppelin Contracts** | Solmate | Implementasi teruji untuk akses, proxy, dan token |
| Interaksi klien | **viem + wagmi** (web), **viem** via React Native SDK embedded wallet (mobile) | ethers.js | viem lebih ringan dan bertipe kuat; mobile pakai viem yang sama lewat SDK dompet tertanam agar satu library konsisten di seluruh platform |
| Account Abstraction | **ERC-4337 bundler + paymaster** (Pimlico / Biconomy / Alchemy) | Native AA pada chain tertentu | Transaksi tanpa gas bagi pengguna |
| Node RPC | **Alchemy / QuickNode** dengan fallback publik | Node sendiri | Keandalan tanpa mengelola infrastruktur |
| Verifikasi kontrak | **Etherscan / Blockscout** | Sourcify | Transparansi wajib untuk klaim "dapat diaudit" |
| Testing kontrak | Foundry (unit + fuzz + invariant), **Slither** untuk analisis statis | Mythril | Analisis statis wajib sebelum setiap deploy |

### 17.5 Tech stack — Web dApp

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | SSR untuk halaman publik, SPA untuk dasbor |
| Styling | **Tailwind CSS** dengan design token dari bagian 21 | Token warna diimpor dari satu berkas JSON bersama |
| Komponen | **Radix UI** sebagai primitif tanpa gaya | Aksesibilitas keyboard dan ARIA sudah benar sejak awal |
| Peta | **MapLibre GL JS** + deck.gl untuk lapisan kepadatan | Visualisasi cakupan jaringan |
| State | **TanStack Query** + Zustand | Sinkronisasi data on-chain dan off-chain |
| Dompet | **wagmi + embedded wallet SDK yang sama dengan mobile** | Satu identitas lintas platform |
| Hosting | **Vercel** atau **Cloudflare Pages** | Deploy cepat, edge caching |

### 17.6 Perangkat acuan

| Kelas | Perangkat contoh | Target performa |
|---|---|---|
| **Acuan minimum** | Snapdragon 6-series / Dimensity 700, RAM 4 GB, Android 11 | 12 fps deteksi, latensi p95 ≤120 ms |
| **Acuan utama** | Snapdragon 7-series, RAM 6–8 GB, Android 13 | 20 fps deteksi, latensi p95 ≤80 ms |
| **Tidak didukung** | RAM <3 GB, tanpa ARCore | Aplikasi menolak memasang dengan pesan jelas |

---

## 18. Model data dan skema

### 18.1 Entitas utama

```
User ──1:N── Trip ──1:N── HazardEvent
 │                            │
 │                            └──0:1── Report
 │
 └──0:1── ContributorProfile ──1:N── MappingSession ──1:N── Observation
                                                              │
                                                     N:1 ──── ObservationBatch ──1:1── Attestation (on-chain)
```

### 18.2 `Observation` — objek paling penting di sistem

Ini adalah satu-satunya bentuk data yang meninggalkan perangkat kontributor.

```json
{
  "obsId": "01J8ZQ3K4M7N2P5R8T1V4W6X9Y",
  "sessionId": "01J8ZQ3K4M7N2P5R8T1V4W6X00",
  "geo": {
    "lat": -8.67050,
    "lon": 115.21260,
    "quantizedTo": "1m_grid",
    "hAccuracyM": 4.2
  },
  "object": {
    "class": "pole",
    "hazardTier": "caution",
    "heightFromGroundM": 1.70,
    "widthM": 0.25,
    "blocksPathPercent": 45
  },
  "confidence": 0.94,
  "sensorContext": {
    "capturedAt": "2026-08-18T09:47:12Z",
    "walkingSpeedMps": 1.12,
    "barometerHpa": 1009.4,
    "wifiFingerprintHash": "b7c1…9e02",
    "deviceModelClass": "mid"
  },
  "privacy": {
    "facesBlurred": true,
    "platesBlurred": true,
    "rawImageRetained": false
  },
  "signature": "0x9f…c3"
}
```

**Aturan wajib.**

- Field `geo.lat` dan `geo.lon` **selalu** dikuantisasi ke grid 1 meter sebelum meninggalkan perangkat.
- `rawImageRetained` **selalu** `false` pada alur kontribusi. Nilai `true` hanya sah pada alur bantuan manusia dengan persetujuan eksplisit per sesi.
- `signature` dibuat dengan kunci perangkat, bukan kunci dompet — memisahkan identitas perangkat dari identitas ekonomi.

### 18.3 Tabel database utama

| Tabel | Kolom kunci | Indeks | Catatan |
|---|---|---|---|
| `observations` | `obs_id`, `batch_id`, `geom (POINT, SRID 4326)`, `object_class`, `hazard_tier`, `height_m`, `confidence`, `status`, `created_at` | GIST pada `geom`, BTREE pada `status`, `created_at` | Partisi bulanan |
| `observation_batches` | `batch_id`, `data_hash`, `storage_cid`, `geohash_prefix`, `point_count`, `status`, `onchain_tx` | BTREE pada `status`, `geohash_prefix` | Jembatan ke on-chain |
| `witnesses` | `batch_id`, `contributor_id`, `weight`, `attested_at` | UNIQUE (`batch_id`,`contributor_id`) | Mencegah saksi ganda |
| `contributors` | `contributor_id`, `wallet_address`, `reputation`, `tier`, `validated_points`, `rejected_points` | UNIQUE `wallet_address` | Cermin dari on-chain |
| `segments` | `segment_id`, `geom (LINESTRING)`, `accessibility_score`, `obstacle_density`, `guiding_tile_percent`, `data_age_days` | GIST pada `geom` | Unit dasar mesin rute |
| `hazard_reports` | `report_id`, `geom`, `hazard_type`, `reporter_id`, `confirmations`, `expires_at` | GIST, BTREE `expires_at` | Laporan kedaluwarsa otomatis |
| `trips` | `trip_id`, `user_id_hashed`, `started_at`, `ended_at`, `distance_m`, `warnings_count`, `silent_ratio` | BTREE `started_at` | `user_id` selalu di-hash |
| `campaigns` | `campaign_id`, `sponsor`, `area_geom`, `target_km`, `funded_amount`, `released_amount`, `deadline` | GIST | Cermin dari `ImpactTreasury` |

### 18.4 Kebijakan retensi data

| Data | Retensi | Alasan |
|---|---|---|
| Video / gambar mentah | **0 detik** — tidak pernah disimpan | Privasi ruang publik |
| Observation terverifikasi | Permanen (barang publik) | Nilai utama jaringan |
| Observation ditolak | 90 hari | Untuk analisis kualitas dan sanggahan |
| Data perjalanan pengguna | 30 hari, teragregasi setelahnya | Riwayat berguna, jejak presisi tidak |
| Log sesi bantuan manusia | 7 hari, hanya metadata | Penanganan sengketa |
| Analitik perilaku | 12 bulan, dianonimkan | Perbaikan produk |

---

## 19. Spesifikasi API

### 19.1 Konvensi

- Base URL: `https://api.netrasense.id/v1`
- Autentikasi: `Authorization: Bearer <JWT>`; permintaan ingest juga memuat `X-Device-Signature`
- Format: JSON; waktu dalam ISO-8601 UTC; koordinat dalam WGS-84
- Rate limit: 60 permintaan/menit per perangkat; ingest batch 10/menit
- Error mengikuti RFC 7807 (`application/problem+json`)

### 19.2 Endpoint

| Metode | Path | Deskripsi | Auth |
|---|---|---|---|
| `POST` | `/observations/batch` | Mengirim satu paket observasi beserta bukti lokasi | Perangkat |
| `GET` | `/observations/status/{batchId}` | Status validasi satu paket | Perangkat |
| `GET` | `/segments?bbox=&minScore=` | Mengambil segmen beserta skor aksesibilitas | Publik |
| `POST` | `/routes` | Menghitung rute berbasis skor aksesibilitas | Pengguna |
| `GET` | `/tiles/{z}/{x}/{y}.mvt` | Tile vektor rute untuk cache offline | Publik |
| `POST` | `/hazards` | Mengirim laporan bahaya | Pengguna |
| `GET` | `/hazards?bbox=&maxAgeH=` | Laporan bahaya aktif di area | Publik |
| `GET` | `/missions?lat=&lon=&radius=` | Daftar misi pemetaan beserta pengganda | Kontributor |
| `POST` | `/missions/{id}/start` | Memulai sesi pemetaan | Kontributor |
| `POST` | `/missions/{id}/complete` | Menutup sesi dan mengirim ringkasan | Kontributor |
| `GET` | `/contributors/me` | Profil, reputasi, dan saldo tertunda | Kontributor |
| `POST` | `/assist/request` | Meminta sesi bantuan manusia | Pengguna |
| `GET` | `/campaigns/{id}/impact` | Laporan dampak kampanye beserta tautan bukti on-chain | Publik |

### 19.3 Contoh — `POST /routes`

**Permintaan**

```json
{
  "origin": { "lat": -8.67050, "lon": 115.21260 },
  "destination": { "text": "Kantor", "lat": -8.66512, "lon": 115.21890 },
  "profile": "blind_pedestrian",
  "preferences": {
    "maxDetourPercent": 40,
    "requireGuidingTiles": false,
    "avoidUnmappedSegments": true
  }
}
```

**Respons**

```json
{
  "routes": [
    {
      "routeId": "rt_01J8ZQ",
      "accessibilityScore": 92,
      "distanceM": 520,
      "durationS": 480,
      "obstacles": 1,
      "unsignaledCrossings": 0,
      "guidingTilePercent": 80,
      "dataFreshnessDays": 3,
      "warnings": [],
      "geometry": "encoded_polyline_here"
    },
    {
      "routeId": "rt_01J8ZR",
      "accessibilityScore": 54,
      "distanceM": 400,
      "durationS": 360,
      "obstacles": 9,
      "unsignaledCrossings": 2,
      "warnings": ["9 hambatan tetap", "2 penyeberangan tanpa sinyal audio"],
      "geometry": "encoded_polyline_here"
    }
  ],
  "computedAt": "2026-08-18T09:45:02Z"
}
```

### 19.4 Contoh — respons error

```json
{
  "type": "https://api.netrasense.id/errors/area-not-mapped",
  "title": "Wilayah belum terpetakan",
  "status": 200,
  "detail": "Tidak ada data Proof-of-Path untuk wilayah ini. Rute dihitung dari jaringan jalan dasar.",
  "userMessage": "Jalur ini belum pernah dipetakan. Saya akan lebih sering memperingatkan Anda.",
  "fallbackApplied": "base_network_with_increased_sensitivity"
}
```

**Aturan penting.** Setiap error yang mungkin sampai ke pengguna wajib memuat field `userMessage` dalam Bahasa Indonesia yang siap dibacakan pembaca layar. Pesan teknis tidak pernah dibacakan ke pengguna.

---

## 20. Keamanan, privasi, dan kepatuhan

### 20.1 Model ancaman

| Ancaman | Dampak | Mitigasi |
|---|---|---|
| Pemalsuan lokasi untuk memanen imbalan | Data palsu masuk peta keselamatan | L1 Proof of Location + L2 konsensus (12.4) |
| Penyisipan data berbahaya (menandai jalur berbahaya sebagai aman) | Cedera fisik pengguna | L6 asimetri arah laporan; ambang 5 saksi untuk penghapusan bahaya |
| Pembuatan akun massal | Pengurasan emisi imbalan | L4 reputasi bertingkat + batas harian per kontributor |
| Kebocoran jejak lokasi pengguna | Bahaya keselamatan pribadi | Kuantisasi grid, agregasi, identitas kontributor dan pengguna tidak pernah ditautkan |
| Penyadapan kamera | Pelanggaran privasi pihak ketiga | Pemrosesan on-device, blur wajib, indikator perekaman terlihat |
| Kompromi kunci admin kontrak | Manipulasi imbalan | Multisig + timelock 48 jam + circuit breaker yang tidak dapat memblokir pembacaan data |
| Serangan pada model AI (adversarial patch) | Deteksi gagal | Ensemble sederhana + validasi geometris + bias ke peringatan berlebih pada kelas Kritis |

### 20.2 Kontrol keamanan

- **Transport:** TLS 1.3 wajib; certificate pinning pada aplikasi.
- **Penyimpanan:** kunci perangkat di Android Keystore; database terenkripsi saat diam.
- **Kode:** dependency scanning otomatis, SAST pada setiap PR, analisis statis kontrak (Slither) sebelum setiap deploy.
- **Rahasia:** tidak ada rahasia di repositori; secret manager wajib.
- **Akses:** prinsip hak akses minimum; akses produksi memerlukan persetujuan dua orang.

### 20.3 Privasi berdasarkan desain

| Prinsip | Implementasi konkret |
|---|---|
| Minimisasi data | Hanya data semantik yang dikirim; video mentah tidak pernah keluar dari perangkat |
| Pemrosesan di tepi | Seluruh deteksi keselamatan berjalan on-device |
| Anonimisasi | Wajah dan pelat nomor diburamkan pada tahap pra-pemrosesan, sebelum penyimpanan apa pun |
| Pemisahan identitas | Identitas pengguna dan identitas kontributor tidak pernah ditautkan, bahkan pada perangkat yang sama |
| Data disabilitas | **Tidak pernah disimpan.** Kelayakan tier gratis dibuktikan lewat zero-knowledge proof — sistem hanya menerima jawaban "berhak", tanpa identitas atau diagnosis |
| Kendali pengguna | Ekspor dan hapus data mandiri; penarikan izin kontribusi tidak menghentikan fungsi keselamatan |

### 20.4 Kepatuhan

| Kerangka | Kewajiban | Tindakan |
|---|---|---|
| **UU PDP (UU 27/2022)** | Dasar pemrosesan, hak subjek data, notifikasi insiden | Persetujuan granular per tujuan; alur ekspor & hapus; prosedur notifikasi insiden 3×24 jam |
| **Kebijakan Google Play** | Batasan aset kripto, izin sensitif, iklan izin | Klaim & perdagangan hanya di web (AC-24.2); deklarasi pemakaian kamera latar belakang; tidak ada fungsi perdagangan di aplikasi |
| **WCAG 2.2** | Aksesibilitas antarmuka | Target AA sebagai minimum, AAA untuk seluruh teks dan kontras (lihat 21.4) |
| **Regulasi aset kripto Indonesia** | Status token, penyelenggara | Jalur mundur poin non-transferabel pada R0–R1; kajian hukum wajib sebelum penerbitan token |
| **Etika perekaman ruang publik** | Norma setempat | Indikator perekaman terlihat, mode privat di area sensitif (rumah sakit, sekolah, tempat ibadah) |

---

# BAGIAN E — DESAIN & KUALITAS

## 21. Spesifikasi desain dan design token

> Bagian ini adalah ringkasan yang dapat dieksekusi. Penjelasan lengkap beserta alasan setiap keputusan ada di **Design Brief & Design System v2.0**, dan seluruh layar dapat dilihat di **Konsep Desain UI v2.0** (HTML interaktif).

### 21.1 Arah desain

**Terang sebagai mode utama.** Latar kertas hangat, bukan putih steril — putih murni memantulkan cahaya terlalu keras di luar ruangan dan menyulitkan pembaca low vision. Aturan sistem: **warna tua untuk teks, warna cerah untuk bidang isi, dan tidak pernah sebaliknya.**

### 21.2 Token warna

```json
{
  "surface": {
    "paper":   "#FBFAF7",
    "surface": "#FFFFFF",
    "alt":     "#F4F2ED",
    "line":    "#E6E2DA"
  },
  "text": {
    "ink":      "#14181F",
    "ink2":     "#4A5462",
    "ink3":     "#495260",
    "disabled": "#8A93A1"
  },
  "brand": {
    "amberTint": "#FFF3D1", "amber": "#FFC53D", "amberDeep": "#6B4900",
    "tealTint":  "#DCF1F6", "teal":  "#17A2BD", "tealDeep":  "#0B5566",
    "violetTint":"#EBE5FE", "violet":"#7C5CE0", "violetDeep":"#4B33A8"
  },
  "semantic": {
    "greenTint": "#DFF4E7", "green": "#22A45D", "greenDeep": "#0A5A30",
    "orangeTint":"#FCEBDC", "orange":"#EE7B22", "orangeDeep":"#85390A",
    "redTint":   "#FBE6E6", "red":   "#D22B2B", "redDeep":   "#8F1F1F"
  },
  "dark": {
    "bg": "#0D1420", "text": "#F2F5F9",
    "amber": "#FFC53D", "danger": "#FF8080", "violet": "#B49CFC"
  }
}
```

**Rasio kontras terverifikasi (dihitung dengan rumus WCAG 2.1, bukan diperkirakan):**

| Pasangan | Rasio | Tingkat |
|---|---|---|
| Ink di atas Paper | 17,05:1 | AAA |
| Ink 2 di atas Paper | 7,35:1 | AAA |
| Ink 3 di atas Paper | 7,57:1 | AAA |
| Amber Deep di atas Paper | 7,80:1 | AAA |
| Teal Deep di atas Paper | 8,03:1 | AAA |
| Violet Deep di atas Paper | 8,60:1 | AAA |
| Green Deep di atas Paper | 7,44:1 | AAA |
| Orange Deep di atas Paper | 7,90:1 | AAA |
| Red Deep di atas Paper | 7,84:1 | AAA |
| Ink di atas Amber (bidang isi) | 11,27:1 | AAA |
| Putih di atas Red (tombol bahaya) | 5,10:1 | AA |

**Aturan mutlak:** Amber dan Teal solid **tidak pernah dipakai sebagai teks di atas latar terang** — keduanya gagal. Untuk teks, gunakan varian Deep.

### 21.3 Token tipografi

| Token | Ukuran | Line height | Weight | Typeface | Pemakaian |
|---|---|---|---|---|---|
| `display` | 40 sp | 1.10 | 700 | Space Grotesk | Status utama layar navigasi |
| `title-lg` | 30 sp | 1.20 | 700 | Space Grotesk | Judul layar |
| `title` | 24 sp | 1.25 | 700 | Space Grotesk | Judul kartu |
| `body-lg` | 20 sp | 1.55 | 400 | Atkinson Hyperlegible | **Ukuran isi baku** |
| `body` | 18 sp | 1.55 | 400 | Atkinson Hyperlegible | Isi sekunder |
| `label` | 16 sp | 1.40 | 700 | Atkinson Hyperlegible | Label tombol |
| `caption` | 14 sp | 1.45 | 400 | Atkinson Hyperlegible | **Batas bawah mutlak** |
| `mono` | 14 sp | 1.45 | 400 | JetBrains Mono | Data teknis, koordinat |

**Alasan Atkinson Hyperlegible:** dirancang Braille Institute khusus untuk pembaca low vision; huruf yang paling sering tertukar (Il1, O0, bdpq, ceo) dibuat semaksimal mungkin berbeda. Ini pilihan fungsional yang dapat dipertahankan, bukan selera.

### 21.4 Token spasi dan target sentuh

```
spacing scale (dp) : 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96
radius (dp)        : sm 12 · md 14 · lg 24
touch target       : aksi utama ≥88 · aksi lain ≥64 · jarak antar target ≥16
padding tepi layar : 24 (naik ke 32 pada layar >6,5 inci)
```

### 21.5 Komponen dan state wajib

Setiap komponen interaktif wajib mendefinisikan **enam state**: default, focused, pressed, loading, disabled, success. Setiap state wajib punya padanan non-visual (pengumuman pembaca layar atau umpan balik haptic).

| Komponen | Varian | Catatan |
|---|---|---|
| Button | primary (Ink), amber, ghost, danger (Red), network (Violet) | Satu primary per layar; danger hanya untuk bahaya, tidak untuk hapus |
| Hazard Alert | kritis | Tanpa tombol tutup, tanpa animasi masuk, maksimum dua baris teks |
| Route Card | terpilih / tidak | Skor aksesibilitas lebih menonjol daripada jarak |
| Contribution Tile | default / aktif | Aksen Violet penuh |
| Wallet Sheet | — | Tanpa satu pun istilah kripto (16.3) |
| Voice Orb | idle / mendengarkan | Satu-satunya animasi berulang yang diizinkan; berhenti saat reduce-motion |
| Toggle, Slider, Bottom Sheet, Nav Bar | — | Target ≥64 dp |

### 21.6 Aturan desain yang tidak dapat dinegosiasikan

1. Keheningan adalah default — antarmuka tidak mengumumkan dirinya.
2. Bahaya punya bahasa sendiri — warna, bentuk, suara, dan getaran yang tidak dipakai elemen lain mana pun.
3. Setiap informasi kritis hadir di minimal dua kanal indra.
4. Ukuran mengalahkan kerapian — target sentuh selalu menang atas komposisi.
5. Rancang untuk trotoar jam lima sore, bukan untuk ruangan demo.

---

## 22. Spesifikasi audio dan haptic

> Bagi sebagian besar pengguna, inilah satu-satunya antarmuka yang benar-benar mereka alami. Bagian ini setara pentingnya dengan seluruh bagian visual.

### 22.1 Prinsip

| Prinsip | Konsekuensi teknis |
|---|---|
| Jangan pernah menutup telinga | Wajib bone conduction / open-ear; peredam bising dilarang di seluruh alur produk termasuk rekomendasi perangkat |
| Earcon sebelum kata | Nada pendek menyampaikan kelas informasi dalam 200 ms; ucapan menyusul hanya bila perlu detail |
| Ruang membawa arah | Panning HRTF memposisikan sumber suara pada arah objek sebenarnya |
| Tempo membawa jarak | Interval antar denyut memendek saat jarak mengecil |
| Nada membawa ketinggian | Frekuensi rendah untuk bahaya permukaan, tinggi untuk bahaya setinggi kepala |

### 22.2 Pustaka earcon

| Earcon | Karakter | Durasi | Rentang frekuensi | Makna |
|---|---|---|---|---|
| `clear` | Dua nada naik, lembut | 180 ms | 700–900 Hz | Jalur bersih — hanya saat keluar dari zona bahaya |
| `proximity` | Denyut tunggal, tempo naik | 80 ms | 500 Hz | Objek mendekat; panning menunjukkan arah |
| `overhead` | Dua nada tinggi cepat | 160 ms | 1800–2200 Hz | Bahaya setinggi kepala |
| `critical` | Nada rendah tajam, berulang | 240 ms | 400 Hz | Berhenti sekarang; memotong semua audio |
| `turn` | Nada meluncur ke arah belokan | 200 ms | 800→1200 Hz | Instruksi belok |
| `confirm` | Nada tunggal hangat | 120 ms | 1000 Hz | Aksi berhasil |
| `contribution` | Tiga nada naik | 300 ms | 900–1400 Hz | Data tervalidasi — satu-satunya earcon "menyenangkan" |

Seluruh earcon berada pada rentang 400–2.500 Hz agar tetap terdengar di kebisingan lalu lintas kota tanpa volume tinggi, dan tidak bertabrakan dengan frekuensi suara manusia.

### 22.3 Pustaka haptic

| Pola | Bentuk getar | Makna |
|---|---|---|
| `tap` | 1 × 30 ms ringan | Konfirmasi sentuhan, elemen fokus |
| `double` | 2 × 40 ms, jeda 80 ms | Instruksi belok |
| `sharpDouble` | 2 × 60 ms tajam, jeda 60 ms | Bahaya setinggi kepala |
| `ramp` | Intensitas naik bertahap | Mendekati rintangan |
| `longSharp` | 1 × 400 ms intensitas penuh | **Berhenti — bahaya kritis** |
| `tripleSoft` | 3 × 30 ms lembut | Kontribusi tervalidasi |

**Aturan mutlak.** Pola `longSharp` tidak pernah dipakai untuk apa pun selain bahaya kritis — tidak untuk notifikasi, tidak untuk error, tidak untuk pesan masuk. Kekuatan sistem ini sepenuhnya bergantung pada kemurnian asosiasi tersebut.

### 22.4 Hierarki interupsi

```
PRIORITAS 1  Bahaya kritis        memotong segalanya · tidak dapat diredam mode senyap
PRIORITAS 2  Bahaya kepala        memotong panduan navigasi
PRIORITAS 3  Instruksi navigasi   menunggu prioritas 1–2 selesai
PRIORITAS 4  Pembacaan teks       dapat dijeda pengguna kapan saja
PRIORITAS 5  Notifikasi jaringan  ditahan sampai perjalanan berakhir
```

Prioritas 5 tidak pernah berbunyi saat pengguna bergerak. Imbalan token bisa menunggu; keselamatan tidak.

### 22.5 Suara asisten

| Parameter | Nilai |
|---|---|
| Kecepatan bicara baku | 1,3× normal, dapat diatur 0,8×–3,0× |
| Karakter suara | Netral dan tenang; hindari suara terlalu ceria |
| Interupsi | Ketukan dua jari memotong ucapan kapan saja |
| Bahasa | Bahasa Indonesia baku; istilah lokal untuk nama tempat |
| Panjang kalimat | Maksimum 12 kata per instruksi navigasi |

---

## 23. Persyaratan non-fungsional

| Kategori | Persyaratan | Target | Cara pengukuran |
|---|---|---|---|
| **Latensi deteksi** | Frame masuk → peringatan keluar | ≤120 ms p95, ≤80 ms p50 | Trace on-device dengan timestamp |
| **Frame rate deteksi** | Pada perangkat acuan minimum | ≥12 fps | Profiler bawaan |
| **Latensi pembacaan teks** | Picu → suara pertama | ≤2,5 s p95 online, ≤4 s offline | Instrumentasi event |
| **Latensi API rute** | Permintaan → respons | ≤600 ms p95 | APM server |
| **Baterai** | Mode navigasi kontinu | ≤18%/jam | Uji lapangan 60 menit, 3 perangkat |
| **Baterai** | Mode pemetaan kontributor | ≤22%/jam | Uji lapangan |
| **Ukuran aplikasi** | APK unduhan | ≤120 MB termasuk model | Bundle analyzer |
| **Penyimpanan** | Cache peta per kota | ≤400 MB | Uji instalasi |
| **Offline** | Fungsi keselamatan tanpa koneksi | 100% lapisan SENSE | Uji mode pesawat |
| **Cold start** | Buka aplikasi → siap navigasi | ≤2,5 s | Startup trace |
| **Suara pertama** | Buka aplikasi → sapaan suara | ≤0,2 s | Instrumentasi |
| **Ketersediaan backend** | Uptime bulanan | ≥99,5% | Monitoring eksternal |
| **Kapasitas ingest** | Observasi per detik | ≥500/s pada R2 | Load test |
| **Aksesibilitas** | Kontras teks | ≥7:1 (AAA) seluruh teks | Uji otomatis di CI |
| **Aksesibilitas** | Penskalaan teks | 200% tanpa kehilangan konten | Uji visual otomatis |
| **Aksesibilitas** | Label pembaca layar | 100% elemen interaktif | Uji otomatis + audit manual |
| **Keamanan** | Kerentanan kritis terbuka | 0 sebelum rilis | SAST + dependency scan |
| **Kontrak** | Cakupan uji kontrak | ≥95% baris, invariant test wajib | Foundry coverage |

---

## 24. Analitik dan instrumentasi

### 24.1 Prinsip

Analitik pada produk ini melayani satu tujuan: **membuktikan produk benar-benar mengurangi risiko dan meningkatkan kemandirian.** Bukan untuk memaksimalkan waktu layar — metrik itu justru akan menyesatkan, karena produk yang baik adalah produk yang paling sedikit bicara.

### 24.2 Taksonomi event

| Event | Properti | Tujuan |
|---|---|---|
| `trip_started` | `route_id`, `accessibility_score`, `is_saved_route`, `data_freshness_days` | Basis seluruh analisis perjalanan |
| `trip_completed` | `distance_m`, `duration_s`, `warnings_count`, `silent_ratio`, `reroutes` | G-1, G-2, guardrail keheningan |
| `trip_abandoned` | `distance_covered_percent`, `last_screen`, `reason_if_given` | Deteksi titik gagal |
| `hazard_detected` | `tier`, `object_class`, `distance_m`, `confidence`, `was_mapped` | Kualitas deteksi |
| `hazard_warning_shown` | `tier`, `latency_ms`, `channels[]` | Latensi & multi-kanal |
| `hazard_dismissed_as_false` | `tier`, `object_class` | **Metrik peringatan palsu — guardrail utama** |
| `hazard_reported` | `hazard_type`, `taps_to_complete`, `was_offline` | F-17, target dua ketukan |
| `read_requested` | `mode`, `latency_ms`, `confidence`, `escalated_to_human` | Kualitas lapisan READ |
| `assist_requested` | `wait_time_s`, `matched`, `session_duration_s` | F-16 |
| `mapping_session_completed` | `points_auto`, `points_manual`, `distance_m`, `battery_used_percent` | F-22 |
| `observation_validated` | `time_to_validation_h`, `witness_count` | Kesehatan jaringan |
| `observation_rejected` | `reason_code` | Kualitas kontributor |
| `reward_claimed` | `amount`, `days_since_earned` | Kesehatan ekonomi |
| `a11y_setting_changed` | `setting`, `from`, `to` | Memahami kebutuhan nyata |
| `tts_speed_changed` | `to_rate` | Validasi asumsi kecepatan bicara |

### 24.3 Dasbor wajib

1. **Dasbor keselamatan** — peringatan palsu per perjalanan, negatif palsu kelas Kritis, latensi p95, rasio keheningan.
2. **Dasbor kemandirian** — perjalanan solo per pengguna per minggu, retensi kohort mingguan.
3. **Dasbor jaringan** — km tervalidasi, waktu validasi median, tingkat penolakan, usia data median.
4. **Dasbor ekonomi** — biaya per km terpetakan, emisi vs klaim, distribusi imbalan per kontributor.

### 24.4 Batasan privasi analitik

- Tidak ada koordinat presisi dalam event; hanya geohash tingkat 6 (≈1,2 km).
- `user_id` selalu di-hash dengan salt per instalasi.
- Tidak ada event yang merekam isi ucapan, isi pembacaan teks, atau isi deskripsi adegan.
- Opsi menonaktifkan analitik tersedia di onboarding dan tidak memengaruhi fungsi apa pun.

---

## 25. Rencana pengujian dan QA

### 25.1 Piramida pengujian

| Lapisan | Cakupan | Alat | Gate |
|---|---|---|---|
| Unit | Logika skor rute, formula bounty, klasifikasi kelas | `Jest`, Vitest, Foundry | ≥80% baris |
| Integrasi | Ingest → validasi → attestation | Testcontainers + Anvil | Seluruh alur kritis |
| Kontrak | Unit + fuzz + invariant | Foundry, Slither | ≥95% baris, 0 temuan high |
| E2E aplikasi | Alur pengguna penuh **dengan TalkBack aktif** | Maestro | Seluruh alur R0 |
| Aksesibilitas | Kontras, target sentuh, label, urutan fokus | Uji otomatis kustom + axe | 0 pelanggaran |
| Performa | Latensi, fps, baterai, memori | Profiler + uji lapangan | Memenuhi bagian 23 |
| Lapangan | Uji berjalan nyata di trotoar | Protokol 25.3 | Wajib per rilis |

### 25.2 Kasus uji kritis yang wajib ada

| # | Skenario | Ekspektasi |
|---|---|---|
| T-01 | Lubang terbuka 2 m di depan, siang hari cerah | Peringatan kritis ≤120 ms, getar `longSharp` |
| T-02 | Papan reklame setinggi 1,8 m di jalur | Diklasifikasikan Kepala, bukan Waspada |
| T-03 | Ponsel dimasukkan ke saku saat navigasi | Deteksi visual dijeda, panduan arah lanjut, satu pengumuman |
| T-04 | Mode pesawat sepanjang perjalanan | Seluruh lapisan SENSE berfungsi normal |
| T-05 | Skala teks 200% pada seluruh 31 layar | Tidak ada konten terpotong |
| T-06 | Navigasi penuh hanya dengan TalkBack, layar ditutup kain | Seluruh tugas dapat diselesaikan |
| T-07 | Mode senyap sistem aktif, bahaya kritis muncul | Getar dan audio tetap dipicu |
| T-08 | Kontributor mengirim 200 observasi dari lokasi yang sama | Ditolak oleh L1 dan L3 |
| T-09 | Laporan penghapusan bahaya oleh 4 kontributor | Belum tervalidasi (butuh 5, aturan L6) |
| T-10 | Klaim imbalan dicoba dari dalam aplikasi | Diarahkan ke web dApp, tidak ada transaksi di aplikasi |
| T-11 | Layar dompet dirender | Pemindai otomatis tidak menemukan istilah kripto terlarang (16.3) |
| T-12 | Uang terlipat diarahkan ke kamera | Sistem menolak menyebut nominal |

### 25.3 Protokol uji lapangan

Wajib dijalankan sebelum setiap rilis, dan tidak dapat digantikan uji otomatis:

1. **Minimal 3 penguji tunanetra**, bukan anggota tim, berjalan pada rute nyata sepanjang ≥500 m.
2. **Dua kondisi cahaya**: siang terik dan sore menjelang gelap.
3. **Satu kondisi bising**: jalan dengan lalu lintas padat.
4. Pengamat mencatat: setiap peringatan palsu, setiap bahaya yang terlewat, setiap momen penguji tampak bingung.
5. Wawancara pasca-uji: satu pertanyaan wajib — *"Apakah Anda akan memakai ini besok tanpa kami menemani?"*

### 25.4 Definition of Done

Sebuah fitur dinyatakan selesai hanya bila seluruh butir terpenuhi:

- [ ] Seluruh kriteria penerimaan lolos
- [ ] Uji unit dan integrasi hijau
- [ ] Diuji dengan TalkBack aktif
- [ ] Kontras dan target sentuh lolos uji otomatis
- [ ] Label pembaca layar ditulis manual, bukan dihasilkan otomatis dari teks tampilan
- [ ] Padanan audio dan haptic terdefinisi (bila relevan)
- [ ] Event analitik terpasang
- [ ] Perilaku offline terdefinisi dan diuji
- [ ] Error state punya `userMessage` dalam Bahasa Indonesia
- [ ] Tidak menurunkan metrik guardrail bagian 2.2

---

# BAGIAN F — EKSEKUSI

## 26. Rilis, lingkungan, dan CI/CD

### 26.1 Lingkungan

| Lingkungan | Aplikasi | Backend | Chain | Tujuan |
|---|---|---|---|---|
| `local` | Emulator + perangkat dev | Docker Compose | Anvil (lokal) | Pengembangan harian |
| `dev` | Internal APK | Instance dev | Testnet | Integrasi berkelanjutan |
| `staging` | Closed track Play Store | Cermin produksi | Testnet | Uji penerimaan dan uji lapangan |
| `prod` | Production track | Produksi | Mainnet (mulai R2) | Pengguna nyata |

### 26.2 Pipeline CI/CD

```
push / PR
   ├─ lint + format
   ├─ unit test (React Native, backend, kontrak)
   ├─ analisis statis (SAST, Slither)
   ├─ uji aksesibilitas otomatis (kontras · target sentuh · label)
   ├─ scan dependensi
   └─ build artefak

merge ke main
   ├─ integration test dengan Testcontainers + Anvil
   ├─ deploy backend ke dev
   ├─ build APK dev + distribusi internal
   └─ E2E Maestro dengan TalkBack aktif

tag rilis
   ├─ deploy kontrak ke testnet/mainnet + verifikasi sumber
   ├─ deploy backend ke staging → prod (canary 10% → 100%)
   ├─ unggah APK ke Play Store closed track
   └─ catatan rilis otomatis dari commit berkonvensi
```

### 26.3 Strategi rilis aplikasi

- **Feature flag** untuk seluruh fitur baru; deteksi keselamatan tidak pernah berada di balik flag eksperimen.
- **Staged rollout** 10% → 50% → 100% dengan pemantauan metrik guardrail bagian 2.2.
- **Rollback otomatis** bila peringatan palsu per perjalanan melewati 2,5 atau crash rate melewati 1%.
- **Kontrak tidak pernah di-rollback** — perbaikan dilakukan lewat upgrade proxy dengan timelock.

---

## 27. Roadmap dan milestone

| Fase | Durasi | Milestone | Definisi selesai |
|---|---|---|---|
| **R0 — MVP Hackathon** | 48–72 jam | Satu lingkaran penuh berjalan langsung | Deteksi real-time + peringatan multi-kanal + laporan + validasi + attestation testnet, didemokan langsung tanpa video |
| **R1 — Alpha Tertutup** | Bulan 1–3 | Produk layak diuji manusia | Model deteksi stabil di perangkat acuan, sistem audio-haptic final, uji lapangan dengan 10–15 pengguna tunanetra, kontrak di testnet publik |
| **R2 — Pilot Denpasar** | Bulan 4–8 | Jaringan hidup di satu kota | 50 km tervalidasi, 200+ kontributor, kampanye sponsor pertama cair, mainnet, audit kontrak selesai |
| **R3 — Multi-kota** | Bulan 9–18 | Jaringan yang berdiri sendiri | 3–5 kota, DAO governance aktif, API publik, integrasi mitra pertama, dukungan iOS |
| **R4 — Perangkat** | Bulan 18+ | Bebas tangan | Dukungan kacamata AR, standar data aksesibilitas terbuka lintas aplikasi |

### 27.1 Rencana kerja R0 (72 jam)

| Jam | Fokus | Keluaran |
|---|---|---|
| 0–6 | Setup, pembagian kerja, kerangka aplikasi | Repo, CI dasar, kerangka layar |
| 6–20 | Pipeline deteksi + peringatan multi-kanal | F-01, F-02, F-03, F-04 berjalan di perangkat |
| 20–32 | Alur kontribusi + antrean unggah | F-22, F-17 berjalan |
| 20–36 | Kontrak + testnet + indexer sederhana | F-23 tercatat on-chain |
| 32–44 | Rute demo + panduan audio spasial | F-07 minimal, F-08 berjalan |
| 44–56 | Dompet passkey + klaim minimal di web | F-24, F-27 minimal |
| 56–64 | Polish UI, uji internal, perbaikan | Alur demo stabil |
| 64–72 | Latihan demo, materi presentasi, cadangan | Demo dapat diulang 5 kali tanpa gagal |

---

## 28. Tim, RACI, dan estimasi effort

### 28.1 Peran

| Peran | Tanggung jawab utama | Keluaran R0 |
|---|---|---|
| Product & Pitch Lead | Narasi, riset pengguna, koordinasi, presentasi | Deck, skrip demo, jawaban Q&A |
| Mobile / AR Engineer | Aplikasi, integrasi ARCore, pipeline sensor | Aplikasi berjalan dengan deteksi real-time |
| AI / CV Engineer | Model deteksi on-device, klasifikasi kelas bahaya | Model terkuantisasi <100 ms di perangkat uji |
| Web3 Engineer | Kontrak, dompet tertanam, web dApp | Alur kontribusi → validasi → imbalan di testnet |
| Designer (UX + Audio) | Sistem desain, audio & haptic, aksesibilitas | Prototipe UI, pustaka earcon, aset presentasi |

### 28.2 Matriks RACI

| Area | Product | Mobile | AI/CV | Web3 | Design |
|---|:--:|:--:|:--:|:--:|:--:|
| Ruang lingkup & prioritas | **A/R** | C | C | C | C |
| Pipeline deteksi (F-01…F-05) | C | **R** | **A** | I | C |
| Navigasi & rute (F-06…F-11) | C | **A/R** | C | I | C |
| Lapisan READ (F-12…F-15) | C | **R** | **A** | I | C |
| Kontribusi (F-21…F-23) | C | **A/R** | C | C | C |
| Kontrak & token (14, 15) | C | I | I | **A/R** | I |
| Dompet & identitas (16) | C | **R** | I | **A** | C |
| Sistem desain (21) | C | C | I | I | **A/R** |
| Audio & haptic (22) | C | **R** | I | I | **A** |
| Aksesibilitas & QA (25) | **A** | R | I | I | **R** |
| Privasi & kepatuhan (20) | **A/R** | C | C | C | I |

*A = Accountable · R = Responsible · C = Consulted · I = Informed*

### 28.3 Estimasi effort R1 (person-week)

| Area | Estimasi | Catatan |
|---|---|---|
| Pipeline deteksi + kalibrasi model | 8 pw | Termasuk pengumpulan dataset trotoar lokal |
| Navigasi, rute, audio spasial | 6 pw | Termasuk integrasi engine rute |
| Lapisan READ | 4 pw | |
| Alur kontribusi + validasi backend | 6 pw | |
| Kontrak + indexer + web dApp | 6 pw | |
| Dompet, passkey, AA | 3 pw | |
| Sistem desain + implementasi UI | 6 pw | 31 layar |
| Audio & haptic (produksi aset) | 2 pw | |
| QA, aksesibilitas, uji lapangan | 5 pw | Tidak dapat dikompres |
| **Total** | **46 pw** | ≈ 3 bulan untuk tim 4 orang penuh waktu |

---

## 29. Risiko dan mitigasi

| # | Risiko | Tingkat | Mitigasi | Pemilik |
|---|---|---|---|---|
| R-01 | Negatif palsu pada bahaya kritis | **Tinggi** | Posisi tegas sebagai pelengkap tongkat; kalibrasi bias ke peringatan berlebih; uji lapangan wajib | AI/CV |
| R-02 | Kelelahan peringatan → aplikasi dimatikan | **Tinggi** | Prinsip keheningan default; guardrail ≤2 peringatan palsu/perjalanan; sensitivitas dapat diatur | Product |
| R-03 | Cold start data — peta kosong | **Tinggi** | Lapisan SENSE bekerja penuh tanpa data peta; peta hanya meningkatkan kualitas rute | Product |
| R-04 | Serangan sybil pada imbalan | Sedang | Enam lapis pertahanan (12.4); imbalan awal kecil; reputasi tidak dapat dipindahtangankan | Web3 |
| R-05 | Reaksi negatif terhadap kamera aktif di ruang publik | Sedang | Pemrosesan on-device, blur otomatis, indikator terlihat, komunikasi proaktif bersama organisasi disabilitas | Product |
| R-06 | Ketidakpastian regulasi aset kripto | Sedang | Jalur mundur poin non-transferabel pada R0–R1; kajian hukum sebelum penerbitan | Product |
| R-07 | Penolakan Google Play karena kebijakan kripto | Sedang | Pemisahan akumulasi (aplikasi) dan klaim (web); tidak ada fungsi perdagangan di aplikasi | Web3 |
| R-08 | Baterai habis sebelum perjalanan selesai | Sedang | Manajemen daya adaptif (F-05); guardrail ≤18%/jam | Mobile |
| R-09 | Web3 terbaca sebagai tempelan oleh juri | Sedang | Bagian 12.2 dan glosarium 5; latihan menjawab dalam 30 detik | Product |
| R-10 | Tim tidak punya akses ke penguji tunanetra | **Tinggi** | Permintaan nomor 1 dalam proposal; jalin kontak Pertuni sebelum menulis kode berikutnya | Product |

> **Risiko yang tidak dapat dimitigasi dengan teknologi:** produk ini akan gagal jika dirancang tanpa penyandang tunanetra di dalam proses pengambilan keputusan. Rekrut penguji sebelum baris kode berikutnya ditulis, bukan setelah prototipe selesai.

---

## 30. Pertanyaan terbuka dan keputusan tertunda

| # | Pertanyaan | Dampak jika salah | Cara memutuskan | Tenggat |
|---|---|---|---|---|
| Q-01 | Chain mana yang dipakai? | Biaya transaksi dan ketersediaan tooling | Ikuti chain sponsor hackathon; bila bebas, prototipe di dua chain pada R1 | Sebelum R1 |
| Q-02 | ~~Flutter atau Kotlin native?~~ **Diputuskan: React Native.** Perlu native module custom untuk ARCore Depth API tetap dipertahankan? | Latensi kanal platform pada pipeline sensor | Spike ARCore + TalkBack di awal R0; profiling penuh pada perangkat acuan minimum di minggu 2 R1 | Awal R0 (spike) · Minggu 2 R1 (profiling penuh) |
| Q-03 | Berapa ambang saksi yang optimal (3 vs 4)? | Kecepatan validasi vs kualitas data | Simulasi dengan data pilot 2 minggu pertama | R2 |
| Q-04 | Token diterbitkan pada R2 atau ditunda ke R3? | Kepatuhan dan persepsi publik | Kajian hukum + masukan komunitas | Sebelum R2 |
| Q-05 | Model VLM awan mana untuk deskripsi adegan? | Biaya per panggilan dan kualitas Bahasa Indonesia | Benchmark 3 penyedia dengan 100 adegan nyata | R1 |
| Q-06 | Apakah mode kontributor digabung atau dipisah jadi dua APK? | Ukuran aplikasi dan kejelasan positioning | Uji dengan 5 pengguna dari masing-masing segmen | R1 |
| Q-07 | Bagaimana verifikasi kelayakan tier gratis di lapangan? | Penyalahgunaan vs hambatan akses | Diskusi dengan Pertuni dan dinas sosial | R2 |
| Q-08 | Apakah earcon perlu berbeda per wilayah budaya? | Kesalahpahaman makna nada | Uji lapangan lintas kota pada R3 | R3 |

---

## Lampiran A — Ringkasan ID

**Fitur:** F-01…F-30 (bagian 6.2)
**Layar:** P-01…P-21 · K-01…K-06 · W-01…W-04 (bagian 7.1)
**Kriteria penerimaan:** AC-xx.y, mengikuti nomor fitur
**Kasus uji:** T-01…T-12 (bagian 25.2)
**Risiko:** R-01…R-10 (bagian 29)
**Pertanyaan terbuka:** Q-01…Q-08 (bagian 30)
**Tujuan:** G-1…G-5 (bagian 2.1)
**Non-tujuan:** NG-1…NG-9 (bagian 3)

## Lampiran B — Sumber data yang dikutip

- WHO, *Blindness and vision impairment fact sheet* — 2,2 miliar orang dengan gangguan penglihatan; 1 miliar kasus dapat dicegah atau belum tertangani; US$411 miliar kerugian produktivitas global per tahun.
- Kementerian Kesehatan RI (2017), merujuk survei *Rapid Assessment of Avoidable Blindness* (RAAB) 2014–2016 — prevalensi kebutaan 3% di 15 provinsi Indonesia, peringkat kedua tertinggi di dunia.
- Rasio kontras pada bagian 21.2 dihitung dengan rumus luminansi relatif WCAG 2.1 secara programatik.

## Lampiran C — Dokumen terkait

| Dokumen | Isi | Kapan dipakai |
|---|---|---|
| **Proposal Proyek v2.0** | Latar belakang, model bisnis, permintaan dukungan, antisipasi pertanyaan juri | Presentasi ke juri, mitra, sponsor |
| **Design Brief & Design System v2.0** | Fondasi brand, sistem warna lengkap, tipografi, komponen, audio-haptic, checklist WCAG | Sebelum membuka Figma |
| **Konsep Desain UI v2.0** (HTML interaktif) | 31 layar, prototipe alur, toggle kontras ekstrem | Saat mengimplementasikan layar |
| **PRD ini** | Spesifikasi fungsional, teknis, data, kontrak, QA | Sumber kebenaran selama implementasi |

---

*Dokumen ini adalah sumber kebenaran untuk implementasi NetraSense. Setiap perubahan ruang lingkup wajib dicatat sebagai revisi bernomor beserta alasannya.*
