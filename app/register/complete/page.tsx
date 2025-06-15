"use client";

import { useRouter } from "next/navigation";

export default function RegisterComplete() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#DDE7E7] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          회원가입이 완료되었습니다!
        </h2>
        <p className="text-gray-700 mb-8 text-center">
          묵호 갤러리에 오신 것을 환영합니다.
        </p>
        <button
          onClick={() => router.push("/")}
          className="w-full bg-[#CEE5D5] hover:bg-[#B7D8C7] text-emerald-900 font-semibold py-3 rounded-lg transition-all"
        >
          로그인하러 가기
        </button>
      </div>
    </div>
  );
}
