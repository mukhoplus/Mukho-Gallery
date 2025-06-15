"use client";

import { useState, useCallback } from "react";
import { FiCheckCircle, FiXCircle, FiSearch } from "react-icons/fi";
import { useDaumPostcodePopup } from "react-daum-postcode";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export default function Register() {
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
    uppercase: false,
    lowercase: false,
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

  const openPostcode = useDaumPostcodePopup();

  // 이메일 유효성 검사
  const isEmailValid = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email);
  const showEmailError = email.length > 0 && !isEmailValid;

  // 비밀번호 유효성 검사 (8-20자)
  const validatePassword = (pw: string) => {
    const validations = {
      length: pw.length >= 8 && pw.length <= 20,
      uppercase: /[A-Z]/.test(pw),
      lowercase: /[a-z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[!@#$%^&*]/.test(pw),
    };
    setPasswordValid(validations);
  };

  // 비밀번호 확인 일치 여부
  const isConfirmValid = confirm.length > 0 && password === confirm;

  // 전화번호 유효성 검사 (9~11자리, 숫자만)
  const isPhoneValid = /^\d{9,11}$/.test(phone);

  // 모든 필수 입력값 체크 (생년월일만 birthDate로)
  const isFormFilled =
    isEmailValid &&
    isEmailVerified &&
    password.length > 0 &&
    confirm.length > 0 &&
    name.length > 0 &&
    gender.length > 0 &&
    birthDate !== null &&
    phone.length > 0 &&
    address.length > 0 &&
    detailAddress.length > 0 &&
    isConfirmValid &&
    Object.values(passwordValid).every(Boolean);

  // 주소 검색 핸들러 (중복 방지)
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
    alert("회원가입이 완료되었습니다!");
  };

  return (
    <div className="min-h-screen bg-[#DDE7E7] flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          회원가입
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          {/* 이메일 */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              이메일
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                className={`
                  w-full px-4 py-3 rounded-lg bg-gray-50 border transition-all
                  ${
                    emailFocus
                      ? "border-emerald-500 border-2"
                      : "border-gray-300"
                  }
                  hover:border-emerald-500 focus:border-emerald-500
                  text-gray-900 placeholder-gray-500 outline-none select-text
                `}
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailVerified(false);
                }}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                autoComplete="username"
              />
              <button
                type="button"
                className={`
                  px-4 whitespace-nowrap rounded-lg font-semibold transition-all
                  ${
                    isEmailValid && !isEmailVerified
                      ? "text-emerald-900 bg-[#CEE5D5] hover:bg-[#B7D8C7] cursor-pointer"
                      : "bg-gray-300 text-gray-400 cursor-not-allowed"
                  }
                `}
                onClick={() => setIsEmailVerified(true)}
                disabled={!isEmailValid || isEmailVerified}
              >
                인증하기
              </button>
            </div>
            {showEmailError && (
              <div className="text-xs text-red-500 mt-1">
                이메일 형식이 올바르지 않습니다.
              </div>
            )}
            {isEmailVerified && (
              <div className="text-xs text-emerald-500 mt-1">
                인증되었습니다.
              </div>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              비밀번호 (8-20자)
            </label>
            <input
              type="password"
              className={`
                w-full px-4 py-3 rounded-lg bg-gray-50 border transition-all
                ${
                  passwordFocus
                    ? "border-emerald-500 border-2"
                    : "border-gray-300"
                }
                hover:border-emerald-500 focus:border-emerald-500
                text-gray-900 placeholder-gray-500 outline-none select-text
              `}
              onChange={(e) => {
                setPassword(e.target.value.slice(0, 20));
                validatePassword(e.target.value.slice(0, 20));
              }}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              autoComplete="new-password"
              value={password}
              placeholder="비밀번호"
              maxLength={20}
            />
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
                  {passwordValid.uppercase ? (
                    <FiCheckCircle className="text-emerald-500 mr-1" />
                  ) : (
                    <FiXCircle className="text-red-400 mr-1" />
                  )}
                  대문자
                </span>
                <span className="flex items-center text-xs">
                  {passwordValid.lowercase ? (
                    <FiCheckCircle className="text-emerald-500 mr-1" />
                  ) : (
                    <FiXCircle className="text-red-400 mr-1" />
                  )}
                  소문자
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
            <input
              type="password"
              className={`
                w-full px-4 py-3 rounded-lg bg-gray-50 border transition-all
                ${
                  confirmFocus
                    ? "border-emerald-500 border-2"
                    : "border-gray-300"
                }
                hover:border-emerald-500 focus:border-emerald-500
                text-gray-900 placeholder-gray-500 outline-none select-text
              `}
              onChange={(e) => setConfirm(e.target.value.slice(0, 20))}
              onFocus={() => setConfirmFocus(true)}
              onBlur={() => setConfirmFocus(false)}
              autoComplete="new-password"
              value={confirm}
              placeholder="비밀번호 확인"
              maxLength={20}
            />
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

          {/* 이름 */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              이름
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 hover:border-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 outline-none select-text transition-all"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 10))}
              autoComplete="name"
              placeholder="이름"
              maxLength={10}
            />
          </div>

          {/* 성별 */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              성별
            </label>
            <div className="flex w-max rounded-lg overflow-hidden border border-gray-300">
              <button
                type="button"
                className={`px-6 py-2 text-gray-700 transition-colors duration-200 focus:outline-none ${
                  gender === "남" ? "bg-[#DDE7E7] text-emerald-900" : "bg-white"
                }`}
                onClick={() => setGender("남")}
              >
                남
              </button>
              <button
                type="button"
                className={`px-6 py-2 text-gray-700 transition-colors duration-200 focus:outline-none ${
                  gender === "여" ? "bg-[#DDE7E7] text-emerald-900" : "bg-white"
                }`}
                onClick={() => setGender("여")}
              >
                여
              </button>
            </div>
          </div>

          {/* 생년월일 (달력) */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              생년월일
            </label>
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="yyyy-mm-dd"
              locale={ko}
              maxDate={new Date()}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300
                         hover:border-emerald-500 focus:border-emerald-500
                         text-gray-900 placeholder-gray-500 outline-none select-text transition-all"
              value={birthDate ? format(birthDate, "yyyy-MM-dd") : ""}
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              전화번호
            </label>
            <input
              type="tel"
              className={`
                w-full px-4 py-3 rounded-lg bg-gray-50 border transition-all
                border-gray-300 hover:border-emerald-500 focus:border-emerald-500
                text-gray-900 placeholder-gray-500 outline-none select-text
              `}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="'-'을 제외한 숫자만 입력 (9~11자)"
              maxLength={11}
            />
            {phone.length > 0 && !isPhoneValid && (
              <div className="text-xs text-red-500 mt-1 text-left">
                전화번호(9~11자)를 알맞게 입력해 주세요.
              </div>
            )}
          </div>

          {/* 주소 + 상세 주소 (여백 줄임) */}
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              주소
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                readOnly
                value={address}
                onClick={handleAddressSearch}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-900 cursor-pointer outline-none transition-all"
                placeholder="주소 검색"
              />
              <button
                type="button"
                onClick={handleAddressSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-700"
                tabIndex={-1}
                aria-label="주소 검색"
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 hover:border-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 outline-none select-text transition-all"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value.slice(0, 30))}
              placeholder="상세 주소"
              maxLength={30}
            />
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className={`
              w-full py-3 rounded-lg font-semibold transition-all
              ${
                isFormFilled && isPhoneValid
                  ? "bg-[#CEE5D5] hover:bg-[#B7D8C7] text-emerald-900 cursor-pointer"
                  : "bg-gray-300 text-gray-400 cursor-not-allowed"
              }
            `}
            disabled={!(isFormFilled && isPhoneValid)}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
