import React from "react";

interface RegisterPhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

export default function RegisterPhoneInput({
  value,
  onChange,
  isValid,
}: RegisterPhoneInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        전화번호
      </label>
      <input
        type="tel"
        className={`
          w-full px-4 py-3 rounded-lg bg-gray-50 border transition-all
          border-gray-300 hover:border-emerald-500 focus:border-emerald-500
          text-gray-900 placeholder-gray-500 outline-none select-text
        `}
        value={value}
        onChange={onChange}
        placeholder="'-'을 제외한 숫자만 입력 (9~11자)"
        maxLength={11}
      />
      {value.length > 0 && !isValid && (
        <div className="text-xs text-red-500 mt-1 text-left">
          전화번호(9~11자)를 알맞게 입력해 주세요.
        </div>
      )}
    </div>
  );
}
