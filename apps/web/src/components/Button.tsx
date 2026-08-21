import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared button for NetraSense web surfaces.
 *
 * Variants follow DESIGN.md §21.5:
 * - primary : Ink fill, white text — the default primary action.
 * - amber   : Amber fill, Ink text — primary action on navigation screens.
 * - danger  : Red fill, white text — hazard/bahaya only.
 * - outline : Surface fill, Ink text, line border — secondary action.
 * - ghost   : Transparent, inherits parent text color. Works on both light
 *             and dark backgrounds because hover uses currentColor/10.
 *
 * Sizes follow the touch-target scale:
 * - default : 88 dp minimum height (primary actions).
 * - sm      : 64 dp minimum height (secondary actions).
 *
 * Every interactive surface gets the same pressed scale feedback. Loading,
 * disabled, and success states are left to the caller so the non-visual
 * announcement (screen reader / haptic) can be paired exactly with the action.
 */
export type ButtonVariant =
  | "primary"
  | "amber"
  | "danger"
  | "outline"
  | "ghost"
  | "network-dark";

export type ButtonSize = "default" | "sm";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-white hover:bg-ink-2 active:bg-ink-3",
  amber:
    "bg-amber text-ink hover:bg-amber/90 active:bg-amber/80",
  danger:
    "bg-red text-white hover:bg-red-deep active:bg-red-deep",
  outline:
    "border-2 border-line bg-surface text-ink hover:bg-alt active:bg-line",
  ghost:
    "bg-transparent text-current border-2 border-current hover:bg-current/10 active:opacity-80",
  "network-dark":
    "bg-violet-deep text-white hover:bg-violet active:bg-violet",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  default: "min-h-88 px-24 text-label",
  sm: "min-h-64 px-16 text-label",
};

const BASE_CLASS =
  "inline-flex items-center justify-center rounded-button transition active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-pressed"?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${BASE_CLASS} ${SIZE_CLASS[size]} ${VARIANT_CLASS[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
