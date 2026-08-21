import Link from "next/link";

/**
 * NetraMark — a simple, single-color mark that reads as both a directional
 * pulse (forward arrow) and an echo wave. It replaces the generic
 * "rounded-square-with-a-dot" placeholder while staying recognizable at
 * small sizes and in one color (e.g. Braille/timbul).
 *
 * The rounded chassis uses the same `small` radius token (12dp) as the
 * rest of the page, so the logo does not introduce a third radius value.
 */
function NetraMark() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="32" height="32" rx="12" fill="#14181F" />
      {/* Forward echo: two arcs and a right-facing stroke. */}
      <path
        d="M8 20c4-6 12-6 16 0"
        stroke="#FFC53D"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 22c2-4 6-4 8 0"
        stroke="#FFC53D"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 14l5 6-5 6"
        stroke="#FFC53D"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-between bg-paper px-24 py-32">
      <header className="flex flex-col items-start gap-24">
        <NetraMark />
        <div className="flex flex-col items-start gap-8">
          <h1 className="text-display font-display text-ink">
            Netra<span className="text-amber-deep">Sense</span>
          </h1>
          <p className="max-w-[60ch] text-body-lg text-ink-2">
            Asisten navigasi spasial untuk penyandang tunanetra dan low vision.
          </p>
        </div>
      </header>

      <section
        aria-label="Menu utama"
        className="flex w-full max-w-md flex-col gap-16"
      >
        <Link
          href="/navigate"
          className="flex min-h-88 w-full items-center justify-start rounded-button bg-ink px-24 text-label text-white transition active:scale-[0.97]"
        >
          Mulai navigasi
        </Link>

        <div className="flex w-full flex-col gap-16">
          <Link
            href="/contribute"
            className="flex min-h-64 w-full items-center justify-start rounded-button border-2 border-line bg-surface px-24 text-label text-ink transition active:scale-[0.97]"
          >
            Kontributor
          </Link>
          <Link
            href="/dapp"
            className="flex min-h-64 w-full items-center justify-start rounded-button border-2 border-line bg-surface px-24 text-label text-ink transition active:scale-[0.97]"
          >
            dApp Jaringan
          </Link>
        </div>

        <p className="max-w-[60ch] text-caption text-ink-2">
          Didukung peta aksesibilitas yang dibangun dan dimiliki komunitasnya sendiri.
        </p>
      </section>
    </main>
  );
}
