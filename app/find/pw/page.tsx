"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function FindPwPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 이메일 유효성 검사 (간단한 정규식)
  const isEmailValid = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailValid) {
      setErrorMsg("유효한 이메일 형식이 아닙니다.");
      return;
    }

    setErrorMsg("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/forgot-password?email=${email}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        alert("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
        router.push("/");
      } else if (response.status === 404) {
        setErrorMsg("입력하신 이메일을 찾을 수 없습니다.");
      } else {
        const errorData = await response.json();
        setErrorMsg(errorData.message || "서버 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 찾기 요청 중 오류 발생:", error);
      setErrorMsg("서버 연결에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#DDE7E7] flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
        <div className="mb-6 relative select-none flex items-center justify-center">
          <button
            onClick={() => router.push("/")}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="메인으로"
          >
            <FiArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            묵호 갤러리
          </h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6 select-none">
          비밀번호 찾기
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <p className="text-gray-700 text-center select-none">
            비밀번호를 찾고자하는 이메일을 입력해주세요.
          </p>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              이메일
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-emerald-500 outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errorMsg && (
              <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isEmailValid}
            className={`w-full font-semibold py-3 rounded-lg transition-all
              ${
                isEmailValid
                  ? "bg-[#CEE5D5] hover:bg-[#B7D8C7] text-emerald-900 cursor-pointer"
                  : "bg-gray-300 text-gray-400 cursor-not-allowed"
              }`}
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
