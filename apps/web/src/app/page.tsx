import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6 text-center">
      <h1 className="text-display text-ink">NetraSense</h1>
      <p className="max-w-md text-body-lg text-ink-2">
        Asisten navigasi spasial untuk penyandang tunanetra dan low vision.
      </p>
      <div className="flex w-full max-w-xs flex-col gap-4">
        <Link
          href="/navigate"
          className="flex h-88 min-h-[88px] items-center justify-center rounded-button bg-ink px-6 text-label text-white"
        >
          Mulai navigasi
        </Link>
        <Link
          href="/contribute"
          className="flex h-64 min-h-[64px] items-center justify-center rounded-button border-2 border-ink bg-surface px-6 text-label text-ink"
        >
          Kontributor
        </Link>
        <Link
          href="/dapp"
          className="flex h-64 min-h-[64px] items-center justify-center rounded-button bg-violet px-6 text-label text-white"
        >
          dApp Jaringan
        </Link>
      </div>
    </main>
  );
}
