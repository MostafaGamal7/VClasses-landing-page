import { useTranslations } from "next-intl";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  translationKey?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export default function Button({
  children,
  translationKey,
  variant = "primary",
  size = "md",
  className = "",
  style: propStyle = {},
  href,
}: ButtonProps) {
  const t = useTranslations();
  const baseStyles = `font-medium transition-all shadow-md hover:shadow-lg cursor-pointer text-center flex flex-center`;

  const variants = {
    primary:
      "bg-linear-to-t from-primary-hover to-primary text-white hover:from-primary-hover hover:to-primary",
    secondary: "bg-gray-100 text-secondary hover:bg-gray-200",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "text-xs md:text-sm px-8 py-2 md:px-16 md:py-2",
    md: "text-sm md:text-base px-8 py-2 md:px-16 md:py-2 rounded-md",
    lg: "text-sm md:text-base text-nowrap px-8 py-2  md:px-16 md:py-4",
  };

  return (
    <Link
      href={href || "#enroll"}
      className={[
        baseStyles,
        variants[variant],
        sizes[size],
        "rounded-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...propStyle,
      }}
    >
      {translationKey ? t(translationKey) : children}
    </Link>
  );
}
