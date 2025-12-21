import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  href?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  variant = "dark",
  className,
  href = "/",
  width = 120,
  height = 40,
}: LogoProps) {
  const logoSrc =
    variant === "light"
      ? "/images/logo/tleyou-logo-white.svg"
      : "/images/logo/tleyou-logo-black.svg";

  const logoElement = (
    <img
      src={logoSrc}
      alt="TLEYOU"
      width={width}
      height={height}
      className={cn("h-auto", className)}
      style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
    />
  );

  return (
    <Link href={href} className="inline-block">
      {logoElement}
    </Link>
  );
}

