import React from "react";

interface AuthLinkRowProps {
  onRegister: () => void;
}

export default function AuthLinkRow({ onRegister }: AuthLinkRowProps) {
  return (
    <div className="mt-6 text-center space-x-4 flex justify-center">
      <span
        className="text-sm text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors"
        tabIndex={0}
        role="button"
      >
        아이디 찾기
      </span>
      <span className="text-gray-400">|</span>
      <span
        className="text-sm text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors"
        tabIndex={0}
        role="button"
      >
        비밀번호 찾기
      </span>
      <span className="text-gray-400">|</span>
      <span
        className="text-sm text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors"
        tabIndex={0}
        role="button"
        onClick={onRegister}
      >
        회원가입
      </span>
    </div>
  );
}
