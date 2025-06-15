import React from "react";

interface RegisterInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
}

export default function RegisterInput({
  label,
  value,
  onChange,
  maxLength = 50,
  placeholder,
  autoComplete,
}: RegisterInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
      </label>
      <input
        type="text"
        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 hover:border-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 outline-none select-text transition-all"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
}
