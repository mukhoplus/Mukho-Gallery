"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { PasswordValidation } from "@/types";

function ChangePwContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValid, setPasswordValid] = useState<PasswordValidation>({
    length: false,
    alphabet: false,
    number: false,
    special: false,
  });

  const [confirm, setConfirm] = useState("");
  const [confirmFocus, setConfirmFocus] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  // 비밀번호 유효성 검사
  const validatePassword = (pw: string) => {
    setPasswordValid({
      length: pw.length >= 8 && pw.length <= 20,
      alphabet: /[A-Za-z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[!@#$%^&*]/.test(pw),
    });
  };

  // 비밀번호 일치 여부
  const isConfirmValid = confirm.length > 0 && password === confirm;

  // 버튼 활성화 조건
  const isAllValid =
    Object.values(passwordValid).every(Boolean) && isConfirmValid;

  // 최초 focus 이후 안내 메시지 항상 표시
  if (passwordFocus && !passwordTouched) setPasswordTouched(true);
  if (confirmFocus && !confirmTouched) setConfirmTouched(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllValid) return;

    try {
      const response = await fetch("http://localhost:8080/api/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          newPassword: password,
        }),
      });

      if (response.ok) {
        alert("비밀번호가 변경되었습니다.");
        router.push("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 요청 중 오류 발생:", error);
      alert("서버 연결에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#DDE7E7] flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
        <div className="mb-6 relative select-none flex items-center justify-center">
          <h1
            className="text-3xl font-bold text-gray-900 text-center"
            onClick={() => router.push("/")}
            aria-label="메인으로"
            style={{ cursor: "pointer" }}
          >
            묵호 갤러리
          </h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6 select-none">
          비밀번호 변경
        </h2>
        <div className="mt-2 text-center text-gray-700 text-sm mb-4">
          이메일:{" "}
          <span className="text-emerald-600 font-semibold">{email}</span>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              새 비밀번호
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-0 h-full flex items-center pl-3 pointer-events-none">
                <FiLock className="text-gray-400 w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`
                  w-full pl-10 pr-10 py-3 rounded-lg bg-gray-50 border transition-all
                  ${
                    passwordFocus
                      ? "border-emerald-500 border-2"
                      : "border-gray-300"
                  }
                  hover:border-emerald-500 focus:border-emerald-500
                  text-black placeholder-gray-500 outline-none select-text
                `}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value.slice(0, 20));
                  validatePassword(e.target.value.slice(0, 20));
                }}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                autoComplete="new-password"
                placeholder="비밀번호"
                maxLength={20}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
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
            {(passwordFocus || passwordTouched) && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-black">
                <span className="flex items-center text-xs">
                  {passwordValid.length ? (
                    <FiCheckCircle className="text-emerald-500 mr-1" />
                  ) : (
                    <FiXCircle className="text-red-400 mr-1" />
                  )}
                  8-20자
                </span>
                <span className="flex items-center text-xs">
                  {passwordValid.alphabet ? (
                    <FiCheckCircle className="text-emerald-500 mr-1" />
                  ) : (
                    <FiXCircle className="text-red-400 mr-1" />
                  )}
                  영문자
                </span>
                <span className="flex items-center text-xs">
                  {passwordValid.number ? (
                    <FiCheckCircle className="text-emerald-500 mr-1" />
                  ) : (
                    <FiXCircle className="text-red-400 mr-1" />
                  )}
                  숫자
                </span>
                <span className="flex items-center text-xs">
                  {passwordValid.special ? (
                    <FiCheckCircle className="text-emerald-500 mr-1" />
                  ) : (
                    <FiXCircle className="text-red-400 mr-1" />
                  )}
                  특수문자
                </span>
              </div>
            )}
          </div>
          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              비밀번호 확인
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-0 h-full flex items-center pl-3 pointer-events-none">
                <FiLock className="text-gray-400 w-5 h-5" />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                className={`
                  w-full pl-10 pr-10 py-3 rounded-lg bg-gray-50 border transition-all
                  ${
                    confirmFocus
                      ? "border-emerald-500 border-2"
                      : "border-gray-300"
                  }
                  hover:border-emerald-500 focus:border-emerald-500
                  text-black placeholder-gray-500 outline-none select-text
                `}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value.slice(0, 20))}
                onFocus={() => setConfirmFocus(true)}
                onBlur={() => setConfirmFocus(false)}
                autoComplete="new-password"
                placeholder="비밀번호 확인"
                maxLength={20}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-0 h-full flex items-center pr-3 text-gray-400 hover:text-emerald-500"
                tabIndex={-1}
                aria-label="비밀번호 보기"
              >
                {showConfirm ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {(confirmFocus || confirmTouched) && (
              <div className="flex items-center gap-1 mt-2 text-xs text-black">
                {isConfirmValid ? (
                  <FiCheckCircle className="text-emerald-500 mr-1" />
                ) : (
                  <FiXCircle className="text-red-400 mr-1" />
                )}
                {isConfirmValid
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."}
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition-all
              ${
                isAllValid
                  ? "bg-[#CEE5D5] hover:bg-[#B7D8C7] text-emerald-900 cursor-pointer"
                  : "bg-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            disabled={!isAllValid}
          >
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ChangePwPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ChangePwContent />
    </Suspense>
  );
}
