import React from "react";
import { cn } from "../../utils/cn";

interface BadgeProps {
  variant: "active" | "inactive" | "pending";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  const variants = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
};
