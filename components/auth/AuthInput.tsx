import React from "react";

interface AuthInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder?: string;
  icon?: React.ReactNode;
  focus: boolean;
  autoComplete?: string;
}

export default function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  icon,
  focus,
  autoComplete,
}: AuthInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-0 h-full flex items-center pl-3 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`
            w-full ${
              icon ? "pl-10" : "pl-4"
            } pr-4 py-3 rounded-lg bg-gray-50 border transition-all
            ${focus ? "border-emerald-500 border-2" : "border-gray-300"}
            hover:border-emerald-500 focus:border-emerald-500
            text-gray-900 placeholder-gray-500 outline-none select-text
          `}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}
