import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = false,
  padding = "md",
  ...props
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }[padding];

  return (
    <div
      className={`bg-white dark:bg-slate-900/90 dark:border-slate-800 rounded-2xl border border-[#E2E8F0] shadow-[0px_1px_3px_rgba(15,23,42,0.05)] ${
        hoverEffect
          ? "hover:border-[#CBD5E1] dark:hover:border-slate-700 hover:shadow-[0px_8px_16px_-4px_rgba(15,23,42,0.08)] transition-all duration-200"
          : ""
      } ${paddingClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "emerald" | "navy" | "slate" | "amber" | "rose";
  className?: string;
}> = ({ children, variant = "slate", className = "" }) => {
  const variantStyles = {
    emerald: "bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]",
    navy: "bg-[#0B1220] text-white",
    slate: "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]",
    amber: "bg-amber-50 text-amber-800 border border-amber-200",
    rose: "bg-rose-50 text-rose-700 border border-rose-200",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold select-none ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
