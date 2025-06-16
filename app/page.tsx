"use client";

import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import LoginInput from "@/components/login/LoginInput";
import LoginPasswordInput from "@/components/login/LoginPasswordInput";
import LoginErrorMessage from "@/components/login/LoginErrorMessage";
import LoginSubmitButton from "@/components/login/LoginSubmitButton";
import LoginLinkRow from "@/components/login/LoginLinkRow";

export default function Login() {
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
