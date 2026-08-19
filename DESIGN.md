```
D E S I G N B R I E F & D E S I G N S Y S T E M — V 1 . 0
```









### **NetraSense** 

# **Desain yang bekerja saat tidak dilihat.** 

Fondasi brand, sistem warna terverifikasi kontras, tipografi, komponen, serta sistem audio dan haptic untuk NetraSense — produk yang audiens intinya tidak akan pernah melihat antarmukanya. 

```
BRANDWARNA & TIPOGRAFIKOMPONEN
```

```
AUDIO & HAPTIC
```

```
WCAG 2.2 AAA
```

|`U N T U K`|`P L A T F O R M`|`M O D E U T A M A`|`T A N G G A L`|
|---|---|---|---|
|**Tim Desain &**|**Android · Web dApp**|**Terang (light-frst)**|**18 Agustus 2026**|
|**Engineering**||||



```
N A V I G A S I D O K U M E N
```

**00 Daftar Isi** 

|`01`|Brief Singkat|Apa yang dirancang dan untuk siapa|
|---|---|---|
|`02`|Fondasi Brand|Nama, positioning, kepribadian, tone of voice|
|`03`|Lima Prinsip Desain|Aturan yang mengalahkan selera|
|`04`|Logo & Identitas Visual|Konsep simbol, konstruksi, penyalahgunaan|
|`05`|Sistem Warna|Palet lengkap dengan rasio kontras terverifikasi|
|`06`|Tipograf|Atkinson Hyperlegible dan alasannya|
|`07`|Layout, Grid, Target Sentuh|Skala 4pt dan aturan 64dp|
|`08`|Ikonograf|Bentuk sebagai pembawa makna kedua|
|`09`|Komponen UI|Spesifikasi dan seluruh state|
|`10`|Desain Non-Visual|Sistem audio, haptic, dan suara — bagian terpenting|
|`11`|Motion|Durasi, easing, dan reduce-motion|
|`12`|Checklist Aksesibilitas|Target WCAG 2.2 dan aturan tambahan|
|`13`|Web dApp Kontributor|Audiens berbeda, ekspresi berbeda|
|`14`|Aplikasi Brand & Deliverables|App icon, deck, struktur file Figma|



###### **Satu kalimat yang harus dipegang seluruh tim desain** 

Di produk ini, **antarmuka visual adalah antarmuka sekunder.** Antarmuka utamanya adalah suara dan getaran. Setiap keputusan visual yang mengorbankan kejelasan audio atau haptic adalah keputusan yang salah, betapa pun bagusnya di portofolio. 

NetraSense — Design Brief & Design System v2.0 

1 

```
B R I E F
```

**01** 

## **Apa yang dirancang, dan untuk siapa** 

#### **1.1 Ringkasan penugasan** 

Merancang sistem desain lengkap untuk NetraSense: aplikasi mobile untuk penyandang tunanetra dan low vision, aplikasi kontributor untuk relawan awas, dan web dApp untuk klaim imbalan serta governance. Sistem harus mencakup identitas visual, sistem warna, tipografi, komponen, dan — yang paling menentukan — sistem audio dan haptic. 

#### **1.2 Tiga audiens, tiga kebutuhan yang bertabrakan** 

|**Audiens**|**Kebutuhan desain**|**Implikasi**|
|---|---|---|
|**Tunanetra total**|Antarmuka non-visual penuh, navigasi<br>pembaca layar, gestur besar dan sederhana|Layout harus punya urutan fokus yang logis;<br>visual boleh minimal karena tidak dilihat|
|**Low vision**|Kontras ekstrem, teks besar, target sentuh<br>besar, warna yang tidak bergantung persepsi|Ini yang mendorong seluruh keputusan<br>visual. Segmen terbesar dan paling sering|
||halus|diabaikan.|
|**Kontributor & sponsor**<br>**(awas)**|Antarmuka informasi padat, data, peta,<br>dasbor, elemen kompetitif|Butuh ekspresi visual berbeda — diselesaikan<br>lewat sub-brand, bukan lewat kompromi|



#### **1.3 Ketegangan utama dan cara menyelesaikannya** 

Desain yang optimal untuk low vision terasa kasar dan tidak modern bagi mata awas. Desain yang terasa canggih bagi mata awas hampir selalu tidak terbaca bagi low vision. 

**Solusinya bukan kompromi di tengah.** NetraSense memakai dua ekspresi dari satu fondasi: aplikasi pengguna berjalan pada standar kontras AAA tanpa negosiasi, sementara web dApp kontributor dan materi pemasaran memakai palet yang sama dengan kebebasan visual yang lebih besar. Warna, tipografi, dan simbolnya identik — hanya kepadatan dan halusnya yang berbeda. 

###### **Yang bukan tugas dokumen ini** 

Dokumen ini tidak menentukan estetika demi estetika. Setiap angka di dalamnya — rasio kontras, ukuran target sentuh, durasi getar — berasal dari kebutuhan fungsional yang bisa diuji. Jika sebuah keputusan desain tidak bisa dijelaskan dengan alasan fungsional, keputusan itu belum selesai. 

NetraSense — Design Brief & Design System v2.0 

2 

```
B R A N D
```

**02 Fondasi Brand** 

#### **2.1 Nama** 

**Netra** berarti mata atau penglihatan — kata serapan Sanskerta yang hidup dan dipahami luas dalam bahasa Indonesia, termasuk dalam kata "tunanetra". **Sense** membawa dua makna sekaligus: indra, dan proses penginderaan oleh mesin. Gabungannya menyatakan inti produk dengan tepat: _indra penglihatan yang dipinjamkan_ . 

Nama ini berakar Indonesia tanpa menjadi eksklusif secara internasional — penting untuk produk yang berambisi menjadi standar terbuka lintas negara. 

#### **2.2 Positioning** 

**Untuk penyandang tunanetra dan low vision yang ingin bergerak sendiri dengan percaya diri, NetraSense adalah indra kedua yang berjalan di ruang yang tidak terjangkau tongkat — didukung peta aksesibilitas yang dibangun dan dimiliki komunitasnya sendiri.** 

Berbeda dari aplikasi AI vision yang menunggu ditanya, NetraSense bekerja lebih dulu, terus-menerus, dan tetap berfungsi saat sinyal hilang. 

#### **2.3 Kepribadian brand** 

|**Adalah**|**Bukan**|**Karena**|
|---|---|---|
|**Tenang**|Dramatis, mendesak terus-menerus|Panik menular lewat suara; pengguna<br>sedang berada di jalan raya|
|**Presisi**|Kabur, sok ramah, berbunga-bunga|"Ada sesuatu di depan" tidak berguna.<br>"Tiang, dua langkah, kanan" berguna.|
|**Hormat**|Mengasihani, inspiratif secara<br>patronizing|Pengguna adalah orang dewasa yang<br>kompeten, bukan objek amal|
|**Andal**|Eksperimental, "beta" terus-menerus|Ini alat keselamatan; kesan rapuh<br>menghancurkan adopsi|
|**Terbuka**|Tertutup, korporat, penuh jargon|Datanya barang publik; brand-nya<br>harus terasa seperti barang publik<br>juga|



#### **2.4 Tone of voice** 

###### **Lakukan** 

###### **Hindari** 

Kalimat pendek, kata kerja di depan: "Belok kanan sekarang." 

"Hebat! Kamu berhasil menyeberang!" — merendahkan Kata "penderita", "korban", "menderita kebutaan" Arah mata angin (utara/selatan) untuk panduan langkah 

NetraSense — Design Brief & Design System v2.0 

3 

- Sebut jarak dalam langkah, bukan meter, untuk jarak dekat 

Sebut arah relatif terhadap badan: kiri, kanan, depan 

Jargon: "obstacle detected", "confidence 0.87" 

Basa-basi di tengah perjalanan — setiap kata memakan waktu 

- Akui ketidakpastian: "Sepertinya pintu masuk, saya tidak yakin." 

Bahasa Indonesia sehari-hari, tanpa istilah teknis 

###### **Terminologi resmi** 

Gunakan **"penyandang tunanetra"** atau **"teman tunanetra"** dalam komunikasi Indonesia; _blind and low-vision users_ dalam komunikasi Inggris. Hindari "difabel netra" kecuali komunitas mitra memakainya lebih dulu. Prinsipnya: ikuti istilah yang dipakai organisasi penyandang disabilitas mitra, bukan istilah yang terasa paling nyaman bagi tim. 

NetraSense — Design Brief & Design System v2.0 

4 

```
A T U R A N
```

**03** 

**2** 

**3** 

**4** 

**5** 

## **Lima prinsip desain** 



<!-- Start of picture text -->
1<br><!-- End of picture text -->

###### **Keheningan adalah sinyal aman** 

Antarmuka tidak mengumumkan dirinya. Suara, getaran, dan animasi hanya muncul ketika membawa informasi yang mengubah keputusan pengguna. Setiap notifikasi harus lolos satu pertanyaan: _apakah pengguna akan melakukan sesuatu yang berbeda setelah mendengar ini?_ Bila tidak, jangan bunyikan. 

###### **Bahaya punya bahasa sendiri** 

Informasi keselamatan tidak pernah memakai gaya visual, suara, atau getaran yang sama dengan informasi biasa. Peringatan bahaya kritis memotong seluruh antrean audio, memakai pola haptic yang tidak dipakai apa pun, dan tidak pernah dapat diredam oleh pengaturan mode senyap. 

###### **Setiap informasi disampaikan minimal dua kanal** 

Warna selalu ditemani bentuk dan teks. Suara selalu ditemani getaran. Getaran selalu punya padanan suara. Tidak ada satu pun informasi kritis yang hanya hidup di satu kanal indra — karena satu kanal bisa hilang di jalan yang bising, di bawah sinar matahari, atau di saku. 

###### **Ukuran mengalahkan kerapian** 

Ketika terjadi konflik antara komposisi yang enak dilihat dan target sentuh yang cukup besar, target sentuh menang — selalu, tanpa perdebatan. Ruang kosong bukan kemewahan di produk ini; ruang kosong adalah margin kesalahan bagi jari yang tidak dipandu mata. 

###### **Rancang untuk kondisi terburuk, bukan kondisi demo** 

Kondisi acuan bukan ruangan ber-AC dengan cahaya sempurna. Kondisi acuan adalah trotoar jam lima sore: matahari menyilaukan, lalu lintas bising, satu tangan memegang tongkat, ponsel di saku, baterai 20%. Semua keputusan desain diuji terhadap kondisi ini. 

###### **Uji cepat untuk setiap layar** 

Matikan layar. Bisakah tugas ini diselesaikan hanya dengan pembaca layar dan getaran? Jika jawabannya tidak, layar itu belum selesai — sebagus apa pun tampilannya. 

NetraSense — Design Brief & Design System v2.0 

5 

```
I D E N T I T A S
```

**04** 

**Logo & identitas visual** 

#### **4.1 Konsep simbol** 

Simbol NetraSense adalah **"The Aperture"** — sebuah bentuk kotak dengan sudut sangat tumpul (superellipse) berisi lingkaran padat di tengah. Tiga pembacaan sekaligus, dan semuanya benar: 

- **Pupil** — mata yang meminjamkan penglihatan 

- **Titik pada peta** — satu titik data aksesibilitas di jaringan 

- **Sumber suara** — pusat gelombang audio spasial yang memancar 

Bentuknya sengaja dibuat sangat sederhana: harus tetap terbaca pada ukuran 16 px di bilah status, harus bekerja dalam satu warna, dan harus bisa dicetak timbul atau Braille pada kemasan perangkat keras di masa depan. 



<!-- Start of picture text -->
Primary — Amber di atas Ink Mono — untuk konteks terbatas Inverse — Ink di atas Paper<br><!-- End of picture text -->

#### **4.2 Konstruksi** 

- **Grid** — simbol dibangun pada kanvas 32×32 unit. Radius sudut 8 unit. Diameter lingkaran dalam 12 unit, tepat di pusat optis. 

- **Clear space** — ruang kosong minimum di seluruh sisi setara dengan diameter lingkaran dalam. Tidak ada elemen apa pun boleh masuk area ini. 

- **Ukuran minimum** — 16 px untuk simbol saja pada layar; 24 px untuk lockup dengan wordmark; 8 mm untuk cetak. 

- **Wordmark** — "Netra" dengan Space Grotesk Bold, "Sense" dengan warna Amber Deep di latar terang atau Amber di latar gelap. Jarak simbol ke wordmark setara setengah tinggi simbol. 

#### **4.3 Penyalahgunaan yang dilarang** 

###### **Boleh** 

- Simbol saja tanpa wordmark pada ruang sempit 

- Satu warna penuh untuk sablon, timbul, atau faks 

- Amber di atas Ink, atau Ink di atas Amber 

- Diperbesar tanpa batas selama rasio dijaga 

###### **Dilarang** 

- Gradien, bayangan, atau efek kaca pada simbol 

- Memutar, memiringkan, atau mengubah rasio 

- Menempatkan di atas foto tanpa lapisan solid 

- Mewarnai dengan warna semantik bahaya (merah/oranye) 

- Menambahkan garis luar pada versi solid 

NetraSense — Design Brief & Design System v2.0 

6 

#### **4.4 Sub-brand Proof-of-Path** 

Lapisan jaringan memakai penanda visual terpisah: simbol yang sama dengan lingkaran dalam diganti **titik-titik terhubung** , dan warna Violet menggantikan Amber. Ini menciptakan pemisahan yang jelas antara "aplikasi yang menjaga saya" dan "jaringan yang saya bantu bangun" — dua hubungan emosional yang sangat berbeda dan tidak boleh tertukar. 

NetraSense — Design Brief & Design System v2.0 

7 

```
W A R N A
```

**05** 

## **Sistem Warna** 

Setiap rasio kontras di halaman ini dihitung secara programatik dengan rumus WCAG 2.1, bukan diperkirakan dengan mata. Aturan sistemnya muat dalam satu kalimat: **warna tua untuk teks, warna cerah untuk bidang isi, dan tidak pernah sebaliknya.** 

#### **5.1 Filosofi — terang sebagai mode utama** 

Palet NetraSense dibangun **terang lebih dulu** , dengan tiga alasan fungsional: 

- **Kertas hangat, bukan putih steril.** Putih murni (#FFFFFF) memantulkan cahaya terlalu keras di luar ruangan dan memicu silau pada banyak kondisi mata. Latar utama digeser ke #FBFAF7 — cukup terang untuk terasa lapang, cukup hangat untuk tidak menyilaukan. 

- **Teks gelap di atas latar terang adalah pola baca yang paling dikenal.** Untuk pengguna low vision yang masih membaca dengan sisa penglihatan, polaritas ini paling sering menjadi preferensi pertama, dan paling mudah diperbesar tanpa kehilangan ketajaman. 

- **Mode gelap tetap tersedia penuh** sebagai preferensi pengguna, dan mode kontras ekstrem tersedia sebagai pilihan ketiga. Yang berubah hanyalah mana yang menjadi baku. 

#### **5.2 Permukaan & garis** 

Tiga permukaan saja. Kedalaman disampaikan lewat perbedaan permukaan dan garis, bukan lewat bayangan bertumpuk. 



<!-- Start of picture text -->
latar utama kartu panel garis 1px<br>Paper Surface Alt Line<br>#FBFAF7 #FFFFFF #F4F2ED #E6E2DA<br>Ink di atas · 17.05:1 · AAA Ink di atas · 17.79:1 · AAA Ink di atas · 15.90:1 · AAA pembatas — tidak pernah jadi<br>teks<br>5.3 Teks<br>teks utama teks kedua metadata nonaktif<br>Ink Ink 2 Ink 3 Ink Disabled<br>#14181F #4A5462 #495260 #8A93A1<br>di atas Paper · 17.05:1 · di atas Paper · 7.35:1 · AAA di atas Paper · 7.57:1 · AAA di atas Paper · 2.97:1 · isi<br>AAA saja<br><!-- End of picture text -->

###### **Aturan mutlak** 

NetraSense — Design Brief & Design System v2.0 

8 

Ketiga tingkat teks aktif mencapai AAA — itu standar minimum produk, bukan pencapaian. Ink Disabled hanya boleh dipakai untuk elemen yang benar-benar tidak dapat dioperasikan, dan wajib disertai atribut status pada pembaca layar. 

#### **5.4 Warna brand** 

Setiap warna hadir dalam tiga wujud yang tidak boleh dipertukarkan: **Tint** untuk latar lembut, **Solid** untuk bidang isi dan ikon, **Deep** untuk teks. Rasio di bawah menunjukkan pasangan yang benar untuk masing-masing wujud. 

`latar lembut bidang isi teks latar lembut` **Amber Tint Amber Amber Deep Teal Tint** `#FFF3D1 #FFC53D #6B4900 #DCF1F6 Deep di atas · 7.37:1 · AAA Ink di atas · 11.27:1 · AAA di atas Paper · 7.80:1 · AAA Deep di atas · 7.17:1 · AAA` 

`bidang isi teks latar lembut bidang isi` **Teal Teal Deep Violet Tint Violet** `#17A2BD #0B5566 #EBE5FE #7C5CE0 Ink di atas · 5.88:1 · AA di atas Paper · 8.03:1 · AAA Deep di atas · 7.34:1 · AAA Putih di atas · 4.70:1 · AA teks` 

###### **Violet Deep** 

```
#4B33A8
```

```
di atas Paper · 8.60:1 · AAA
```

|**Warna**|**Peran**|**Aturan penggunaan**|
|---|---|---|
|**Amber**<br>kuning hangat|Warna utama. Identitas, aksi<br>berenergi, sorotan, logo.|Di mode terang**tidak pernah menjadi teks**— hanya<br>bidang isi dengan Ink di atasnya. Untuk teks, satu-satunya<br>bentuk yang sah adalah Amber Deep.|
|**Teal**<br>biru kehijauan|Lapisan informasi, overlay AR, jalur<br>rute, tautan.|Tidak pernah dipakai untuk peringatan bahaya. Ini warna<br>"sistem sedang bekerja", bukan "hati-hati".|
|**Violet**|Seluruh lapisan Web3: kontribusi,|Pemisah dunia. Kapan pun pengguna melihat Violet, ia|
|ungu|imbalan, dompet, governance.|sedang berada di lapisan jaringan, bukan lapisan<br>keselamatan.|



#### **5.5 Warna semantik — status jalur** 

NetraSense — Design Brief & Design System v2.0 

9 



<!-- Start of picture text -->
latar bidang isi teks latar<br>Green Tint Green Green Deep Orange Tint<br>#DFF4E7 #22A45D #0A5A30 #FCEBDC<br>Deep di atas · 7.24:1 · AAA Ink di atas · 5.54:1 · AA di atas Paper · 7.99:1 · AAA Deep di atas · 6.98:1 · AA<br>bidang isi teks latar bidang isi<br>Orange Orange Deep Red Tint Red<br>#EE7B22 #85390A #FBE6E6 #D22B2B<br>Ink di atas · 6.35:1 · AA di atas Paper · 7.78:1 · AAA Deep di atas · 7.37:1 · AAA Putih di atas · 5.10:1 · AA<br>teks<br>Red Deep<br>#8F1F1F<br>di atas Paper · 8.44:1 · AAA<br><!-- End of picture text -->

###### **Warna tidak pernah menjadi satu-satunya pembawa makna** 

Sekitar 1 dari 12 laki-laki mengalami defisiensi persepsi warna, dan sebagian besar pengguna produk ini memiliki persepsi warna yang berubah karena kondisi mata. Karena itu setiap status wajib membawa **tiga penanda sekaligus** : 

|**Status**|**Warna**|**Bentuk ikon**|**Haptic**|
|---|---|---|---|
|Aman|Green|Lingkaran|Tidak ada — keheningan|
|Waspada|Orange|Segitiga|Denyut ganda lembut|
|Kritis|Red|Oktagon|Getar panjang tajam 400 ms|
|Informasi|Teal|Persegi|Ketukan tunggal ringan|



#### **5.6 Mode gelap — preferensi, bukan baku** 

Mode gelap tetap didukung penuh untuk pengguna yang memilihnya dan untuk pemakaian malam hari. Nilai-nilainya diturunkan dari palet yang sama, bukan dirancang terpisah. 

|**Token**|**Terang (baku)**|**Gelap**|**Rasio di mode gelap**|
|---|---|---|---|
|Latar|`#FBFAF7`|`#0D1420`|—|
|Teks utama|`#14181F`|`#F2F5F9`|`16,88:1 · AAA`|
|Aksi utama|`#14181F isi`|`#FFC53D`|`11,69:1 · AAA`|



NetraSense — Design Brief & Design System v2.0 

10 

|Bahaya|`#8F1F1F teks`|`#FF8080`|`7,60:1 · AAA`|
|---|---|---|---|
|Jaringan|`#4B33A8 teks`|`#B49CFC`|`8,00:1 · AAA`|



#### **5.7 Mode kontras ekstrem** 

Pilihan ketiga yang tersedia sejak layar pertama, bukan terkubur di menu. Ketika aktif, seluruh tint hilang, setiap elemen mendapat garis tepi solid, dan tebal huruf minimum naik ke Bold. 

|**Elemen**|**Terang**|**Kontras ekstrem**|**Rasio**|
|---|---|---|---|
|Latar|`#FBFAF7`|`#FFFFFF`|—|
|Teks utama|`#14181F`|`#000000`|`21,00:1`|
|Garis|`#E6E2DA 1px`|`#000000 2px`|`21,00:1`|
|Bahaya|`#8F1F1F`|`#B00000`|`8,89:1 + ikon + haptic`|



Pada mode ini seluruh gradien, transparansi, dan bayangan dinonaktifkan tanpa pengecualian. 

NetraSense — Design Brief & Design System v2.0 

11 

```
T I P O G R A F I
```

**06** 

## **Tipografi** 

#### **6.1 Tiga typeface, tiga tugas** 

###### **Atkinson Hyperlegible — teks antarmuka & isi** 

Dirancang khusus oleh Braille Institute untuk pembaca low vision. Setiap huruf dibuat semaksimal mungkin berbeda satu sama lain pada titik-titik yang paling sering tertukar: **I l 1** , **O 0** , **c e o** , **b d p q** . Bagi produk yang audiensnya justru kesulitan membedakan bentuk, ini bukan pilihan gaya — ini pilihan fungsional yang bisa dipertahankan di depan siapa pun. Tersedia gratis dengan lisensi terbuka. 

###### **Space Grotesk — judul, angka besar, wordmark** 

Memberi karakter teknologi kontemporer pada materi presentasi dan web dApp tanpa mengorbankan 

keterbacaan isi. **Tidak pernah dipakai untuk teks panjang di aplikasi pengguna** — hanya untuk judul pendek, angka statistik, dan materi yang audiensnya awas. 

###### **JetBrains Mono — data, koordinat, hash, kode** 

Dipakai untuk nilai teknis yang membutuhkan lebar tetap: koordinat, alamat dompet terpotong, jumlah token, dan hash transaksi. Lebar tetap membantu pembaca membandingkan nilai secara vertikal. 

#### **6.2 Skala tipe — aplikasi pengguna** 

|**Token**|**`Ukuran`**|**`Line height`**|**`Weight`**|**Penggunaan**|
|---|---|---|---|---|
|display|`40 sp`|`1.10`|`700`|Status utama layar navigasi — dibaca sekilas dari jauh|
|title-lg|`30 sp`|`1.20`|`700`|Judul layar|
|title|`24 sp`|`1.25`|`700`|Judul kartu, nama rute|
|body-lg|`20 sp`|`1.55`|`400`|**Ukuran isi baku aplikasi pengguna**|
|body|`18 sp`|`1.55`|`400`|Isi sekunder|
|label|`16 sp`|`1.40`|`700`|Label tombol|
|caption|`14 sp`|`1.45`|`400`|Batas bawah mutlak — di bawah ini tidak diizinkan|



Ukuran ini terasa besar dibanding aplikasi arus utama, dan memang disengaja. Ukuran isi baku 20 sp adalah titik awal, bukan kompromi — pengguna low vision umumnya masih akan menaikkannya lagi lewat pengaturan sistem. 

#### **6.3 Aturan tipografi** 

NetraSense — Design Brief & Design System v2.0 

12 

###### **Lakukan** 

- Dukung penskalaan font sistem sampai 200% tanpa layout rusak 

- Rata kiri untuk seluruh teks — selalu 

- Panjang baris maksimum 60 karakter 

- Jarak antar paragraf minimal 1,5× tinggi baris 

- Naikkan tracking sedikit pada teks kecil di atas bidang warna solid 

###### **Hindari** 

- HURUF KAPITAL SEMUA untuk teks lebih dari dua kata 

- Rata tengah atau rata kanan-kiri pada isi 

- Teks di atas foto atau gradien tanpa lapisan solid 

- Weight Light atau Thin — di mana pun, tanpa pengecualian 

- Teks berjalan, berkedip, atau beranimasi 

- Ikon tanpa label teks pada aksi utama 

NetraSense — Design Brief & Design System v2.0 

13 

```
S T R U K T U R
```

**07** 

## **Layout, grid, dan target sentuh** 

#### **7.1 Skala spasi** 

Basis 4 dp. Token yang diizinkan: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` . Nilai di luar daftar ini tidak boleh muncul di kode produksi. 

|**Konteks**|**Nilai**|**Catatan**|
|---|---|---|
|Padding tepi layar|`24 dp`|Naik ke 32 dp pada layar > 6,5 inci|
|Jarak antar kartu|`16 dp`|Cukup untuk dibedakan lewat sentuhan saja|
|Jarak antar target<br>sentuh|`16 dp minimum`|Mencegah salah tekan pada jari yang tidak dipandu mata|
|Padding dalam kartu|`20–24 dp`|Ruang bernapas untuk teks berukuran besar|



#### **7.2 Target sentuh** 

##### **64 × 64 dp — bukan 48 dp** 

Panduan aksesibilitas arus utama menetapkan minimum 48 dp untuk pengguna umum. NetraSense menetapkan **64 dp** sebagai standar, dan **88 dp** untuk aksi utama, karena penggunanya tidak dapat mengoreksi tekanan yang meleset dengan melihat. Setiap dp tambahan adalah pengurangan tingkat kesalahan yang bisa diukur. 

**Aksi utama** (mulai navigasi, panggil bantuan, laporkan bahaya) — minimal 88 dp tinggi, lebar penuh. 

- **Aksi sekunder** — minimal 64 dp. 

**Zona ibu jari** — seluruh aksi yang mungkin dipakai sambil berjalan wajib berada di sepertiga bawah layar. 

- **Gestur global** — ketuk dua jari untuk menghentikan panduan; usap tiga jari untuk mengulang instruksi terakhir. Kedua gestur berlaku di mana pun di aplikasi tanpa perlu menemukan tombol. 

#### **7.3 Hierarki layar navigasi** 

|`┌─────────────────────────────────`<br>`│  STATUS BESAR`|`┐`<br>`│  display 40sp — status jalur saat ini`|
|---|---|
|`│  "Jalur aman"`<br>`├─────────────────────────────────`|`│  warna: Clear / Caution / Hazard`<br>`┤`|
|`│  Instruksi berikutnya`|`│  body-lg 20sp`|
|`│  "Belok kanan, 12 langkah"`<br>`│`|`│`<br>`│`|
|<br>`│      (ruang kosong luas)`<br>`│`|<br>`│  ruang kosong = margin kesalahan`<br>`│`|
|<br>`├─────────────────────────────────`<br>`│  [  LAPORKAN BAHAYA  ]  88dp`|<br>`┤`<br>`│  zona ibu jari`|



NetraSense — Design Brief & Design System v2.0 

14 

```
│  [  ULANGI  ] [  BERHENTI  ]    │  64dp
└─────────────────────────────────┘
```

Hanya satu informasi utama per layar. Kepadatan informasi yang normal di aplikasi lain adalah kegagalan desain di sini — pengguna sedang berjalan, dan perhatian visual mereka bukan sumber daya yang bisa diandalkan. 

NetraSense — Design Brief & Design System v2.0 

15 

```
I K O N O G R A F I
```

**08** 

## **Ikon: bentuk sebagai pembawa makna kedua** 

**Gaya** — garis tebal 2,5 px pada kanvas 24, sudut membulat, tanpa detail halus. Bentuk siluet harus tetap dikenali saat diperkecil menjadi 40% atau diburamkan. 

**Ukuran** — 32 dp baku di aplikasi pengguna, 24 dp di web dApp. Tidak pernah di bawah 24 dp. 

- **Label wajib** — setiap ikon aksi disertai label teks. Ikon tanpa teks hanya diizinkan pada elemen dekoratif yang ditandai `aria-hidden` . 

**Bentuk membawa makna** — seperti diatur pada 5.5, kelas bahaya memiliki bentuk kontainer tetap: lingkaran aman, segitiga waspada, oktagon kritis, persegi informasi. Pengguna dapat mengenali kelas bahaya tanpa membedakan warna sama sekali. 

**Uji buram** — setiap ikon baru wajib lolos uji: buramkan 8 px, apakah masih bisa dibedakan dari ikon lain di layar yang sama? Bila tidak, rancang ulang siluetnya. 

###### **Ikon inti yang harus ada** 

|**Navigasi**|**Bahaya**|**Jaringan**|
|---|---|---|
|Rute · Belok kiri/kanan · Menyeberang|Tiang · Lubang · Bahaya kepala ·|Kontribusi · Validasi · Imbalan ·|
|· Tangga naik/turun · Ramp · Ubin|Kendaraan · Permukaan licin · Galian ·|Dompet · Peta jaringan · Governance ·|
|pemandu · Tujuan|Jalur tertutup|Lencana|



NetraSense — Design Brief & Design System v2.0 

16 

```
K O M P O N E N
```

**09** 

## **Komponen UI** 

#### **9.1 Tombol** 

|**Varian**|**Tampilan**|**Tinggi**|**Penggunaan**|
|---|---|---|---|
|**Primary**|Isi Ink, teks putih, radius 14<br>dp|`88 dp`|Satu per layar. Aksi paling penting.|
|**Secondary**|Garis Line 1,5 px, teks Ink|`64 dp`|Aksi pendukung|
|**Danger**|Isi Red, teks putih|`88 dp`|Hanya untuk laporkan bahaya & hentikan<br>darurat|
|**Network**|Isi Violet, teks putih|`64 dp`|Seluruh aksi lapisan Web3|
|**Ghost**|Tanpa isi, teks Ink|`64 dp`|Aksi tersier, tidak pernah untuk aksi merusak|
|**State wajib untu**<br>**State**|**k setiap tombol**<br>**Perubahan visual**||**Umpan balik non-visual**|
|Default|—||—|
|Focused|Cincin fokus Ink 3 px dengan jar|ak 2 px|Pembaca layar menyebut label + peran|
|Pressed|Skala 0,97 · kecerahan −8%||Ketukan haptic ringan seketika|
|Loading|Label diganti indikator progres||Pengumuman "sedang memproses" sekali saja|
|Disabled|Opasitas 40%, tanpa perubahan|warna semantik|Status dinonaktifkan diumumkan pembaca layar|
|Success|Kilas Green Tint 400 ms lalu ke|mbali|Earcon konfirmasi + ketukan ganda|



#### **9.2 Hazard Alert — komponen paling penting di sistem** 

###### **Spesifikasi** 

- **Muncul** sebagai lapisan penuh di atas segala hal, tanpa animasi masuk yang memakan waktu — muncul seketika. 

**Struktur** — ikon oktagon 64 dp, jenis bahaya (display 40 sp), jarak dalam langkah, arah relatif badan. 

- **Warna** — latar Red Deep penuh, teks putih, tanpa elemen lain di layar. 

- **Audio** — memotong seluruh antrean; tidak dapat diredam oleh mode senyap sistem. 

- **Haptic** — pola bahaya kritis, berulang sampai bahaya keluar dari jalur. 

- **Tanpa tombol tutup.** Peringatan hilang sendiri ketika bahaya sudah tidak relevan — pengguna tidak boleh dipaksa berinteraksi saat sedang menghindar. 

NetraSense — Design Brief & Design System v2.0 

17 

#### **9.3 Route Card** 

Menampilkan satu opsi rute dengan hierarki: nama tujuan (title), jarak dan estimasi waktu (body-lg), lalu **skor aksesibilitas** sebagai elemen paling menonjol — bukan jarak. Ini pembalikan yang disengaja terhadap konvensi aplikasi peta: yang paling penting bagi pengguna ini bukan cepatnya, melainkan bisa dilaluinya. 

Skor ditampilkan sebagai batang bertingkat dengan label teks eksplisit ("Sangat baik · trotoar kontinu, 1 hambatan"), tidak pernah sebagai angka telanjang atau bintang. 

#### **9.4 Contribution Tile — lapisan Meridian** 

Kartu quest untuk kontributor awas: nama ruas jalan, panjang, pengganda bounty, dan tingkat kelangkaan data. Memakai kepadatan informasi yang jauh lebih tinggi dari komponen sisi pengguna, karena audiensnya berbeda. Seluruh elemen memakai aksen Violet agar pemisahan dua dunia tetap terjaga. 

#### **9.5 Wallet Sheet** 

Lembar bawah untuk saldo, riwayat, dan klaim. Aturan khusus: **kata "blockchain", "gas", "on-chain", dan "seed phrase" tidak pernah muncul di antarmuka pengguna.** Saldo disebut "Poin kontribusi", transaksi disebut "Riwayat", dan proses penandatanganan disebut "Konfirmasi dengan sidik jari". Kompleksitas teknis adalah tanggung jawab sistem, bukan beban pengguna. 

#### **9.6 Voice Orb** 

Indikator status asisten suara — lingkaran Amber yang berdenyut halus saat mendengarkan. Satu-satunya elemen beranimasi terus-menerus yang diizinkan di aplikasi, dan otomatis diam ketika `prefers-reduced-motion` aktif. Fungsi visualnya sekunder; fungsi utamanya adalah memberi tahu pendamping awas bahwa sistem sedang mendengarkan. 

#### **9.7 Aturan umum komponen** 

Radius sudut: 12 dp untuk elemen kecil, 16 dp untuk tombol, 24 dp untuk kartu dan lembar bawah. 

- Bayangan dipakai sangat hemat — kedalaman disampaikan lewat perbedaan permukaan (Paper → Surface → Alt) dan garis 1px. 

Setiap komponen wajib memiliki urutan fokus yang terdefinisi dan label pembaca layar yang ditulis manual, bukan dihasilkan otomatis dari teks tampilan. 

NetraSense — Design Brief & Design System v2.0 

18 

```
B A G I A N T E R P E N T I N G
```

**10** 

## **Desain non-visual: audio & haptic** 

Bagi sebagian besar pengguna NetraSense, inilah satu-satunya antarmuka yang benar-benar mereka alami. Bagian ini harus dirancang dengan ketelitian yang sama dengan sistem visual — idealnya lebih. 

#### **10.1 Prinsip audio** 

- **Jangan pernah menutup telinga.** Perangkat wajib bone conduction atau open-ear. Peredam bising dilarang di seluruh alur produk, termasuk dalam rekomendasi perangkat. 

- **Earcon sebelum kata.** Nada pendek menyampaikan kelas informasi dalam 200 ms; ucapan menyusul hanya bila dibutuhkan detail. Ini menghemat waktu reaksi yang menentukan. 

- **Ruang membawa arah.** Audio spasial memposisikan sumber suara pada arah objek sebenarnya. Pengguna tidak perlu menerjemahkan kata menjadi arah — mereka mendengar arahnya langsung. 

- **Tempo membawa jarak.** Interval antar denyut memendek saat jarak mengecil. Ini pemetaan yang dipelajari dalam hitungan menit dan tidak pernah dilupakan. 

- **Nada membawa ketinggian.** Frekuensi rendah untuk bahaya di permukaan, frekuensi tinggi untuk bahaya setinggi kepala. 

#### **10.2 Pustaka earcon** 

|**Earcon**|**Karakter**|**Durasi**|**Makna**|
|---|---|---|---|
|**Clear**|Dua nada naik,<br>lembut|`180 ms`|Jalur di depan bersih — dibunyikan hemat, hanya setelah<br>keluar dari zona bahaya|
|**Proximity**|Denyut tunggal,<br>tempo naik|`80 ms`|Objek mendekat; posisi stereo menunjukkan arah|
|**Overhead**|Dua nada tinggi<br>cepat|`160 ms`|Bahaya setinggi kepala — pola yang tidak dipakai kelas<br>lain|
|**Critical**|Nada rendah<br>tajam, berulang|`240 ms`|Berhenti sekarang. Memotong semua audio lain.|
|**Turn**|Nada meluncur ke<br>arah belokan|`200 ms`|Instruksi belok; panning mengikuti arah|
|**Confirm**|Nada tunggal<br>hangat|`120 ms`|Aksi berhasil|
|**Contribution**|Tiga nada naik,<br>karakter Meridian|`300 ms`|Data terkirim dan tervalidasi — satu-satunya earcon<br>"menyenangkan" di sistem|



Seluruh earcon berada pada rentang 400–2.500 Hz agar tetap terdengar di kebisingan lalu lintas kota tanpa perlu volume tinggi, dan tidak bertabrakan dengan frekuensi suara manusia. 

#### **10.3 Pustaka haptic** 

NetraSense — Design Brief & Design System v2.0 

19 

|**Pola**|**Bentuk getar**|**Makna**|
|---|---|---|
|**Tap**|1 × 30 ms ringan|Konfirmasi sentuhan, elemen fokus|
|**Double**|2 × 40 ms, jeda 80 ms|Instruksi belok|
|**Sharp Double**|2 × 60 ms tajam, jeda 60 ms|Bahaya setinggi kepala|
|**Ramp**|Intensitas naik bertahap|Mendekati rintangan|
|**Long Sharp**|1 × 400 ms intensitas penuh|Berhenti — bahaya kritis|
|**Triple Soft**|3 × 30 ms lembut|Kontribusi tervalidasi, imbalan diterima|



###### **Aturan mutlak haptic** 

Pola _Long Sharp_ tidak pernah dipakai untuk apa pun selain bahaya kritis — tidak untuk notifikasi, tidak untuk error, tidak untuk pesan masuk. Kekuatan sistem ini sepenuhnya bergantung pada kemurnian asosiasi itu. Satu penggunaan yang salah merusak seluruh sistem kepercayaan. 

#### **10.4 Hierarki interupsi** 

```
PRIORITAS 1   Bahaya kritis        memotong segalanya · tidak dapat diredam
PRIORITAS 2   Bahaya kepala        memotong panduan navigasi
PRIORITAS 3   Instruksi navigasi   menunggu prioritas 1–2 selesai
PRIORITAS 4   Pembacaan teks       dapat dijeda pengguna kapan saja
PRIORITAS 5   Notifikasi jaringan  ditahan sampai perjalanan berakhir
```

Prioritas 5 tidak pernah berbunyi saat pengguna sedang bergerak. Imbalan token yang masuk bisa menunggu; keselamatan tidak. 

#### **10.5 Suara asisten** 

**Kecepatan bicara** baku 1,3× normal, dapat diatur 0,8× sampai 3×. Pengguna tunanetra berpengalaman umumnya 

memakai kecepatan jauh di atas dugaan tim desain. 

- **Karakter suara** netral dan tenang; hindari suara yang terlalu ceria atau bernapas berlebihan. 

- **Interupsi** — pengguna dapat memotong ucapan kapan saja dengan ketukan dua jari, tanpa perlu menunggu kalimat selesai. 

**Bahasa** — Bahasa Indonesia baku sebagai baku, dengan dukungan istilah lokal untuk nama tempat. 

NetraSense — Design Brief & Design System v2.0 

20 

```
G E R A K
```

**11 Motion** 

|**Jenis**|**Durasi**|**Easing & catatan**|
|---|---|---|
|Umpan balik sentuh|`100 ms`|`ease-out`— harus terasa seketika|
|Transisi elemen|`200 ms`|`cubic-bezier(.2,0,0,1)`|
|Transisi layar|`280 ms`|Geser horizontal, tanpa efek paralaks|
|Peringatan bahaya|`0 ms`|**Tanpa animasi.**Muncul seketika — animasi menunda informasi<br>keselamatan|
|Denyut Voice Orb|`1.400 ms`|Berulang halus; berhenti saat reduce-motion aktif|



###### **Reduce motion adalah default, bukan opsi** 

Sebagian pengguna low vision mengalami pusing atau disorientasi akibat gerakan layar. NetraSense menghormati `prefers-reduced-motion` secara penuh: seluruh transisi berubah menjadi _cross-fade_ 100 ms, dan setiap animasi berulang berhenti sepenuhnya. Tidak ada satu pun animasi yang membawa informasi yang tidak tersedia di kanal lain. 

#### **Checklist aksesibilitas** 

Target kepatuhan: **WCAG 2.2 Level AA sebagai batas minimum, Level AAA sebagai target untuk seluruh elemen teks dan kontras.** Ditambah aturan khusus produk di luar standar: 

|✓|**Kriteria**|**Standar NetraSense**|
|---|---|---|
|`□`|Kontras teks|≥7:1 seluruh teks isi (AAA), ≥4,5:1 teks besar|
|`□`|Kontras elemen non-teks|≥3:1 untuk seluruh ikon, garis, dan indikator state|
|`□`|Target sentuh|≥64 dp (standar WCAG: 24 dp) · aksi utama ≥88 dp|
|`□`|Penskalaan teks|200% tanpa kehilangan konten atau fungsi|
|`□`|Indikator fokus|Cincin 3 px, kontras ≥3:1 terhadap latar sekitarnya|
|`□`|Warna sebagai satu-satunya penanda|Nol pelanggaran — setiap status punya bentuk + teks|
|`□`|Label pembaca layar|Ditulis manual untuk 100% elemen interaktif|
|`□`|Urutan fokus|Logis dan diuji dengan TalkBack pada setiap layar|
|`□`|Alternatif gestur|Setiap gestur punya alternatif tombol yang setara|
|`□`|Batas waktu|Tidak ada batas waktu pada aksi apa pun|



NetraSense — Design Brief & Design System v2.0 

21 

|`□`|Umpan balik multi-kanal|Setiap peringatan hadir di audio, haptic, dan visual|
|---|---|---|
|`□`|Uji pengguna nyata|Setiap rilis diuji minimal 3 pengguna tunanetra|



Baris terakhir adalah yang paling penting dan yang paling sering dilewati. Checklist otomatis tidak dapat menangkap masalah yang hanya muncul saat seseorang benar-benar berjalan di trotoar dengan produk ini. 

NetraSense — Design Brief & Design System v2.0 

22 

```
S U B - B R A N D
```

**13** 

**Web dApp kontributor** 

Audiens berbeda, kondisi pemakaian berbeda, dan karena itu ekspresi visual yang berbeda — tetapi dari fondasi warna dan tipografi yang persis sama. 

|**Aspek**|**Aplikasi pengguna**|**Web dApp kontributor**|
|---|---|---|
|Aksen utama|Amber (kuning)|Violet (ungu)|
|Kepadatan|Satu informasi utama per layar|Dasbor padat, tabel, peta interaktif|
|Ukuran isi|20 sp|16 px|
|Typeface judul|Atkinson Hyperlegible|Space Grotesk|
|Mode|Terang baku · gelap & kontras ekstrem<br>sebagai pilihan|Terang baku, mengikuti sistem|
|Nada|Tenang, presisi, sedikit kata|Energik, kompetitif, berorientasi progres|
|Motion|Minimal, fungsional|Lebih ekspresif — perayaan pencapaian<br>diizinkan|



###### **Yang tetap sama di kedua dunia** 

Nilai warna yang sama persis, keluarga typeface yang sama, sistem ikon yang sama, dan standar kontras minimum yang sama. Web dApp boleh lebih padat dan lebih ekspresif — tetapi tidak boleh kurang dapat diakses. Kontributor pun bisa memiliki gangguan penglihatan. 

#### **13.1 Halaman inti web dApp** 

**Peta jaringan** — visualisasi cakupan data publik dengan gradien kepadatan Meridian. Ini juga aset pemasaran terkuat proyek: satu gambar yang menunjukkan peta tumbuh dari bulan ke bulan. 

- **Dasbor kontributor** — kilometer terpetakan, tingkat kelolosan validasi, imbalan tertunda dan terklaim, lencana. 

- **Papan peringkat** — per kampus, per kota, per bulan. Menampilkan kontribusi tervalidasi, bukan volume mentah. 

- **Governance** — proposal aktif, hasil pemungutan suara, dan kuota suara organisasi disabilitas yang ditampilkan terbuka. 

**Dasbor sponsor** — progres kampanye, laporan dampak yang dapat diaudit, tautan verifikasi on-chain. 

NetraSense — Design Brief & Design System v2.0 

23 

```
P E N U T U P
```

**14** 

## **Aplikasi brand & deliverables** 

#### **14.1 Aplikasi brand** 

|**Media**|**Spesifikasi**|
|---|---|
|**App icon**|Simbol Amber di atas Ink, radius mengikuti platform. Wajib lolos uji: masih dikenali saat<br>diperkecil ke 40 px dan diburamkan.|
|**Splash screen**|Latar Amber, simbol Ink di tengah, tanpa teks. Durasi maksimum 1,2 detik — dan<br>pengumuman suara pertama dimulai_sebelum_splash selesai.|
|**Deck presentasi**|Latar Paper, judul Space Grotesk 44 pt, aksen Amber, dengan slide pembatas berlatar Ink.<br>Maksimum satu gagasan per slide.|
|**Media sosial**|Latar terang, teks besar, kontras tinggi. Seluruh gambar wajib memiliki teks alternatif;<br>seluruh video wajib bertakarir. Ini bukan formalitas — audiens produk ini ada di antara<br>pembacanya.|
|**Dokumen**|Mode terang, Atkinson Hyperlegible untuk isi, aksen Amber Deep untuk penanda.|



#### **14.2 Struktur file Figma** 

📁 `NetraSense Design System ├── 00 · Cover & Changelog ├── 01 · Foundations       warna (variables: terang · gelap · kontras ekstrem), tipografi, spasi ├── 02 · Iconography       set ikon 24/32 dp + uji buram ├── 03 · Components        tombol, kartu, alert, sheet, input — seluruh state ├── 04 · Patterns          layar navigasi, alur laporan, alur kontribusi ├── 05 · App Screens       aplikasi pengguna (dark, terkunci) ├── 06 · Contributor Web   web dApp (light + dark) ├── 07 · Accessibility     hasil uji kontras, catatan urutan fokus └── 08 · Brand Assets      logo, app icon, template deck, aset sosial` 

Seluruh warna wajib dibuat sebagai **Figma Variables** dengan mode terang, gelap, dan kontras ekstrem — bukan sebagai gaya warna terpisah. Ini yang membuat mode kontras ekstrem dapat diuji sejak tahap desain, bukan ditemukan bermasalah setelah dibangun. 

#### **14.3 Checklist serah terima ke engineering** 

Token warna diekspor sebagai JSON dengan ketiga mode 

Skala tipe terdokumentasi dengan nilai sp, bukan px 

Seluruh komponen memiliki dokumentasi state lengkap 

- Label pembaca layar tertulis untuk setiap elemen interaktif 

- Berkas audio earcon (WAV 48 kHz) terlampir 

Pola haptic terdokumentasi dalam milidetik dan intensitas 

Hasil uji kontras terlampir sebagai lampiran yang dapat diverifikasi ulang 

NetraSense — Design Brief & Design System v2.0 

24 

Prototipe alur kritis dapat dijalankan dengan pembaca layar aktif 

###### **Pengingat terakhir untuk tim desain** 

Produk ini akan dinilai bukan dari seberapa bagus tangkapan layarnya, melainkan dari apakah seseorang berhasil pulang dengan selamat sambil memakainya. Setiap kali ada pilihan antara terlihat mengesankan dan bekerja andal, pilih yang kedua — dan biarkan keandalan itu yang menjadi estetikanya. 

NetraSense — Design Brief & Design System v2.0 

25 

