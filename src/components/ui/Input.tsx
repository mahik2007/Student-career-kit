import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider select-none flex items-center justify-between"
        >
          <span>{label}</span>
          {props.required && <span className="text-emerald-600 font-bold">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full h-11 px-3.5 bg-white border rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-[#CBD5E1]"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-[#64748B]">{helperText}</span>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  rows = 4,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider select-none flex items-center justify-between"
        >
          <span>{label}</span>
          {props.required && <span className="text-emerald-600 font-bold">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={`w-full p-3 bg-white border rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-[#CBD5E1]"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-[#64748B]">{helperText}</span>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = "",
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider select-none"
        >
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={`w-full h-11 px-3.5 bg-white border rounded-lg text-sm text-[#0F172A] transition-colors focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 ${
          error ? "border-red-500" : "border-[#CBD5E1]"
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
