import React from "react";
import { FiSearch } from "react-icons/fi";

interface RegisterAddressInputProps {
  address: string;
  onAddressClick: () => void;
  detail: string;
  setDetail: (v: string) => void;
}

export default function RegisterAddressInput({
  address,
  onAddressClick,
  detail,
  setDetail,
}: RegisterAddressInputProps) {
  return (
    <>
      <div className="mb-3">
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          주소
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            readOnly
            value={address}
            onClick={onAddressClick}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-900 cursor-pointer outline-none transition-all"
            placeholder="주소 검색"
          />
          <button
            type="button"
            onClick={onAddressClick}
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
          value={detail}
          onChange={(e) => setDetail(e.target.value.slice(0, 30))}
          placeholder="상세 주소"
          maxLength={30}
        />
      </div>
    </>
  );
}
