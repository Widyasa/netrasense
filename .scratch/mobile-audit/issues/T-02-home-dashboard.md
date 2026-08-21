# T-02 — Home dashboard (P-05)

| Field | Value |
|---|---|
| **ID** | T-02 |
| **Prioritas** | Must R0 |
| **Layar PRD** | P-05 Beranda |
| **Fitur PRD** | F-06 Pencarian tujuan lewat suara · F-11 Riwayat dan rute tersimpan (minimal) |
| **Section PRD** | 7.1, 7.2, 9.1, 10.2 |
| **Blocked by** | T-01 (Onboarding screens) |
| **Blocks** | T-03, T-05, T-06, T-09, T-11 |

---

## Tujuan

Membuat beranda sebagai layar utama dengan 4 tab bawah: **Jalan · Baca · Riwayat · Atur**. Tab Jalan menampilkan aksi utama mulai jalan, pencarian cepat, dan rute tersimpan (jika ada).

---

## Acceptance criteria

| AC | Diberikan | Ketika | Maka |
|---|---|---|---|
| AC-05.x | Beranda dibuka | Aplikasi selesai onboarding | Tab aktif adalah Jalan; bottom nav 4 tab terlihat |
| AC-06.x | Tombol utama "Mulai jalan" ditekan | Di P-05 | Navigasi ke P-06 (voice search) |
| AC-06.x | Tombol pencarian suara ditekan | Di P-05 | Voice Orb masuk state listening, earcon "mendengarkan" berbunyi ≤150 ms |
| AC-11.x | Rute pernah ditempuh ≥3 kali | Beranda dibuka | Rute muncul sebagai pintasan tersimpan tanpa perlu diatur manual |
| AC-11.x | Tidak ada riwayat | Beranda pertama kali | Tidak ada section pintasan; UI tidak berantakan |
| AC-20.x | Mode kontras ekstrem aktif | Beranda dibuka | Tint dihilangkan, garis hitam 2 px, gradien/bayangan dimatikan |

---

## Implementasi

### Komponen baru

- `src/screens/HomeScreen.tsx` — tab Jalan.
- `src/components/BottomNav.tsx` — 4 tab dengan icon + label, target sentuh ≥64 dp, jarak antar target ≥16 dp.
- `src/components/ShortcutCard.tsx` — kartu rute tersimpan dengan skor aksesibilitas.
- `src/components/VoiceOrb.tsx` — reuse; tambahkan state listening.

### Hooks / logika

- `src/hooks/useSavedRoutes.ts` — baca riwayat perjalanan dari store/cache lokal, return rute yang pernah ditempuh ≥3 kali.
- `src/navigation/types.ts` — tipikasi rute/tab.

### Navigasi

- Bottom tab memicu perpindahan layar tanpa reload kamera.
- Dari Home tab Jalan → P-06 (voice search).
- Dari Home tab Baca → P-11 (read camera).
- Dari Home tab Riwayat → P-19 (trip history).
- Dari Home tab Atur → P-20 (settings).

### Desain base

- Latar `colors.paper`.
- Tombol aksi utama: background `colors.ink`, teks putih, touch target ≥88 dp.
- Voice Orb: `colors.violet` series.
- Bottom nav: active `colors.ink`, inactive `colors.ink2`.

---

## Proof of done

- [ ] Bottom nav 4 tab terlihat dan bisa berpindah tanpa error.
- [ ] Voice Orb di beranda memicu navigasi ke P-06.
- [ ] Rute yang sering dipakai muncul sebagai pintasan setelah data dummy/mock ≥3 perjalanan.
