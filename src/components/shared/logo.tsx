import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark" | "auto";
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { height: 36, className: "h-9 w-auto" },
  md: { height: 44, className: "h-10 w-auto md:h-11" },
  lg: { height: 64, className: "h-14 w-auto md:h-16" },
};

/** Brand logo used in navbar, footer, and mobile drawer. */
export function Logo({ variant = "auto", className, size = "md" }: LogoProps) {
  const dim = sizes[size];

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span
        className={cn(
          "inline-flex overflow-hidden rounded-xl transition-transform group-hover:scale-[1.02]",
          variant === "light" && "bg-white/95 p-1 shadow-sm",
          variant === "dark" && "bg-white p-1 shadow-soft"
        )}
      >
        <Image
          src={siteConfig.logo}
          alt={siteConfig.name}
          width={dim.height}
          height={dim.height}
          className={cn(dim.className, "object-contain")}
          priority
        />
      </span>
    </Link>
  );
}
