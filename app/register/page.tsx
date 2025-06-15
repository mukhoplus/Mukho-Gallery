"use client";

import { useState, useCallback } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { FiCheckCircle, FiXCircle, FiMapPin } from "react-icons/fi";

interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export default function Register() {
  const [passwordValid, setPasswordValid] = useState<PasswordValidation>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const [address, setAddress] = useState("");
  const openPostcode = useDaumPostcodePopup();

  // 주소 검색 핸들러
  const handleAddressSearch = useCallback(() => {
    openPostcode({
      onComplete: (data) => {
        setAddress(data.address);
      },
    });
  }, [openPostcode]);

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    const validations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };
    setPasswordValid(validations);
  };

  return (
    <div className="min-h-screen bg-[#DDE7E7] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          환영합니다! 🎉
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 이메일 인증 */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              이메일
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 outline-none focus:border-primary"
                placeholder="example@domain.com"
              />
              <button className="whitespace-nowrap px-4 bg-[#B9C9C9] text-white rounded-lg font-semibold hover:bg-[#A5B3B3]">
                인증하기
              </button>
            </div>
          </div>
          {/* 비밀번호 */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              onChange={(e) => validatePassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 outline-none focus:border-primary"
            />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
              {Object.entries(passwordValid).map(([key, isValid]) => (
                <div key={key} className="flex items-center gap-1 text-sm">
                  {isValid ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  <span className="capitalize text-gray-700">{key}</span>
                </div>
              ))}
            </div>
          </div>
          {/* 생년월일 */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              생년월일
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select className="px-4 py-3 rounded-lg border border-gray-300 text-gray-900">
                {Array.from({ length: 100 }, (_, i) => 2025 - i).map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
              <select className="px-4 py-3 rounded-lg border border-gray-300 text-gray-900">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
              <select className="px-4 py-3 rounded-lg border border-gray-300 text-gray-900">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
          {/* 주소 검색 */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              주소
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={address}
                onClick={handleAddressSearch}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 cursor-pointer"
                placeholder="주소 검색"
              />
              <FiMapPin className="text-2xl text-gray-400 mt-2" />
            </div>
          </div>
        </div>
        {/* 회원가입 완료 버튼 */}
        <button className="w-full mt-8 bg-[#B9C9C9] hover:bg-[#A5B3B3] text-white py-3 rounded-lg font-semibold transition-all">
          회원가입 완료
        </button>
      </div>
    </div>
  );
}
