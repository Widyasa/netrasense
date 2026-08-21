import type { ReactNode } from "react";

/**
 * Shared badge/pill used across NetraSense web surfaces.
 *
 * Consistency rules:
 * - `sm`  : caption bold, used for header tags and small status pills.
 * - `md`  : label bold, used for prominent status badges.
 * - Colors use the project token pairs so contrast is always AA/AAA.
 */
export type BadgeColor =
  | "ink"
  | "violet"
  | "teal"
  | "amber"
  | "green"
  | "orange"
  | "red";

export type BadgeSize = "sm" | "md";

const COLOR_CLASS: Record<BadgeColor, string> = {
  ink: "bg-ink-3 text-white",
  violet: "bg-violet-tint text-violet-deep",
  teal: "bg-teal-tint text-teal-deep",
  amber: "bg-amber-tint text-amber-deep",
  green: "bg-green-tint text-green-deep",
  orange: "bg-orange-tint text-orange-deep",
  red: "bg-red-deep text-white",
};

const SIZE_CLASS: Record<
  BadgeSize,
  { box: string; icon: string }
> = {
  sm: { box: "px-12 py-4 text-caption font-bold", icon: "h-16 w-16" },
  md: { box: "px-16 py-12 text-label font-bold", icon: "h-24 w-24" },
};

export function Badge({
  children,
  color,
  size = "sm",
  icon,
}: {
  children: ReactNode;
  color: BadgeColor;
  size?: BadgeSize;
  icon?: ReactNode;
}) {
  const { box, icon: iconSize } = SIZE_CLASS[size];
  return (
    <span
      className={`inline-flex items-center gap-8 rounded-button ${box} ${COLOR_CLASS[color]}`}
    >
      {icon ? (
        <span className={`flex shrink-0 items-center justify-center ${iconSize}`}>
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}
