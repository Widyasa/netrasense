import Link from "next/link";
import { Button } from "@/components/Button";

const STATS = [
  { label: "Poin\nkontribusi", value: "0" },
  { label: "Misi\nselesai", value: "0" },
  { label: "Reputasi", value: "Baru" },
];

const MISSIONS = [
  {
    title: "Petakan trotoar Jl. Sudirman",
    detail: "1,2 km · 3 titik bahaya belum terverifikasi",
    status: "Terbuka",
  },
  {
    title: "Validasi data Taman Menteng",
    detail: "8 pengamatan menunggu validasi dua penyaksi",
    status: "Menunggu",
  },
  {
    title: "Rekam jalur Stasiun Manggarai",
    detail: "Rute baru, belum ada kontributor",
    status: "Terbuka",
  },
];

const STATUS_CLASS: Record<string, string> = {
  Terbuka: "bg-teal-deep text-teal",
  Menunggu: "bg-amber-deep text-amber",
};

function LayerBadge() {
  return (
    <div className="w-fit rounded-button bg-violet-deep/60 px-8 py-4 text-caption font-bold text-violet">
      <span className="inline-flex items-center gap-8">
        <span className="h-8 w-8 rounded-full bg-violet" aria-hidden="true" />
        Lapisan kontributor
      </span>
    </div>
  );
}

export default function ContributePage() {
  return (
    <main className="min-h-screen bg-dark-bg px-24 py-32 text-white">
      <div className="mx-auto flex max-w-md flex-col gap-32">
        <header className="flex flex-col gap-16 text-left">
          <LayerBadge />
          <h1 className="text-title-lg font-display text-white">Kontributor</h1>
          <p className="max-w-[60ch] text-body text-white/60">
            Lihat misi pemetaan, rekam jalur, dan kelola kontribusi Anda. Setiap
            titik data yang Anda kumpulkan membantu teman tunanetra bergerak
            lebih percaya diri.
          </p>
        </header>

        <section aria-labelledby="stats-heading" className="grid grid-cols-3 gap-16">
          <h2 id="stats-heading" className="sr-only">
            Ringkasan kontribusi
          </h2>
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col justify-center gap-4 rounded-card border border-white/5 bg-ink p-16"
            >
              <span className="text-title font-display text-white">
                {s.value}
              </span>
              <span className="whitespace-pre-line text-caption text-white/60">
                {s.label}
              </span>
            </div>
          ))}
        </section>

        <section aria-labelledby="missions-heading" className="flex flex-col gap-16">
          <h2 id="missions-heading" className="text-title text-white">
            Misi pemetaan
          </h2>
          <ul className="flex flex-col gap-16">
            {MISSIONS.map((m) => (
              <li
                key={m.title}
                className="flex flex-col gap-8 rounded-card border border-white/5 bg-ink p-24"
              >
                <div className="flex items-start justify-between gap-12">
                  <p className="text-label text-white">{m.title}</p>
                  <span
                    className={`shrink-0 rounded-button px-12 py-8 text-caption font-bold ${STATUS_CLASS[m.status]}`}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="text-body text-white/60">{m.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <Button
          type="button"
          variant="network-dark"
          disabled
          className="w-full"
        >
          Mulai rekam jalur (segera hadir)
        </Button>

        <Button variant="ghost" size="sm" href="/" className="w-full">
          Kembali
        </Button>
      </div>
    </main>
  );
}
