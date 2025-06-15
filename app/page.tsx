"use client";

import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);

  // 입력값 변화 시 에러 메시지 초기화
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMsg("");
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMsg("");
  };

  // 로그인 버튼 클릭
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !password) {
      setErrorMsg("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    if (!email) {
      setErrorMsg("이메일을 입력해주세요.");
      return;
    }
    if (!password) {
      setErrorMsg("비밀번호를 입력해주세요.");
      return;
    }
    // 실제 서버 요청 대신 alert
    alert(`로그인 시도: ${email}`);
  };

  const isFormFilled = email.length > 0 && password.length > 0;

  return (
    <div className="min-h-screen bg-[#DDE7E7] flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          묵호 갤러리
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              이메일
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-0 h-full flex items-center pl-3 pointer-events-none">
                <FiMail className="text-gray-400 w-5 h-5" />
              </span>
              <input
                type="email"
                placeholder="이메일"
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border transition-all
                  ${
                    emailFocus
                      ? "border-emerald-500 border-2"
                      : "border-gray-300"
                  }
                  hover:border-emerald-500 focus:border-emerald-500
                  text-gray-900 placeholder-gray-500 outline-none select-text
                `}
                value={email}
                onChange={handleEmailChange}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                autoComplete="username"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              비밀번호
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-0 h-full flex items-center pl-3 pointer-events-none">
                <FiLock className="text-gray-400 w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                className={`
                  w-full pl-10 pr-10 py-3 rounded-lg bg-gray-50 border transition-all
                  ${pwFocus ? "border-emerald-500 border-2" : "border-gray-300"}
                  hover:border-emerald-500 focus:border-emerald-500
                  text-gray-900 placeholder-gray-500 outline-none select-text
                `}
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setPwFocus(true)}
                onBlur={() => setPwFocus(false)}
                autoComplete="current-password"
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
          {/* 에러 메시지 */}
          {errorMsg && (
            <div className="text-xs text-red-500 mb-5 text-left">
              {errorMsg}
            </div>
          )}
          <button
            type="submit"
            className={`
              w-full py-3 rounded-lg font-semibold transition-all
              ${
                isFormFilled
                  ? "bg-[#CEE5D5] hover:bg-[#B7D8C7] text-emerald-900 cursor-pointer"
                  : "bg-gray-300 text-gray-400 cursor-pointer"
              }
            `}
          >
            로그인
          </button>
        </form>
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
            onClick={() => (window.location.href = "/register")}
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}
