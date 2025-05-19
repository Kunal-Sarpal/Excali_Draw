import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card = ({ className = "", children }: CardProps) => {
  return (
    <div className={`rounded-xl bg-white shadow-md ${className}`}>
      {children}
    </div>
  );
};
