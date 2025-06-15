import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

interface RegisterPasswordConfirmInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focus: boolean;
  setFocus: (v: boolean) => void;
  touched: boolean;
  isValid: boolean;
}

export default function RegisterPasswordConfirmInput({
  value,
  onChange,
  focus,
  setFocus,
  touched,
  isValid,
}: RegisterPasswordConfirmInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        비밀번호 확인
      </label>
      <input
        type="password"
        className={`
          w-full px-4 py-3 rounded-lg bg-gray-50 border transition-all
          ${focus ? "border-emerald-500 border-2" : "border-gray-300"}
          hover:border-emerald-500 focus:border-emerald-500
          text-gray-900 placeholder-gray-500 outline-none select-text
        `}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoComplete="new-password"
        value={value}
        placeholder="비밀번호 확인"
        maxLength={20}
      />
      {(focus || touched) && (
        <div className="flex items-center gap-1 mt-2 text-xs text-black">
          {isValid ? (
            <FiCheckCircle className="text-emerald-500 mr-1" />
          ) : (
            <FiXCircle className="text-red-400 mr-1" />
          )}
          {isValid ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}
        </div>
      )}
    </div>
  );
}
