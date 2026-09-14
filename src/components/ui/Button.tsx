import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "emerald" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
    md: "text-sm px-4 py-2.5 gap-2 h-11",
    lg: "text-base px-6 py-3.5 gap-2.5 h-13 font-bold",
  }[size];

  const variantClasses = {
    primary: "bg-[#0B1220] hover:bg-[#1E293B] text-white focus:ring-[#0B1220] shadow-sm",
    emerald: "bg-[#16A34A] hover:bg-[#15803D] text-white focus:ring-[#16A34A] shadow-sm",
    secondary: "bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] hover:border-[#CBD5E1] focus:ring-slate-400 shadow-sm",
    ghost: "bg-transparent hover:bg-slate-100/80 text-[#64748B] hover:text-[#0F172A] border-transparent",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 shadow-sm",
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
