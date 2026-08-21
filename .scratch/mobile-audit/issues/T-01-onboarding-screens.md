# T-01 — Onboarding screens (P-01 · P-02 · P-03 · P-04)

| Field | Value |
|---|---|
| **ID** | T-01 |
| **Prioritas** | Must R0 |
| **Layar PRD** | P-01 Sambutan / splash bersuara · P-02 Pilih profil · P-03 Kalibrasi suara dan getaran · P-04 Permintaan izin akses |
| **Fitur PRD** | F-18 Onboarding dan profil pengguna · F-19 Pengaturan aksesibilitas |
| **Section PRD** | 7.1, 7.2, 11.3 (F-18 · F-19), 21, 22 |
| **Blocked by** | T-11 (Navigation structure & global gestures) — butuh routing dasar agar onboarding bisa memicu transisi ke beranda. |
| **Blocks** | T-02, T-03, T-04, T-05, T-06, T-09 |

---

## Tujuan

Membangun alur onboarding sekali-seumurhidup yang mengenalkan produk, memilih profil, menyesuaikan suara/getaran, dan meminta izin dengan bahasa konsekuensi — bukan nama teknis.

---

## Acceptance criteria

### P-01 — Sambutan / splash bersuara

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-18.1 | Aplikasi dibuka pertama kali | Splash ditampilkan | Sapaan suara dimulai pada detik ≤0,2, **sebelum** splash selesai — tidak menunggu layar siap |
| AC-18.x | Splash aktif | Layar disentuh atau gestur global | Splash bisa dilewati dengan ketukan/gerakan yang jelas (fallback untuk pengguna yang tidak sabar) |

### P-02 — Pilih profil

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-18.3 | Pengguna memilih profil | Profil disimpan | Ukuran teks baku, verbositas suara, dan ketersediaan mode kontributor menyesuaikan otomatis |
| AC-18.4 | Onboarding berjalan | Positioning produk disampaikan | Sistem menyatakan eksplisit bahwa NetraSense adalah **pelengkap tongkat, bukan pengganti** — pernyataan ini wajib dan tidak dapat dilewati |

### P-03 — Kalibrasi suara dan getaran

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-19.x | Kalibrasi suara | Slider kecepatan bicara digeser | Pratinjau langsung memakai kalimat contoh navigasi sungguhan, bukan lorem ipsum |
| AC-19.x | Kalibrasi haptic | Tombol tes ditekan | Pola `tap`, `double`, `longSharp` (hanya simulasi, tidak aktif di onboarding) diputar bergantian |
| AC-19.x | Reduce motion aktif | Di sistem perangkat | Animasi Voice Orb dihentikan; transisi layar diubah menjadi cross-fade sederhana |

### P-04 — Permintaan izin akses

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-18.2 | Onboarding berjalan | Izin diminta | Setiap izin dijelaskan lewat konsekuensinya ("tanpa ini saya tidak bisa melihat tiang di depan Anda"), bukan lewat nama teknisnya |
| AC-18.x | Izin ditolak | Pengguna menolak kamera/lokasi | Diberikan jalur ke pengaturan sistem dan penjelasan dampaknya, tanpa memaksa loop berulang |

---

## Implementasi

### Komponen baru

- `src/screens/OnboardingScreen.tsx` — container swipeable/halaman onboarding.
- `src/screens/ProfileSelectScreen.tsx`
- `src/screens/CalibrationScreen.tsx`
- `src/screens/PermissionScreen.tsx`
- `src/components/VoiceOrb.tsx` — perlu state `idle / listening / speaking / success / muted` (reuse komponen yang sudah ada).
- `src/components/AccessibleButton.tsx` — primary/amber/ghost/danger dengan 6 state (default, focused, pressed, loading, disabled, success).

### Hooks / logika

- `src/hooks/useOnboardingState.ts` — Zustand store: `hasCompletedOnboarding`, `profile`, `fontScale`, `speechRate`, `hapticEnabled`, `isContributor`.
- `src/hooks/usePermissions.ts` — wrapper izin kamera, lokasi, mikrofon dengan penjelasan konsekuensi.
- `src/services/tts.ts` — wrapper `expo-speech` dengan rate & bahasa Indonesia baku.

### Desain base

Gunakan token dari `packages/shared`:
- Warna: `colors.paper`, `colors.ink`, `colors.amber.solid/deep`, `colors.teal.solid/deep`, `colors.violet.solid/deep`.
- Tipografi: `typography.display` untuk judul layar, `bodyLg` untuk isi, `label` untuk tombol.
- Spasi: 24 dp padding tepi, 88 dp touch target untuk aksi utama.
- Bottom sheet tidak mengunci; semua dialog ditutup dengan ketukan dua jari/usap tiga jari.

### Aksesibilitas

- Semua tombol punya `accessibilityRole="button"` + `accessibilityLabel` + `accessibilityHint`.
- Headings pakai `accessibilityRole="header"`.
- Voice Orb memiliki `accessibilityLiveRegion` yang tepat.

---

## Proof of done

- [ ] Onboarding bisa diselesaikan dari splash sampai beranda di perangkat/Samsung S21 FE emulator.
- [ ] TalkBack mengumumkan setiap langkah dalam urutan yang benar.
- [ ] Pilih profil menyimpan preset yang terlihat di `zustand` devtools / log.
- [ ] Izin ditolak tidak menyebabkan crash atau loop.
