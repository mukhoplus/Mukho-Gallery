import React from "react";

interface RegisterEmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focus: boolean;
  setFocus: (v: boolean) => void;
  isVerified: boolean;
  isValid: boolean;
  showError: boolean;
  isVerificationSent: boolean;
  onSendVerification: () => void;
}

export default function RegisterEmailInput({
  value,
  onChange,
  focus,
  setFocus,
  isVerified,
  isValid,
  showError,
  isVerificationSent,
  onSendVerification,
}: RegisterEmailInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        이메일
      </label>
      <div className="flex gap-2">
        <input
          type="email"
          className={`
            w-full px-4 py-3 rounded-lg bg-gray-50 border transition-all
            ${focus ? "border-emerald-500 border-2" : "border-gray-300"}
            hover:border-emerald-500 focus:border-emerald-500
            text-gray-900 placeholder-gray-500 outline-none select-text
          `}
          placeholder="example@domain.com"
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          disabled={isVerified}
          autoComplete="username"
        />
        <button
          type="button"
          className={`
            px-4 whitespace-nowrap rounded-lg font-semibold transition-all
            ${
              isValid && !isVerified
                ? "text-emerald-900 bg-[#CEE5D5] hover:bg-[#B7D8C7] cursor-pointer"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
            }
          `}
          onClick={onSendVerification}
          disabled={!isValid || isVerified}
        >
          {isVerificationSent ? "재전송" : "인증"}
        </button>
      </div>
      {showError && (
        <div className="text-xs text-red-500 mt-1">
          이메일 형식이 올바르지 않습니다.
        </div>
      )}
      {isVerified && (
        <div className="text-xs text-emerald-500 mt-1">인증되었습니다.</div>
      )}
    </div>
  );
}
