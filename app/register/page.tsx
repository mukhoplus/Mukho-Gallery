"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

import RegisterEmailInput from "@/components/register/RegisterEmailInput";
import RegisterPasswordInput from "@/components/register/RegisterPasswordInput";
import RegisterPasswordConfirmInput from "@/components/register/RegisterPasswordConfirmInput";
import RegisterInput from "@/components/register/RegisterInput";
import RegisterGenderSelect from "@/components/register/RegisterGenderSelect";
import RegisterDatePicker from "@/components/register/RegisterDatePicker";
import RegisterPhoneInput from "@/components/register/RegisterPhoneInput";
import RegisterAddressInput from "@/components/register/RegisterAddressInput";
import RegisterSubmitButton from "@/components/register/RegisterSubmitButton";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { PasswordValidation } from "@/types";

export default function Register() {
  const router = useRouter();

  // 이메일
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 비밀번호
  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValid, setPasswordValid] = useState<PasswordValidation>({
    length: false,
    alphabet: false,
    number: false,
    special: false,
  });

  // 비밀번호 확인
  const [confirm, setConfirm] = useState("");
  const [confirmFocus, setConfirmFocus] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  // 이름, 성별, 생년월일, 전화번호, 주소, 상세주소
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);

  // 이메일 유효성 검사
  const isEmailValid = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email);
  const showEmailError = email.length > 0 && !isEmailValid;

  // 비밀번호 유효성 검사 (8-20자)
  const validatePassword = (pw: string) => {
    const validations = {
      length: pw.length >= 8 && pw.length <= 20,
      alphabet: /[A-Za-z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[!@#$%^&*]/.test(pw),
    };
    setPasswordValid(validations);
  };

  // 비밀번호 확인 일치 여부
  const isConfirmValid = confirm.length > 0 && password === confirm;

  // 전화번호 유효성 검사 (9~11자리, 숫자만)
  const isPhoneValid = /^\d{9,11}$/.test(phone);

  // 모든 필수 입력값 체크
  const isFormFilled =
    isEmailValid &&
    isEmailVerified &&
    password.length > 0 &&
    confirm.length > 0 &&
    name.trim().length > 0 &&
    gender.length > 0 &&
    birthDate !== null &&
    phone.length > 0 &&
    address.length > 0 &&
    detailAddress.length > 0 &&
    isConfirmValid &&
    Object.values(passwordValid).every(Boolean);

  // 주소 검색 핸들러 (중복 방지)
  const openPostcode = useDaumPostcodePopup();
  const handleAddressSearch = useCallback(() => {
    if (isAddressPopupOpen) return;
    setIsAddressPopupOpen(true);
    openPostcode({
      onComplete: (data) => {
        setAddress(data.address);
        setDetailAddress(""); // 주소 변경시 상세주소 초기화
        setIsAddressPopupOpen(false);
      },
      onClose: () => setIsAddressPopupOpen(false),
    });
  }, [openPostcode, isAddressPopupOpen]);

  // 비밀번호 안내 메시지: 최초 focus 이후 항상 표시
  if (passwordFocus && !passwordTouched) setPasswordTouched(true);
  if (confirmFocus && !confirmTouched) setConfirmTouched(true);

  // 회원가입 버튼 클릭
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled || !isPhoneValid) return;
    router.push("/register/complete");
  };

  return (
    <div className="min-h-screen bg-[#DDE7E7] flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl border border-gray-200">
        {/* 상단 화살표 + 회원가입 제목 */}
        <div className="relative mb-8">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="로그인으로 돌아가기"
          >
            <FiArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h2 className="text-3xl font-bold text-gray-900 text-center flex-1">
            회원가입
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <RegisterEmailInput
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailVerified(false);
            }}
            focus={emailFocus}
            setFocus={setEmailFocus}
            isVerified={isEmailVerified}
            setIsVerified={setIsEmailVerified}
            isValid={isEmailValid}
            showError={showEmailError}
          />
          <RegisterPasswordInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.slice(0, 20));
              validatePassword(e.target.value.slice(0, 20));
            }}
            focus={passwordFocus}
            setFocus={setPasswordFocus}
            touched={passwordTouched}
            validState={passwordValid}
          />
          <RegisterPasswordConfirmInput
            value={confirm}
            onChange={(e) => setConfirm(e.target.value.slice(0, 20))}
            focus={confirmFocus}
            setFocus={setConfirmFocus}
            touched={confirmTouched}
            isValid={isConfirmValid}
          />
          <RegisterInput
            label="이름"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 10))}
            maxLength={10}
            placeholder="이름"
            autoComplete="name"
          />
          <RegisterGenderSelect value={gender} setValue={setGender} />
          <RegisterDatePicker value={birthDate} setValue={setBirthDate} />
          <RegisterPhoneInput
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            isValid={isPhoneValid}
          />
          <RegisterAddressInput
            address={address}
            onAddressClick={handleAddressSearch}
            detail={detailAddress}
            setDetail={setDetailAddress}
          />
          <RegisterSubmitButton isActive={isFormFilled && isPhoneValid}>
            회원가입
          </RegisterSubmitButton>
        </form>
      </div>
    </div>
  );
}
