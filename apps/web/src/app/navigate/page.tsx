"use client";

import {
  Car,
  Circle,
  DotsThree,
  Signpost,
  Tree,
  User,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { VoiceOrb } from "@/components/VoiceOrb";

type HazardLevel = "aman" | "waspada" | "kepala" | "kritis";

interface DemoHazard {
  level: HazardLevel;
  class: string;
  distanceMeters: number | null;
  instruction: string;
}

const DEMO_SEQUENCE: DemoHazard[] = [
  {
    level: "aman",
    class: "jalan",
    distanceMeters: null,
    instruction: "Jalan kosong, lanjutkan.",
  },
  {
    level: "waspada",
    class: "tiang",
    distanceMeters: 2.0,
    instruction: "Tiang, dua langkah, kanan.",
  },
  {
    level: "kepala",
    class: "dahan",
    distanceMeters: 1.5,
    instruction: "Dahan rendah, satu setengah meter.",
  },
  {
    level: "kritis",
    class: "lubang",
    distanceMeters: 0.8,
    instruction: "Berhenti. Ada lubang terbuka di depan.",
  },
];

const REPORT_TYPES: {
  value: string;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "person", label: "Orang", icon: User },
  { value: "pole", label: "Tiang", icon: Signpost },
  { value: "vehicle", label: "Kendaraan", icon: Car },
  { value: "branch", label: "Dahan", icon: Tree },
  { value: "hole", label: "Lubang", icon: Circle },
  { value: "other", label: "Lainnya", icon: DotsThree },
];

const LEVEL_LABEL: Record<HazardLevel, string> = {
  aman: "Aman",
  waspada: "Waspada",
  kepala: "Kepala",
  kritis: "Kritis",
};

const LEVEL_STATUS_CLASS: Record<HazardLevel, string> = {
  aman: "bg-green-deep text-white",
  waspada: "bg-orange-deep text-white",
  kepala: "bg-amber-deep text-white",
  kritis: "bg-red-deep text-white",
};

const LEVEL_DOT_CLASS: Record<HazardLevel, string> = {
  aman: "bg-green",
  waspada: "bg-orange",
  kepala: "bg-amber",
  kritis: "bg-red",
};

function HazardShape({
  level,
  size = 32,
}: {
  level: HazardLevel;
  size?: number;
}) {
  const s = size;
  const stroke = size >= 48 ? 2.5 : 2;
  switch (level) {
    case "aman":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="#22A45D" strokeWidth={stroke} />
        </svg>
      );
    case "waspada":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            points="12,3 21,20 3,20"
            stroke="#EE7B22"
            strokeWidth={stroke}
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "kepala":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            points="3,4 21,4 12,21"
            stroke="#FFC53D"
            strokeWidth={stroke}
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "kritis":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            points="8,2 16,2 22,8 22,16 16,22 8,22 2,16 2,8"
            stroke="#8F1F1F"
            strokeWidth={stroke}
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
  }
}

function NavigationStatus({ isDemo }: { isDemo: boolean }) {
  return (
    <div className="inline-flex min-h-64 items-center gap-8 rounded-button bg-teal-deep px-16 text-caption text-white">
      <span className="h-12 w-12 rounded-full bg-teal" aria-hidden="true" />
      {isDemo ? "Demo aktif" : "Navigasi aktif"}
    </div>
  );
}

/**
 * Dev-only toggle switch. The label sits outside the track so the whole
 * element reads as a standard switch, not a button that swallows its text.
 */
function DemoToggle({
  isOn,
  onToggle,
}: {
  isOn: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex min-h-64 items-center gap-8 px-12 text-caption text-white/70 transition active:scale-[0.97]"
      aria-pressed={isOn}
    >
      Demo
      <span
        className={`relative flex h-24 w-48 items-center rounded-full transition-colors ${
          isOn ? "bg-amber" : "bg-white/20"
        }`}
      >
        <span
          className="absolute top-4 left-4 h-16 w-16 rounded-full bg-white transition-transform"
          style={{ transform: isOn ? "translateX(24px)" : "translateX(0)" }}
        />
      </span>
    </button>
  );
}

export default function NavigatePage() {
  const [isDemo, setIsDemo] = useState(false);
  const [index, setIndex] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const [reported, setReported] = useState<string | null>(null);

  useEffect(() => {
    if (!isDemo) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % DEMO_SEQUENCE.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isDemo]);

  const current = useMemo(
    () => (isDemo ? DEMO_SEQUENCE[index] : DEMO_SEQUENCE[0]),
    [isDemo, index],
  );
  const isKritis = current.level === "kritis";
  const orbState = current.level === "aman" ? "idle" : "listening";

  return (
    <main className="relative min-h-screen bg-ink text-white">
      <div className="relative flex min-h-screen flex-col px-24 py-32">
        {/* Top bar — product status on the left, dev toggle isolated on the right */}
        <div className="flex items-center justify-between gap-16">
          <NavigationStatus isDemo={isDemo} />
          <DemoToggle isOn={isDemo} onToggle={() => setIsDemo((v) => !v)} />
        </div>

        {/* Main status — intentionally placed in upper area, not dead-center */}
        <div className="mt-48 flex flex-col items-start gap-32">
          <VoiceOrb state={orbState} size={160} />
          <p className="max-w-[60ch] text-display text-white">
            {current.instruction}
          </p>
        </div>

        {/* Actions — grouped at the bottom, thumb zone */}
        <div className="mt-auto flex w-full max-w-md flex-col items-start gap-32 pt-48">
          <div
            className={`flex min-h-64 w-full items-center gap-12 rounded-button px-16 text-label ${LEVEL_STATUS_CLASS[current.level]}`}
          >
            <span
              className={`h-16 w-16 rounded-full ${LEVEL_DOT_CLASS[current.level]}`}
              aria-hidden="true"
            />
            <span>{LEVEL_LABEL[current.level]}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{current.class}</span>
            {current.distanceMeters != null && (
              <>
                <span aria-hidden="true">·</span>
                <span>{current.distanceMeters.toFixed(1)} m</span>
              </>
            )}
          </div>

          <Button
            variant="amber"
            className="w-full"
            onClick={() => setReportOpen(true)}
          >
            Laporkan hambatan
          </Button>
          <Button variant="ghost" size="sm" href="/" className="w-full">
            Tutup navigasi
          </Button>
        </div>
      </div>

      {/* Critical hazard full-screen overlay — no animation */}
      {isKritis && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed inset-0 z-50 flex flex-col items-start justify-center gap-24 bg-red-deep p-24 text-white"
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <polygon
              points="8,2 16,2 22,8 22,16 16,22 8,22 2,16 2,8"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-display">Kritis</p>
          <p className="max-w-[60ch] text-title">{current.instruction}</p>
        </div>
      )}

      {/* Bottom sheet modal for report type selection */}
      {reportOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-start bg-black/50">
          <div className="w-full max-w-lg rounded-t-card bg-paper p-24 text-ink">
            <div className="mb-16 flex items-center justify-between gap-16">
              <h2 className="text-title text-ink">Laporkan hambatan</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReportOpen(false)}
                aria-label="Tutup laporan"
              >
                Tutup
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-16">
              {REPORT_TYPES.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => {
                      setReported(t.label);
                      setReportOpen(false);
                    }}
                    className="flex min-h-64 items-center gap-12 rounded-button border-2 border-line bg-surface px-16 text-left text-label text-ink transition active:scale-[0.97]"
                  >
                    <Icon
                      weight="bold"
                      className="h-24 w-24 shrink-0 text-ink"
                      aria-hidden="true"
                    />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {reported && (
        <div className="fixed bottom-24 left-24 z-40">
          <Badge color="green" size="sm">
            Laporan &ldquo;{reported}&rdquo; terkirim
          </Badge>
        </div>
      )}
    </main>
  );
}
