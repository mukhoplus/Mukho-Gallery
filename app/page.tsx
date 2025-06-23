"use client";

import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import LoginInput from "@/components/login/LoginInput";
import LoginPasswordInput from "@/components/login/LoginPasswordInput";
import LoginErrorMessage from "@/components/login/LoginErrorMessage";
import LoginSubmitButton from "@/components/login/LoginSubmitButton";
import LoginLinkRow from "@/components/login/LoginLinkRow";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMsg("");
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // 로그인 API 요청
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // 로그인 성공
        const data = await response.json();

        // JWT 토큰 저장 (실제로는 쿠키나 로컬 스토리지에 저장)
        localStorage.setItem("token", data.token);

        // 메인 페이지로 리다이렉트
        alert("로그인에 성공했습니다!");
        router.push("/");
      } else {
        // 서버에서 에러 응답
        const errorData = await response.json();
        setErrorMsg(errorData.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      // 네트워크 오류 등
      console.error("로그인 요청 실패:", error);
      setErrorMsg("서버 연결에 실패했습니다.");
    }
  };

  const isFormFilled = email.length > 0 && password.length > 0;

  return (
    <div className="min-h-screen bg-[#DDE7E7] flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          묵호 갤러리
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <LoginInput
            label="이메일"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            placeholder="이메일"
            icon={<FiMail className="text-gray-400 w-5 h-5" />}
            focus={emailFocus}
            autoComplete="username"
          />
          <LoginPasswordInput
            label="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => setPwFocus(true)}
            onBlur={() => setPwFocus(false)}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            icon={<FiLock className="text-gray-400 w-5 h-5" />}
            focus={pwFocus}
            autoComplete="current-password"
          />
          <LoginErrorMessage message={errorMsg} />
          <LoginSubmitButton isActive={isFormFilled}>로그인</LoginSubmitButton>
        </form>
        <LoginLinkRow
          onFindEmail={() => (window.location.href = "/find/email")}
          onFindPw={() => (window.location.href = "/find/pw")}
          onRegister={() => (window.location.href = "/register")}
        />
      </div>
    </div>
  );
}
