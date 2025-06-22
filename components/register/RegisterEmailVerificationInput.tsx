import { useState, useEffect } from "react";

interface RegisterEmailVerificationInputProps {
  email: string;
  onVerified: () => void;
  onResend: () => void;
}

export default function RegisterEmailVerificationInput({
  email,
  onVerified,
  onResend,
}: RegisterEmailVerificationInputProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분 타이머

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSubmit = async () => {
    if (code.length !== 6) {
      setError("6자리 코드를 입력해주세요");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (response.ok) {
        onVerified();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "인증에 실패했습니다");
      }
    } catch (err) {
      console.error("인증 요청 중 오류 발생:", err);
      setError("서버 연결에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    onResend();
    setTimeLeft(180); // 타이머 리셋
    setError("");
    setCode("");
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="6자리 인증 코드"
          maxLength={6}
          className="flex-1 px-3 py-2 border rounded-md text-black"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`px-4 py-2 rounded ${
            isLoading ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          {isLoading ? "확인 중..." : "확인"}
        </button>
      </div>

      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

      <div className="mt-3 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        </span>
        <button
          onClick={handleResend}
          disabled={timeLeft > 0}
          className={`text-sm ${
            timeLeft > 0 ? "text-gray-400" : "text-blue-500 underline"
          }`}
        >
          인증 코드 재전송
        </button>
      </div>
    </div>
  );
}
