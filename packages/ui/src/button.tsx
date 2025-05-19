"use client";
import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "outline" | "secondary";
  size: "lg" | "sm";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const Button = ({ variant, size, className = "", onClick, children }: ButtonProps) => {
  const baseStyles = "rounded rounded-xl font-medium transition-colors p-2 flex justify-center items-center";
  const sizeStyles = size === "lg" ? "px-6 py-3 text-base" : "px-3 py-2 text-sm";

  const variantStyles = {
    primary:
      "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[color:var(--primary)/0.9]",
    secondary:
      "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[color:var(--secondary)/0.8] shadow-sm",
    outline:
      "border border-[var(--input)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
  }[variant];

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};
