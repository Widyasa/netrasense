import Link from "next/link";
import { Badge } from "@/components/Badge";

const NETWORK_STATS = [
  { label: "Titik data terverifikasi", value: "128.4k" },
  { label: "Kontributor aktif", value: "1.930" },
  { label: "Kota tercakup", value: "12" },
];

const PROPOSALS = [
  {
    title: "Prioritaskan pemetaan trotoar Surabaya Q3",
    status: "Pemungutan suara",
  },
  {
    title: "Naikkan pengganda imbalan validator baru",
    status: "Menunggu kuorum",
  },
];

export default function DappPage() {
  return (
    <main className="min-h-screen bg-paper p-6 pb-16 text-ink">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <header className="flex flex-col gap-3 pt-4 text-left">
          <Badge color="violet" size="sm">
            Jaringan Proof-of-Path
          </Badge>
          <h1 className="text-title-lg text-ink">dApp Jaringan</h1>
          <p className="max-w-md text-body text-ink-2">
            Hubungkan sidik jari Anda, klaim poin kontribusi, dan ikut tata
            kelola jaringan yang menentukan prioritas pemetaan kota.
          </p>
        </header>

        <section aria-labelledby="network-stats" className="grid grid-cols-3 gap-4">
          <h2 id="network-stats" className="sr-only">
            Statistik jaringan
          </h2>
          {NETWORK_STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 rounded-card border border-line bg-surface p-4"
            >
              <span className="text-title font-display text-violet-deep">
                {s.value}
              </span>
              <span className="text-caption text-ink-2">{s.label}</span>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6">
          <h2 className="text-title text-ink">Kunci di ponsel</h2>
          <p className="text-body text-ink-2">
            Identitas Anda di jaringan dibuat otomatis dan dikunci sidik jari —
            tidak ada kata sandi atau frasa rahasia untuk diingat.
          </p>
          <button
            type="button"
            className="flex min-h-[88px] w-full items-center justify-center rounded-card bg-violet px-6 text-label text-white transition active:scale-[0.97]"
          >
            Hubungkan dengan sidik jari
          </button>
        </section>

        <section aria-labelledby="governance-heading" className="flex flex-col gap-4">
          <h2 id="governance-heading" className="text-title text-ink">
            Governance
          </h2>
          <ul className="flex flex-col gap-4">
            {PROPOSALS.map((p) => (
              <li
                key={p.title}
                className="flex items-start justify-between gap-3 rounded-card border border-line bg-surface p-5"
              >
                <p className="text-label text-ink">{p.title}</p>
                <Badge color="violet" size="sm">
                  {p.status}
                </Badge>
              </li>
            ))}
          </ul>
        </section>

        <Link
          href="/"
          className="flex min-h-[64px] items-center justify-center rounded-button border-2 border-ink bg-surface px-6 text-label text-ink"
        >
          Kembali
        </Link>
      </div>
    </main>
  );
}
