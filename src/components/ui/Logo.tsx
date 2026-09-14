import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  showText = true, 
  size = "md" 
}) => {
  const iconDimensions = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }[size];

  const textSizes = {
    sm: "text-base font-bold",
    md: "text-lg font-extrabold tracking-tight",
    lg: "text-xl font-extrabold tracking-tight",
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Stitch exact SVG mark */}
      <div className={`relative flex items-center justify-center bg-[#0B1220] dark:bg-slate-950 dark:border dark:border-white/10 rounded-xl text-white shadow-sm shrink-0 ${iconDimensions}`}>
        <div className="w-4/6 h-4/6 rounded-md bg-[#16A34A]/20 flex items-center justify-center">
          <svg
            className="w-3.5 h-3.5 text-[#16A34A]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {showText && (
        <span className={`text-[#0B1220] dark:text-white ${textSizes}`}>
          Student Career Kit
        </span>
      )}
    </div>
  );
};
