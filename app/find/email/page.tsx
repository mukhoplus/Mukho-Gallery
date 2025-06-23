"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function FindEmailPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams({
        name: name.trim(),
        birthdate: birthDate, // yyyy-mm-dd
      });
      const response = await fetch(`/api/user/find-id?${params.toString()}`, {
        method: "GET",
      });

      if (response.ok) {
        const email = await response.text();
        // 결과 페이지로 email 쿼리 전달
        router.push(`/find/email/result?email=${encodeURIComponent(email)}`);
      } else if (response.status === 404) {
        alert("입력한 정보를 가진 회원이 없습니다.");
      } else {
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("아이디 찾기 요청 중 오류 발생:", error);
      alert("서버 연결에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#DDE7E7] flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
        {/* 상단 타이틀 + 화살표 */}
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
          이메일 찾기
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              이름
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-emerald-500 outline-none text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              autoComplete="name"
              maxLength={10}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              생년월일
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-emerald-500 outline-none text-black"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#CEE5D5] hover:bg-[#B7D8C7] text-emerald-900 font-semibold py-3 rounded-lg transition-all"
          >
            아이디 찾기
          </button>
        </form>
      </div>
    </div>
  );
}
