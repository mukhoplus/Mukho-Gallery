import React from "react";

interface LoginLinkRowProps {
  onFindEmail: () => void;
  onFindPw: () => void;
  onRegister: () => void;
}

export default function LoginLinkRow({
  onFindEmail,
  onFindPw,
  onRegister,
}: LoginLinkRowProps) {
  return (
    <div className="mt-6 flex items-center justify-center space-x-4 text-center">
      <span
        className="text-sm text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors flex items-center"
        tabIndex={0}
        role="button"
        onClick={onFindEmail}
      >
        아이디 찾기
      </span>
      <span className="text-gray-400 flex items-center">|</span>
      <span
        className="text-sm text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors flex items-center"
        tabIndex={0}
        role="button"
        onClick={onFindPw}
      >
        비밀번호 찾기
      </span>
      <span className="text-gray-400 flex items-center">|</span>
      <span
        className="text-sm text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors flex items-center"
        tabIndex={0}
        role="button"
        onClick={onRegister}
      >
        회원가입
      </span>
    </div>
  );
}
