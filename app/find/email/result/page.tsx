"use client";

export default function ResultPage() {
  const email = "example@domain.com"; // 실제 구현에서는 API Response에서 이메일을 받아와야 합니다

  return (
    <div className="min-h-screen bg-[#DDE7E7] flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
        {/* 상단 타이틀 */}
        <div className="mb-6 select-none">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            묵호 갤러리
          </h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6 select-none">
          이메일 찾기 결과
        </h2>
        <div className="text-center space-y-6">
          <p className="text-gray-700">
            회원님의 아이디는
            <br />
            <span className="font-semibold text-emerald-600 select-text">
              {email}
            </span>{" "}
            입니다
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-[#CEE5D5] hover:bg-[#B7D8C7] text-emerald-900 font-semibold py-3 rounded-lg transition-all"
          >
            로그인 하기
          </button>
        </div>
      </div>
    </div>
  );
}
