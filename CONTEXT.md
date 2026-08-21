# NetraSense — Context & Domain Glossary

A living glossary and context reference for the NetraSense project. Use these terms exactly as defined here; don't swap in synonyms. Source: PRD.md §4 (Persona dan konteks pemakaian) and §5 (Glosarium — memahami dApp tanpa jargon).

## 1. Personas (PRD §4)

### P1 — Ratna, 34 · tunanetra total · pekerja kantoran

- **Konteks:** berangkat kerja sendiri setiap pagi, rute yang sama, ingin berhenti bergantung pada antaran keluarga.
- **Perangkat:** Android kelas menengah, headphone bone conduction, tongkat putih.
- **Kemampuan teknologi:** mahir TalkBack, memakai kecepatan bicara 2,0–2,5×, tidak sabar dengan aplikasi yang bertele-tele.
- **Kebutuhan utama:** peringatan bahaya setinggi kepala; panduan arah tanpa harus menerjemahkan instruksi verbal.
- **Churn trigger:** peringatan palsu berulang, aplikasi yang bicara terus, baterai habis sebelum sampai rumah.

### P2 — Bagus, 58 · low vision · pensiunan

- **Konteks:** masih melihat bentuk kasar, tidak bisa membaca. Jarang bepergian jauh.
- **Kebutuhan utama:** membaca label obat, memeriksa nominal uang kembalian, membaca menu warung.
- **Catatan penting:** Bagus hampir tidak pernah memakai fitur navigasi. Bagi dia NetraSense adalah alat kemandirian harian, bukan alat mobilitas. **Segmen ini lebih besar dari segmen tunanetra total dan paling sering diabaikan pesaing.**
- **Churn trigger:** teks terlalu kecil, kontras kurang, tombol terlalu rapat.

### P3 — Dinda, 20 · mahasiswa awas · kontributor

- **Konteks:** butuh jam pengabdian masyarakat, aktif di organisasi kampus, tertarik teknologi.
- **Motivasi (dalam urutan ini):** pengakuan sosial → jam pengabdian → penghasilan tambahan kecil.
- **Kebutuhan utama:** misi yang jelas, imbalan yang transparan sebelum berangkat, bukti kontribusi yang bisa dicantumkan di CV.
- **Churn trigger:** validasi yang tidak transparan, imbalan yang berubah tanpa penjelasan, aplikasi yang boros baterai saat merekam.

### P4 — Ibu Sari, 45 · manajer CSR bank daerah · sponsor

- **Konteks:** mengelola anggaran CSR triwulanan, harus melaporkan dampak ke direksi dan auditor.
- **Kebutuhan utama:** bukti dampak yang dapat diverifikasi pihak ketiga, bukan foto seremonial.
- **Deal-breaker:** laporan yang hanya bisa dipercaya kalau memercayai tim NetraSense (butuh verifikasi independen, bukan klaim internal).

## 2. Kondisi pemakaian acuan (PRD §4.5)

Seluruh keputusan desain dan teknis diuji terhadap kondisi ini, bukan terhadap ruangan demo:

> **Trotoar Denpasar pukul lima sore.** Matahari rendah dan menyilaukan. Lalu lintas bising 70–80 dB. Satu tangan memegang tongkat, satu tangan memegang tas. Ponsel di saku atau penyangga dada. Baterai 20%. Sinyal seluler tidak stabil.

Setiap fitur, layar, dan spesifikasi audio/haptic harus lolos uji ini: silau matahari (kontras visual tidak boleh diandalkan), kebisingan jalan (audio harus tetap terdengar tanpa menutup telinga), tangan penuh (target sentuh besar, gestur global tanpa perlu mencari tombol), baterai rendah (hemat daya adaptif), dan konektivitas buruk (fallback offline / mode demo cache).

## 3. Web3 tanpa jargon (PRD §5) — glosarium untuk pembaca non-teknis

> Ditulis untuk siapa pun yang belum familier dengan Web3. Setelah membaca ini, seluruh bagian teknis blockchain di PRD jauh lebih mudah diikuti.

**Analogi induk:** bayangkan buku catatan besar berisi daftar hambatan di trotoar seluruh kota. Dalam sistem biasa, buku itu disimpan di satu lemari milik satu perusahaan — kalau perusahaannya tutup atau berbohong, tidak ada yang bisa membuktikannya. **Blockchain adalah buku catatan yang salinannya dipegang ribuan komputer sekaligus**: setiap catatan baru diperbarui di semua salinan, dan tidak ada satu pihak yang bisa diam-diam menghapus atau mengubah baris lama. Sisanya adalah detail teknis.

| Istilah | Penjelasan sederhana | Perannya di NetraSense |
|---|---|---|
| **Blockchain / chain** | Buku catatan bersama yang tidak bisa diubah diam-diam | Menyimpan bukti bahwa satu titik data benar-benar dikirim, divalidasi, dan diberi imbalan |
| **On-chain** | Data yang ditulis ke buku catatan bersama | Hanya ringkasan dan bukti — bukan data mentah, karena mahal |
| **Off-chain** | Data yang disimpan di server biasa | Detail titik data, tile peta, gambar — murah dan cepat dibaca |
| **Smart contract** | Program kecil di dalam buku catatan yang berjalan otomatis mengikuti aturan yang ditulis di dalamnya | Menghitung imbalan, mencatat validasi, mencairkan dana sponsor saat target tercapai |
| **Wallet / dompet kripto** | Identitas digital pengguna di jaringan, sekaligus tempat menyimpan saldo | **Istilah internal saja.** Di UI pengguna disebut **"kunci di ponsel"**; dibuat otomatis dan dikunci sidik jari — pengguna tidak pernah melihatnya sebagai "dompet kripto" |
| **Seed phrase** | 12–24 kata rahasia yang menjadi kunci dompet. Hilang = saldo hilang selamanya | **Tidak dipakai di NetraSense, sama sekali.** Bagi pengguna tunanetra, menghafal dan mengetik 12 kata rahasia adalah hambatan aksesibilitas yang absurd |
| **Passkey** | Kunci yang tersimpan aman di ponsel dan dibuka dengan sidik jari atau wajah | Pengganti seed phrase. Di UI disebut **"sidik jari"** / **"konfirmasi dengan sidik jari"** — pengguna cukup menempelkan jari |
| **Gas fee** | Biaya kecil yang dibayar setiap kali menulis ke buku catatan | Ditanggung sistem lewat *paymaster*; pengguna tidak pernah membayar dan tidak pernah tahu ada biaya |
| **Paymaster** | Layanan yang membayarkan gas fee atas nama pengguna | Membuat aplikasi terasa seperti aplikasi biasa, bukan aplikasi kripto |
| **Account Abstraction** | Teknologi yang memungkinkan dompet dibuka dengan sidik jari dan dipulihkan lewat kontak tepercaya, bukan lewat seed phrase | Fondasi teknis seluruh pengalaman "kunci di ponsel" NetraSense |
| **Token** | Satuan nilai yang dicatat di buku catatan bersama | `$NETRA` — dipakai sebagai imbalan kontribusi dan hak suara. Di UI pengguna disebut **"poin kontribusi"**, tidak pernah "token" atau "koin kripto" |
| **DePIN** (*Decentralized Physical Infrastructure Network*) | Jaringan orang yang mengumpulkan data dunia nyata dan diberi imbalan | Model dasar jaringan Proof-of-Path |
| **DAO** | Kelompok yang mengambil keputusan bersama lewat pemungutan suara yang tercatat di blockchain | Menentukan prioritas kota dan alokasi dana (fitur governance, web dApp) |
| **Sybil attack** | Satu orang membuat ratusan akun palsu untuk memanen imbalan | Ancaman utama jaringan; ditangani dengan enam lapis pertahanan (PRD §12.4) |
| **Slashing** | Menyita jaminan seseorang karena terbukti berbuat curang | Mekanisme hukuman untuk validator yang meloloskan data palsu |
| **Attestation** | Catatan resmi di blockchain yang menyatakan "hal ini sudah diverifikasi" | Bukti bahwa satu titik data lolos validasi. Tidak menyimpan koordinat presisi |
| **Testnet / Mainnet** | Testnet = jaringan latihan dengan uang mainan. Mainnet = jaringan sungguhan | MVP hackathon (R0) berjalan di testnet; mainnet mulai R2 |
| **dApp** | Aplikasi yang sebagian logikanya berjalan di smart contract, bukan hanya di server perusahaan | Web dApp NetraSense = tempat klaim imbalan, voting, dan dasbor sponsor |
| **Soulbound token (SBT)** | Lencana digital yang tidak bisa dijual atau dipindahkan | Lencana kontributor — nilainya justru karena tidak bisa dibeli |
| **IPFS / storage terdesentralisasi** | Tempat menyimpan berkas besar secara tersebar, bukan di satu server | Menyimpan blob data pemetaan; hanya sidik jari (hash) yang ditulis on-chain |
| **Hash** | Sidik jari digital sebuah berkas — berubah satu huruf, sidik jarinya berubah total | Cara membuktikan berkas tidak diubah tanpa harus menyimpan berkasnya di blockchain |

### Kesalahpahaman umum

- **"Kalau pakai blockchain, semua data disimpan di blockchain."** Salah — kesalahan desain paling mahal. NetraSense menulis **hanya hash dan ringkasan** on-chain; data itu sendiri hidup di storage biasa (off-chain).
- **"Pengguna harus punya kripto dulu."** Tidak. Pengguna tunanetra tidak pernah menyentuh token, tidak pernah membayar, dan tidak pernah melihat kata "blockchain" di antarmuka. Dompet dibuat otomatis di balik layar dan dikunci sidik jari.
- **"Blockchain membuat data otomatis benar."** Salah — penting untuk produk keselamatan. Blockchain hanya menjamin catatan **tidak berubah setelah ditulis**. Kebenaran data dijamin oleh validasi multi-saksi, reputasi, dan slashing (PRD §12.4).
- **"Web3 selalu lebih baik."** Tidak. NetraSense memakai blockchain **hanya untuk lapisan data jaringan**, karena tiga syarat spesifik terpenuhi sekaligus: kontributor tidak terpercaya dan tidak terbatas, data harus tetap hidup meski perusahaan mati, dan pembayaran mikro lintas wilayah tidak mungkin lewat perbankan biasa.

### Peta mental: apa disimpan di mana

```
PONSEL PENGGUNA                SERVER BIASA                 BLOCKCHAIN
(off-chain, privat)            (off-chain, publik)          (on-chain, permanen)
──────────────────             ────────────────             ───────────────────
video mentah          ✗ tidak  detail titik data            hash paket data
model AI                keluar tile peta rute               attestation validasi
lokasi presisi                 indeks pencarian             saldo imbalan
kunci di ponsel (passkey)      cache offline                hasil voting DAO
                                                             komitmen dana sponsor

     paling sensitif  ────────────────────────────────>  paling permanen
     paling murah                                        paling mahal
```

Aturan yang menurunkan seluruh keputusan teknis: **semakin sensitif sebuah data, semakin dekat ia disimpan ke pengguna. Semakin butuh dipercaya publik, semakin dekat ia ditulis ke blockchain.**

### Aturan mutlak — kata terlarang di UI pengguna (PRD §16.3)

Kata **"wallet"/"dompet kripto"**, **"seed phrase"**, **"blockchain"**, **"gas"**, dan **"on-chain"** **tidak pernah muncul di antarmuka pengguna akhir**, dalam aplikasi maupun web dApp kontributor. Gunakan padanan ramah pengguna:

| Jangan (jargon) | Pakai (UI-facing) |
|---|---|
| Wallet / dompet kripto | "Kunci di ponsel" |
| Seed phrase | *(tidak pernah dipakai — dihapus dari alur, diganti passkey)* |
| Passkey / biometric auth | "Sidik jari" / "Konfirmasi dengan sidik jari" |
| Token / $NETRA balance | "Poin kontribusi" |
| Transaction history | "Riwayat" |
| Sign transaction | "Konfirmasi dengan sidik jari" |
| Gas fee | *(tidak pernah disebutkan — ditanggung sistem via paymaster)* |

Kompleksitas teknis Web3 adalah tanggung jawab sistem, bukan beban pengguna. Lihat juga DESIGN.md § 21.5 (Wallet Sheet).

## 4. Domain glossary (produk & jaringan)

### Product layers

| Term | Definition |
|------|------------|
| **SENSE** | The perception layer: real-time obstacle detection, hazard classification, and distance/heading estimation. |
| **GUIDE** | The navigation layer: route selection, turn instructions, and spatial audio guidance. |
| **READ** | The text-recognition layer: OCR, scene description, and currency identification. |
| **BANTU** | The human-assistance layer: volunteer help calls and hazard reporting. |
| **KONTRIB** | The contributor layer: mapping missions, data recording, and validation status. |
| **WEB** | The web dApp layer: public network map, reward claims, governance, and sponsor dashboards. |

### Users / personas

| Term | Definition |
|------|------------|
| **Teman tunanetra** | A person who is blind or has low vision. The primary end user of the SENSE/GUIDE/READ layers. Maps to personas P1 (Ratna) and P2 (Bagus) above. |
| **Kontributor** | A sighted volunteer who collects accessibility data by walking routes. Uses the KONTRIB layer. Maps to persona P3 (Dinda). |
| **Validator** | A trusted contributor who stakes reputation and/or funds to validate data batches. |
| **Sponsor** | An organization (CSR, government) that funds mapping campaigns through the Impact Treasury. Maps to persona P4 (Ibu Sari). |

### Hazard tiers

| Term | Definition |
|------|------------|
| **Kritis** | Life-threatening obstacle (open hole, approaching vehicle). Red octagon, Long Sharp haptic, cuts all audio. |
| **Kepala** | Head-height obstacle (branch, low sign). Amber inverted triangle, Sharp Double haptic. |
| **Waspada** | Caution obstacle (pole, parked bike). Orange triangle, Double haptic. |
| **Aman** | Clear path. Green circle, silence (no audio/haptic). |

### Network concepts

| Term | Definition |
|------|------------|
| **Proof-of-Path Network** | The decentralized data network that records, validates, and rewards contributions of accessibility data. |
| **Observation** | A single accessibility data point captured by a contributor: obstacle type, location, heading, and confidence. |
| **Batch** | A grouped set of observations that are submitted, validated, and attested together. |
| **Attestation** | An on-chain record that a batch's hash has been validated by enough witnesses. Does not store precise coordinates. |
| **Reputation** | A non-transferable contributor score derived from historical accuracy. Gates tier, weight, and reward multiplier. |
| **Poin kontribusi** | The user-facing term for reward balance. Backed by on-chain token ($NETRA) accounting in later releases. Never call this "token" or "crypto" in UI copy. |

### Feedback channels

| Term | Definition |
|------|------------|
| **Earcon** | Short, non-speech audio glyph that conveys a class of information (e.g., Critical, Clear, Turn). See DESIGN.md § 22.2. |
| **Haptic pattern** | A timed vibration pattern that carries meaning without visual or audio (e.g., Long Sharp). See DESIGN.md § 22.3. |
| **Asisten suara** | The voice assistant that gives spoken guidance in Bahasa Indonesia. See DESIGN.md § 22.5. |

### UI / design

| Term | Definition |
|------|------------|
| **Paper** | Default light-mode background color (#FBFAF7). |
| **Ink** | Default text color (#14181F). |
| **Amber** | Primary brand color for actions and the SENSE layer. |
| **Violet** | Network / Web3 layer accent color. |
| **Red / Orange / Green / Teal** | Semantic status colors; never the sole signal for status. |
| **Target sentuh** | Minimum touch target size: 64 dp (88 dp for primary actions). |

---

**Cross-references:** design tokens and component specs referenced above live in `DESIGN.md` §§ 21–22 (which mirrors PRD.md §§ 21–22 verbatim). Full network/security mechanics for terms like Sybil attack and slashing live in PRD.md §12.4.
