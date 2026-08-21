```
D E S I G N B R I E F & D E S I G N S Y S T E M — V 2 . 0
```

### **NetraSense**

# **Desain yang bekerja saat tidak dilihat.**

Fondasi brand, sistem warna terverifikasi kontras, tipografi, komponen, serta sistem audio dan haptic untuk NetraSense — produk yang audiens intinya tidak akan pernah melihat antarmukanya.

> Referensi normatif: dokumen ini adalah versi eksekusi dari **PRD.md § 21 (Spesifikasi desain dan design token)** dan **§ 22 (Spesifikasi audio dan haptic)**. Bila ada perbedaan angka, PRD.md yang menang.

**Satu kalimat yang harus dipegang seluruh tim desain:** di produk ini, **antarmuka visual adalah antarmuka sekunder.** Antarmuka utamanya adalah suara dan getaran. Setiap keputusan visual yang mengorbankan kejelasan audio atau haptic adalah keputusan yang salah, betapa pun bagusnya di portofolio.

---

## 1. Apa yang dirancang, dan untuk siapa

### 1.1 Ringkasan penugasan

Sistem desain lengkap untuk NetraSense: aplikasi mobile untuk penyandang tunanetra dan low vision, aplikasi kontributor untuk relawan awas, dan web dApp untuk klaim imbalan serta governance. Sistem mencakup identitas visual, sistem warna, tipografi, komponen, dan — yang paling menentukan — sistem audio dan haptic.

### 1.2 Tiga audiens, tiga kebutuhan yang bertabrakan

| Audiens | Kebutuhan desain | Implikasi |
|---|---|---|
| **Tunanetra total** | Antarmuka non-visual penuh, navigasi pembaca layar, gestur besar dan sederhana | Layout harus punya urutan fokus yang logis; visual boleh minimal karena tidak dilihat |
| **Low vision** | Kontras ekstrem, teks besar, target sentuh besar, warna yang tidak bergantung persepsi halus | Ini yang mendorong seluruh keputusan visual. Segmen terbesar dan paling sering diabaikan |
| **Kontributor & sponsor (awas)** | Antarmuka informasi padat, data, peta, dasbor, elemen kompetitif | Butuh ekspresi visual berbeda — diselesaikan lewat sub-brand, bukan lewat kompromi |

### 1.3 Ketegangan utama dan cara menyelesaikannya

Desain yang optimal untuk low vision terasa kasar dan tidak modern bagi mata awas. Desain yang terasa canggih bagi mata awas hampir selalu tidak terbaca bagi low vision.

**Solusinya bukan kompromi di tengah.** NetraSense memakai dua ekspresi dari satu fondasi: aplikasi pengguna berjalan pada standar kontras AAA tanpa negosiasi, sementara web dApp kontributor dan materi pemasaran memakai palet yang sama dengan kebebasan visual yang lebih besar. Warna, tipografi, dan simbolnya identik — hanya kepadatan dan halusnya yang berbeda.

Setiap angka di dokumen ini — rasio kontras, ukuran target sentuh, durasi getar — berasal dari kebutuhan fungsional yang bisa diuji. Jika sebuah keputusan desain tidak bisa dijelaskan dengan alasan fungsional, keputusan itu belum selesai.

---

## 2. Fondasi Brand

### 2.1 Nama

**Netra** berarti mata atau penglihatan — kata serapan Sanskerta yang hidup dan dipahami luas dalam bahasa Indonesia, termasuk dalam kata "tunanetra". **Sense** membawa dua makna sekaligus: indra, dan proses penginderaan oleh mesin. Gabungannya menyatakan inti produk: *indra penglihatan yang dipinjamkan*.

### 2.2 Positioning

**Untuk penyandang tunanetra dan low vision yang ingin bergerak sendiri dengan percaya diri, NetraSense adalah indra kedua yang berjalan di ruang yang tidak terjangkau tongkat — didukung peta aksesibilitas yang dibangun dan dimiliki komunitasnya sendiri.**

Berbeda dari aplikasi AI vision yang menunggu ditanya, NetraSense bekerja lebih dulu, terus-menerus, dan tetap berfungsi saat sinyal hilang.

### 2.3 Kepribadian brand

| Adalah | Bukan | Karena |
|---|---|---|
| **Tenang** | Dramatis, mendesak terus-menerus | Panik menular lewat suara; pengguna sedang berada di jalan raya |
| **Presisi** | Kabur, sok ramah, berbunga-bunga | "Ada sesuatu di depan" tidak berguna. "Tiang, dua langkah, kanan" berguna |
| **Hormat** | Mengasihani, inspiratif secara patronizing | Pengguna adalah orang dewasa yang kompeten, bukan objek amal |
| **Andal** | Eksperimental, "beta" terus-menerus | Ini alat keselamatan; kesan rapuh menghancurkan adopsi |
| **Terbuka** | Tertutup, korporat, penuh jargon | Datanya barang publik; brand-nya harus terasa seperti barang publik juga |

### 2.4 Tone of voice

**Lakukan:** kalimat pendek, kata kerja di depan ("Belok kanan sekarang"); sebut jarak dalam langkah untuk jarak dekat; sebut arah relatif terhadap badan (kiri/kanan/depan); akui ketidakpastian ("Sepertinya pintu masuk, saya tidak yakin"); Bahasa Indonesia sehari-hari, tanpa istilah teknis.

**Hindari:** nada merendahkan ("Hebat! Kamu berhasil menyeberang!"); kata "penderita", "korban", "menderita kebutaan"; arah mata angin (utara/selatan) untuk panduan langkah; jargon ("obstacle detected", "confidence 0.87"); basa-basi di tengah perjalanan — setiap kata memakan waktu.

**Terminologi resmi:** gunakan **"penyandang tunanetra"** atau **"teman tunanetra"** dalam komunikasi Indonesia; *blind and low-vision users* dalam komunikasi Inggris. Hindari "difabel netra" kecuali komunitas mitra memakainya lebih dulu. Prinsipnya: ikuti istilah yang dipakai organisasi penyandang disabilitas mitra, bukan istilah yang terasa paling nyaman bagi tim.

---

## 3. Logo & identitas visual

### 3.1 Konsep simbol

Simbol NetraSense adalah **"The Aperture"** — bentuk kotak dengan sudut sangat tumpul (superellipse) berisi lingkaran padat di tengah. Tiga pembacaan sekaligus, dan semuanya benar: **pupil** (mata yang meminjamkan penglihatan), **titik pada peta** (satu titik data aksesibilitas di jaringan), **sumber suara** (pusat gelombang audio spasial yang memancar).

Bentuknya sengaja sangat sederhana: harus tetap terbaca pada ukuran 16 px di bilah status, harus bekerja dalam satu warna, dan harus bisa dicetak timbul atau Braille pada kemasan perangkat keras di masa depan.

### 3.2 Konstruksi

- **Grid** — kanvas 32×32 unit, radius sudut 8 unit, diameter lingkaran dalam 12 unit, tepat di pusat optis.
- **Clear space** — ruang kosong minimum di seluruh sisi setara dengan diameter lingkaran dalam. Tidak ada elemen apa pun boleh masuk area ini.
- **Ukuran minimum** — 16 px untuk simbol saja pada layar; 24 px untuk lockup dengan wordmark; 8 mm untuk cetak.
- **Wordmark** — "Netra" dengan Space Grotesk Bold, "Sense" dengan warna Amber Deep di latar terang atau Amber di latar gelap.

### 3.3 Penyalahgunaan

**Boleh:** simbol saja tanpa wordmark pada ruang sempit; satu warna penuh untuk sablon/timbul/faks; Amber di atas Ink atau Ink di atas Amber; diperbesar tanpa batas selama rasio dijaga.

**Dilarang:** gradien, bayangan, atau efek kaca pada simbol; memutar/memiringkan/mengubah rasio; menempatkan di atas foto tanpa lapisan solid; mewarnai dengan warna semantik bahaya (merah/oranye); menambahkan garis luar pada versi solid.

### 3.4 Sub-brand jaringan (Proof-of-Path)

Lapisan jaringan memakai penanda visual terpisah: simbol yang sama dengan lingkaran dalam diganti **titik-titik terhubung**, dan warna Violet menggantikan Amber. Ini menciptakan pemisahan yang jelas antara "aplikasi yang menjaga saya" dan "jaringan yang saya bantu bangun" — dua hubungan emosional yang sangat berbeda dan tidak boleh tertukar.

---

## 21. Spesifikasi desain dan design token

> Bagian ini adalah ringkasan yang dapat dieksekusi (identik dengan PRD.md § 21). Penjelasan lengkap beserta alasan setiap keputusan ada di sisa dokumen ini.

### 21.1 Arah desain

**Terang sebagai mode utama.** Latar kertas hangat, bukan putih steril — putih murni memantulkan cahaya terlalu keras di luar ruangan dan menyulitkan pembaca low vision. Aturan sistem: **warna tua untuk teks, warna cerah untuk bidang isi, dan tidak pernah sebaliknya.**

Mode gelap tetap didukung penuh sebagai preferensi pengguna dan untuk pemakaian malam hari; nilai-nilainya diturunkan dari palet yang sama, bukan dirancang terpisah (lihat 21.2). Mode kontras ekstrem tersedia sebagai pilihan ketiga, tersedia sejak layar pertama, bukan terkubur di menu.

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

**Peran warna:**

| Warna | Peran | Aturan penggunaan |
|---|---|---|
| **Amber** — kuning hangat | Warna utama. Identitas, aksi berenergi, sorotan, logo. | Tidak pernah menjadi teks di mode terang — hanya bidang isi dengan Ink di atasnya. Untuk teks, satu-satunya bentuk sah adalah Amber Deep. |
| **Teal** — biru kehijauan | Lapisan informasi, overlay AR, jalur rute, tautan. | Tidak pernah dipakai untuk peringatan bahaya. Warna "sistem sedang bekerja", bukan "hati-hati". |
| **Violet** — ungu | Seluruh lapisan Web3: kontribusi, imbalan, dompet, governance. | Pemisah dunia — kapan pun pengguna melihat Violet, ia sedang berada di lapisan jaringan, bukan lapisan keselamatan. |

**Warna semantik status jalur** — warna tidak pernah menjadi satu-satunya pembawa makna; setiap status membawa tiga penanda sekaligus:

| Status | Warna | Bentuk ikon | Haptic |
|---|---|---|---|
| Aman | Green | Lingkaran | Tidak ada — keheningan |
| Waspada | Orange | Segitiga | Denyut ganda lembut |
| Kritis | Red | Oktagon | Getar panjang tajam 400 ms |
| Informasi | Teal | Persegi | Ketukan tunggal ringan |

**Mode gelap** (nilai diturunkan dari palet terang, bukan dirancang terpisah):

| Token | Terang (baku) | Gelap | Rasio di mode gelap |
|---|---|---|---|
| Latar | `#FBFAF7` | `#0D1420` | — |
| Teks utama | `#14181F` | `#F2F5F9` | 16,88:1 · AAA |
| Aksi utama | `#14181F` isi | `#FFC53D` | 11,69:1 · AAA |
| Bahaya | `#8F1F1F` teks | `#FF8080` | 7,60:1 · AAA |
| Jaringan | `#4B33A8` teks | `#B49CFC` | 8,00:1 · AAA |

**Mode kontras ekstrem** — seluruh tint hilang, setiap elemen mendapat garis tepi solid, tebal huruf minimum naik ke Bold, gradien/transparansi/bayangan dinonaktifkan tanpa pengecualian:

| Elemen | Terang | Kontras ekstrem | Rasio |
|---|---|---|---|
| Latar | `#FBFAF7` | `#FFFFFF` | — |
| Teks utama | `#14181F` | `#000000` | 21,00:1 |
| Garis | `#E6E2DA` 1px | `#000000` 2px | 21,00:1 |
| Bahaya | `#8F1F1F` | `#B00000` | 8,89:1 + ikon + haptic |

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

**Tiga typeface, tiga tugas:**

- **Atkinson Hyperlegible** (teks antarmuka & isi) — dirancang Braille Institute khusus untuk pembaca low vision; huruf yang paling sering tertukar (Il1, O0, bdpq, ceo) dibuat semaksimal mungkin berbeda. Pilihan fungsional yang dapat dipertahankan, bukan selera. Tersedia gratis dengan lisensi terbuka.
- **Space Grotesk** (judul, angka besar, wordmark) — memberi karakter teknologi kontemporer pada materi presentasi dan web dApp. **Tidak pernah dipakai untuk teks panjang di aplikasi pengguna** — hanya judul pendek, angka statistik, dan materi yang audiensnya awas.
- **JetBrains Mono** (data, koordinat, hash, kode) — nilai teknis yang membutuhkan lebar tetap: koordinat, alamat dompet terpotong, jumlah token, hash transaksi.

**Lakukan:** dukung penskalaan font sistem sampai 200% tanpa layout rusak; rata kiri untuk seluruh teks — selalu; panjang baris maksimum 60 karakter; jarak antar paragraf minimal 1,5× tinggi baris.

**Hindari:** HURUF KAPITAL SEMUA untuk teks lebih dari dua kata; rata tengah/kanan-kiri pada isi; teks di atas foto atau gradien tanpa lapisan solid; weight Light atau Thin di mana pun; teks berjalan/berkedip/beranimasi; ikon tanpa label teks pada aksi utama.

### 21.4 Token spasi dan target sentuh

```
spacing scale (dp) : 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96
radius (dp)        : sm 12 · md 14 · lg 24
touch target       : aksi utama ≥88 · aksi lain ≥64 · jarak antar target ≥16
padding tepi layar : 24 (naik ke 32 pada layar >6,5 inci)
```

Basis 4 dp. Nilai di luar skala ini tidak boleh muncul di kode produksi.

| Konteks | Nilai | Catatan |
|---|---|---|
| Padding tepi layar | 24 dp | Naik ke 32 dp pada layar >6,5 inci |
| Jarak antar kartu | 16 dp | Cukup untuk dibedakan lewat sentuhan saja |
| Jarak antar target sentuh | 16 dp minimum | Mencegah salah tekan pada jari yang tidak dipandu mata |
| Padding dalam kartu | 20–24 dp | Ruang bernapas untuk teks berukuran besar |

**64 dp — bukan 48 dp.** Panduan aksesibilitas arus utama menetapkan minimum 48 dp. NetraSense menetapkan **64 dp** sebagai standar, dan **88 dp** untuk aksi utama, karena penggunanya tidak dapat mengoreksi tekanan yang meleset dengan melihat.

- **Aksi utama** (mulai navigasi, panggil bantuan, laporkan bahaya) — minimal 88 dp tinggi, lebar penuh.
- **Aksi sekunder** — minimal 64 dp.
- **Zona ibu jari** — seluruh aksi yang mungkin dipakai sambil berjalan wajib berada di sepertiga bawah layar.
- **Gestur global** — ketuk dua jari = hentikan panduan/potong ucapan; usap tiga jari = ulangi instruksi terakhir; guncang perangkat = panggil bantuan darurat. Berlaku di seluruh aplikasi tanpa perlu menemukan tombol.

Hanya satu informasi utama per layar. Kepadatan informasi yang normal di aplikasi lain adalah kegagalan desain di sini — pengguna sedang berjalan, dan perhatian visual mereka bukan sumber daya yang bisa diandalkan.

### 21.5 Komponen dan state wajib

Setiap komponen interaktif wajib mendefinisikan **enam state**: default, focused, pressed, loading, disabled, success. Setiap state wajib punya padanan non-visual (pengumuman pembaca layar atau umpan balik haptic).

| Komponen | Varian | Catatan |
|---|---|---|
| **Button** | primary (Ink), amber, ghost, danger (Red), network (Violet) | Satu primary per layar; danger hanya untuk bahaya, tidak untuk hapus |
| **Hazard Alert** | kritis | Tanpa tombol tutup, tanpa animasi masuk, maksimum dua baris teks |
| **Route Card** | terpilih / tidak | Skor aksesibilitas lebih menonjol daripada jarak |
| **Contribution Tile** | default / aktif | Aksen Violet penuh |
| **Wallet Sheet** | — | Tanpa satu pun istilah kripto (lihat § 21.6 dan CONTEXT.md) |
| **Voice Orb** | idle / mendengarkan | Satu-satunya animasi berulang yang diizinkan; berhenti saat reduce-motion |
| **Toggle, Slider, Bottom Sheet, Nav Bar** | — | Target ≥64 dp |
| **Input teks** | default, focused, error, disabled | Label selalu terlihat (bukan hanya placeholder); error diumumkan pembaca layar segera, disertai teks dan ikon |
| **Badge / status pill** | aman, waspada, kritis, informasi, netral | Bentuk ikon tetap per kelas (§ 21.2); tidak pernah warna saja |

State tombol secara rinci:

| State | Perubahan visual | Umpan balik non-visual |
|---|---|---|
| Default | — | — |
| Focused | Cincin fokus Ink 3 px, jarak 2 px | Pembaca layar menyebut label + peran |
| Pressed | Skala 0,97 · kecerahan −8% | Ketukan haptic ringan seketika |
| Loading | Label diganti indikator progres | Pengumuman "sedang memproses" sekali saja |
| Disabled | Opasitas 40%, tanpa perubahan warna semantik | Status dinonaktifkan diumumkan pembaca layar |
| Success | Kilas Green Tint 400 ms lalu kembali | Earcon `confirm` + haptic `double` |

**Hazard Alert** (komponen paling penting di sistem) — lapisan penuh di atas segala hal, muncul seketika tanpa animasi masuk; struktur: ikon oktagon 64 dp, jenis bahaya (`display` 40 sp), jarak dalam langkah, arah relatif badan; latar Red Deep penuh, teks putih, tanpa elemen lain di layar; audio memotong seluruh antrean dan tidak dapat diredam mode senyap; haptic `longSharp`, berulang sampai bahaya keluar dari jalur; **tanpa tombol tutup** — hilang sendiri ketika bahaya tidak lagi relevan.

**Radius sudut:** 12 dp elemen kecil, 14–16 dp tombol, 24 dp kartu dan lembar bawah. Bayangan dipakai sangat hemat — kedalaman disampaikan lewat perbedaan permukaan (Paper → Surface → Alt) dan garis 1px, bukan bayangan bertumpuk.

### 21.6 Aturan desain yang tidak dapat dinegosiasikan

1. **Keheningan adalah default** — antarmuka tidak mengumumkan dirinya.
2. **Bahaya punya bahasa sendiri** — warna, bentuk, suara, dan getaran yang tidak dipakai elemen lain mana pun.
3. **Setiap informasi kritis hadir di minimal dua kanal indra.**
4. **Ukuran mengalahkan kerapian** — target sentuh selalu menang atas komposisi.
5. **Rancang untuk trotoar jam lima sore, bukan untuk ruangan demo.**

**Uji cepat untuk setiap layar:** matikan layar. Bisakah tugas ini diselesaikan hanya dengan pembaca layar dan getaran? Jika jawabannya tidak, layar itu belum selesai — sebagus apa pun tampilannya.

---

## 4. Ikonografi

**Gaya** — garis tebal 2,5 px pada kanvas 24, sudut membulat, tanpa detail halus. Siluet harus tetap dikenali saat diperkecil menjadi 40% atau diburamkan (uji buram: buramkan 8 px, apakah masih bisa dibedakan dari ikon lain di layar yang sama?).

**Ukuran** — 32 dp baku di aplikasi pengguna, 24 dp di web dApp. Tidak pernah di bawah 24 dp.

**Label wajib** — setiap ikon aksi disertai label teks. Ikon tanpa teks hanya diizinkan pada elemen dekoratif bertanda `aria-hidden`.

**Bentuk membawa makna** — kelas bahaya memiliki bentuk kontainer tetap: lingkaran aman, segitiga waspada, oktagon kritis, persegi informasi (lihat 21.2). Pengguna dapat mengenali kelas bahaya tanpa membedakan warna sama sekali.

**Ikon inti:** Navigasi (rute, belok kiri/kanan, menyeberang, tangga naik/turun, ramp, ubin pemandu, tujuan) · Bahaya (tiang, lubang, bahaya kepala, kendaraan, permukaan licin, galian, jalur tertutup) · Jaringan (kontribusi, validasi, imbalan, dompet, peta jaringan, governance, lencana).

---

## 22. Spesifikasi audio dan haptic

> Bagi sebagian besar pengguna, inilah satu-satunya antarmuka yang benar-benar mereka alami. Bagian ini setara pentingnya dengan seluruh bagian visual — idealnya lebih penting.

### 22.1 Prinsip

| Prinsip | Konsekuensi teknis |
|---|---|
| Jangan pernah menutup telinga | Wajib bone conduction / open-ear; peredam bising dilarang di seluruh alur produk termasuk rekomendasi perangkat |
| Earcon sebelum kata | Nada pendek menyampaikan kelas informasi dalam 200 ms; ucapan menyusul hanya bila perlu detail |
| Ruang membawa arah | Panning HRTF memposisikan sumber suara pada arah objek sebenarnya |
| Tempo membawa jarak | Interval antar denyut memendek saat jarak mengecil |
| Nada membawa ketinggian | Frekuensi rendah untuk bahaya permukaan, tinggi untuk bahaya setinggi kepala |

### 22.2 Pustaka earcon

| Earcon | Karakter | Durasi | Rentang frekuensi | Makna — apa yang dikomunikasikan dan kapan berbunyi |
|---|---|---|---|---|
| `clear` | Dua nada naik, lembut | 180 ms | 700–900 Hz | Jalur di depan bersih. Dibunyikan **hemat, hanya saat keluar dari zona bahaya** — tidak pernah berkala, tidak pernah sebagai konfirmasi rutin. |
| `proximity` | Denyut tunggal, tempo naik | 80 ms | 500 Hz | Objek mendekat; panning stereo/HRTF menunjukkan arah objek sebenarnya. Berbunyi selama objek kelas Waspada berada dalam radius peringatan. |
| `overhead` | Dua nada tinggi cepat | 160 ms | 1800–2200 Hz | Bahaya setinggi kepala (dahan, papan reklame, kanopi, kabel, spion). Pola khusus, tidak dipakai kelas lain — memberi tahu pengguna untuk merunduk, bukan berhenti. |
| `critical` | Nada rendah tajam, berulang | 240 ms | 400 Hz | Berhenti sekarang. Memotong seluruh antrean audio; berbunyi berulang selama bahaya kritis masih di jalur. |
| `turn` | Nada meluncur ke arah belokan | 200 ms | 800→1200 Hz | Instruksi belok; kontur nada mengikuti arah belokan (naik untuk kanan, turun untuk kiri, atau sebaliknya sesuai konvensi produk). |
| `confirm` | Nada tunggal hangat | 120 ms | 1000 Hz | Aksi berhasil (mis. laporan bahaya terkirim, pengaturan tersimpan). |
| `contribution` | Tiga nada naik | 300 ms | 900–1400 Hz | Data tervalidasi — satu-satunya earcon "menyenangkan" di sistem; hanya untuk lapisan kontributor/jaringan, tidak pernah untuk keselamatan. |

Seluruh earcon berada pada rentang 400–2.500 Hz agar tetap terdengar di kebisingan lalu lintas kota tanpa volume tinggi, dan tidak bertabrakan dengan frekuensi suara manusia.

### 22.3 Pustaka haptic

| Pola | Bentuk getar | Makna |
|---|---|---|
| `tap` | 1 × 30 ms ringan | Konfirmasi sentuhan, elemen fokus |
| `double` | 2 × 40 ms, jeda 80 ms | Instruksi belok |
| `sharpDouble` (Sharp Double) | 2 × 60 ms tajam, jeda 60 ms | Bahaya setinggi kepala |
| `ramp` | Intensitas naik bertahap | Mendekati rintangan (kelas Waspada) |
| `longSharp` (Long Sharp) | 1 × 400 ms intensitas penuh | **Berhenti — bahaya kritis** |
| `tripleSoft` (Triple Soft) | 3 × 30 ms lembut | Kontribusi tervalidasi, imbalan diterima |

**Aturan mutlak.** Pola `longSharp` tidak pernah dipakai untuk apa pun selain bahaya kritis — tidak untuk notifikasi, tidak untuk error, tidak untuk pesan masuk. Kekuatan sistem ini sepenuhnya bergantung pada kemurnian asosiasi tersebut; satu penggunaan yang salah merusak seluruh sistem kepercayaan.

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
| Kecepatan bicara baku | 1,3× normal, dapat diatur 0,8×–3,0× (pengguna berpengalaman umumnya jauh di atas dugaan tim desain) |
| Karakter suara | Netral dan tenang; hindari suara terlalu ceria atau bernapas berlebihan |
| Interupsi | Ketukan dua jari memotong ucapan kapan saja, tanpa menunggu kalimat selesai |
| Bahasa | Bahasa Indonesia baku; istilah lokal untuk nama tempat |
| Panjang kalimat | Maksimum 12 kata per instruksi navigasi |

---

## 5. Motion

| Jenis | Durasi | Easing & catatan |
|---|---|---|
| Umpan balik sentuh | 100 ms | `ease-out` — harus terasa seketika |
| Transisi elemen | 200 ms | `cubic-bezier(.2,0,0,1)` |
| Transisi layar | 280 ms | Geser horizontal, tanpa efek paralaks |
| Peringatan bahaya | 0 ms | **Tanpa animasi.** Muncul seketika — animasi menunda informasi keselamatan |
| Denyut Voice Orb | 1.400 ms | Berulang halus; berhenti saat reduce-motion aktif |

**Reduce motion adalah default, bukan opsi.** Sebagian pengguna low vision mengalami pusing atau disorientasi akibat gerakan layar. NetraSense menghormati `prefers-reduced-motion` secara penuh: seluruh transisi berubah menjadi *cross-fade* 100 ms, dan setiap animasi berulang berhenti sepenuhnya. Tidak ada satu pun animasi yang membawa informasi yang tidak tersedia di kanal lain.

---

## 6. Checklist aksesibilitas

Target kepatuhan: **WCAG 2.2 Level AA sebagai batas minimum, Level AAA sebagai target untuk seluruh elemen teks dan kontras**, ditambah aturan khusus produk di luar standar:

| ✓ | Kriteria | Standar NetraSense |
|---|---|---|
| ☐ | Kontras teks | ≥7:1 seluruh teks isi (AAA), ≥4,5:1 teks besar |
| ☐ | Kontras elemen non-teks | ≥3:1 untuk seluruh ikon, garis, dan indikator state |
| ☐ | Target sentuh | ≥64 dp (standar WCAG: 24 dp) · aksi utama ≥88 dp |
| ☐ | Penskalaan teks | 200% tanpa kehilangan konten atau fungsi |
| ☐ | Indikator fokus | Cincin 3 px, kontras ≥3:1 terhadap latar sekitarnya |
| ☐ | Warna sebagai satu-satunya penanda | Nol pelanggaran — setiap status punya bentuk + teks |
| ☐ | Label pembaca layar | Ditulis manual untuk 100% elemen interaktif |
| ☐ | Urutan fokus | Logis dan diuji dengan TalkBack pada setiap layar |
| ☐ | Alternatif gestur | Setiap gestur punya alternatif tombol yang setara |
| ☐ | Batas waktu | Tidak ada batas waktu pada aksi apa pun |
| ☐ | Umpan balik multi-kanal | Setiap peringatan hadir di audio, haptic, dan visual |
| ☐ | Uji pengguna nyata | Setiap rilis diuji minimal 3 pengguna tunanetra |

Baris terakhir adalah yang paling penting dan yang paling sering dilewati. Checklist otomatis tidak dapat menangkap masalah yang hanya muncul saat seseorang benar-benar berjalan di trotoar dengan produk ini.

---

## 7. Web dApp kontributor — audiens berbeda, ekspresi berbeda

Kondisi pemakaian berbeda dari aplikasi pengguna utama, dan karena itu ekspresi visual yang berbeda — tetapi dari fondasi warna dan tipografi yang persis sama.

| Aspek | Aplikasi pengguna | Web dApp kontributor |
|---|---|---|
| Aksen utama | Amber (kuning) | Violet (ungu) |
| Kepadatan | Satu informasi utama per layar | Dasbor padat, tabel, peta interaktif |
| Ukuran isi | 20 sp | 16 px |
| Typeface judul | Atkinson Hyperlegible | Space Grotesk |
| Mode | Terang baku · gelap & kontras ekstrem sebagai pilihan | Terang baku, mengikuti sistem |
| Nada | Tenang, presisi, sedikit kata | Energik, kompetitif, berorientasi progres |
| Motion | Minimal, fungsional | Lebih ekspresif — perayaan pencapaian diizinkan |

**Yang tetap sama di kedua dunia:** nilai warna yang sama persis, keluarga typeface yang sama, sistem ikon yang sama, dan standar kontras minimum yang sama. Web dApp boleh lebih padat dan lebih ekspresif — tetapi tidak boleh kurang dapat diakses. Kontributor pun bisa memiliki gangguan penglihatan.

**Halaman inti:** peta jaringan (visualisasi cakupan data publik, juga aset pemasaran terkuat proyek), dasbor kontributor (km terpetakan, tingkat kelolosan validasi, imbalan tertunda/terklaim, lencana), papan peringkat (per kampus/kota/bulan, berbasis kontribusi tervalidasi bukan volume mentah), governance (proposal aktif, hasil voting, kuota suara organisasi disabilitas ditampilkan terbuka), dasbor sponsor (progres kampanye, laporan dampak dapat diaudit, tautan verifikasi on-chain).

---

## 8. Aplikasi brand & serah terima ke engineering

| Media | Spesifikasi |
|---|---|
| **App icon** | Simbol Amber di atas Ink, radius mengikuti platform. Wajib lolos uji: masih dikenali saat diperkecil ke 40 px dan diburamkan. |
| **Splash screen** | Latar Amber, simbol Ink di tengah, tanpa teks. Durasi maksimum 1,2 detik — pengumuman suara pertama dimulai *sebelum* splash selesai. |
| **Deck presentasi** | Latar Paper, judul Space Grotesk 44 pt, aksen Amber, slide pembatas berlatar Ink. Maksimum satu gagasan per slide. |
| **Media sosial** | Latar terang, teks besar, kontras tinggi. Seluruh gambar wajib memiliki teks alternatif; seluruh video wajib bertakarir. |
| **Dokumen** | Mode terang, Atkinson Hyperlegible untuk isi, aksen Amber Deep untuk penanda. |

**Checklist serah terima ke engineering:** token warna diekspor sebagai JSON dengan ketiga mode (terang, gelap, kontras ekstrem) · skala tipe terdokumentasi dengan nilai sp, bukan px · seluruh komponen memiliki dokumentasi state lengkap (§ 21.5) · label pembaca layar tertulis untuk setiap elemen interaktif · berkas audio earcon (WAV 48 kHz) terlampir · pola haptic terdokumentasi dalam milidetik dan intensitas (§ 22.3) · hasil uji kontras terlampir sebagai lampiran yang dapat diverifikasi ulang · prototipe alur kritis dapat dijalankan dengan pembaca layar aktif.

---

**Pengingat terakhir untuk tim desain:** produk ini akan dinilai bukan dari seberapa bagus tangkapan layarnya, melainkan dari apakah seseorang berhasil pulang dengan selamat sambil memakainya. Setiap kali ada pilihan antara terlihat mengesankan dan bekerja andal, pilih yang kedua — dan biarkan keandalan itu yang menjadi estetikanya.
