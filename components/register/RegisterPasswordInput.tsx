import React from "react";
import { PasswordValidation } from "@/types";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

interface RegisterPasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focus: boolean;
  setFocus: (v: boolean) => void;
  touched: boolean;
  label?: string;
  validState: PasswordValidation;
}

export default function RegisterPasswordInput({
  value,
  onChange,
  focus,
  setFocus,
  touched,
  label = "비밀번호",
  validState,
}: RegisterPasswordInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
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
        placeholder="비밀번호"
        maxLength={20}
      />
      {(focus || touched) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-black">
          <span className="flex items-center text-xs">
            {validState.length ? (
              <FiCheckCircle className="text-emerald-500 mr-1" />
            ) : (
              <FiXCircle className="text-red-400 mr-1" />
            )}
            8-20자
          </span>
          <span className="flex items-center text-xs">
            {validState.alphabet ? (
              <FiCheckCircle className="text-emerald-500 mr-1" />
            ) : (
              <FiXCircle className="text-red-400 mr-1" />
            )}
            영문자
          </span>
          <span className="flex items-center text-xs">
            {validState.number ? (
              <FiCheckCircle className="text-emerald-500 mr-1" />
            ) : (
              <FiXCircle className="text-red-400 mr-1" />
            )}
            숫자
          </span>
          <span className="flex items-center text-xs">
            {validState.special ? (
              <FiCheckCircle className="text-emerald-500 mr-1" />
            ) : (
              <FiXCircle className="text-red-400 mr-1" />
            )}
            특수문자
          </span>
        </div>
      )}
    </div>
  );
}
