import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface LoginPasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  focus: boolean;
  icon?: React.ReactNode;
  autoComplete?: string;
}

export default function LoginPasswordInput({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  showPassword,
  setShowPassword,
  focus,
  icon,
  autoComplete,
}: LoginPasswordInputProps) {
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
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          className={`
            w-full pl-10 pr-10 py-3 rounded-lg bg-gray-50 border transition-all
            ${focus ? "border-emerald-500 border-2" : "border-gray-300"}
            hover:border-emerald-500 focus:border-emerald-500
            text-gray-900 placeholder-gray-500 outline-none select-text
          `}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete={autoComplete}
          maxLength={20}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 h-full flex items-center pr-3 text-gray-400 hover:text-emerald-500"
          tabIndex={-1}
          aria-label="비밀번호 보기"
        >
          {showPassword ? (
            <FiEyeOff className="w-5 h-5" />
          ) : (
            <FiEye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
