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
  // 입력값에서 한글, 영어 대소문자만 허용
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyKoreanEnglish = e.target.value.replace(
      /[^a-zA-Zㄱ-ㅎ가-힣]/g,
      ""
    );
    // 부모의 onChange에 가공된 이벤트 전달
    onChange({
      ...e,
      target: {
        ...e.target,
        value: onlyKoreanEnglish,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
      </label>
      <input
        type="text"
        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 hover:border-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 outline-none select-text transition-all"
        value={value}
        onChange={handleInput}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
}
