import React from "react";

interface RegisterGenderSelectProps {
  value: string;
  setValue: (v: string) => void;
}

export default function RegisterGenderSelect({
  value,
  setValue,
}: RegisterGenderSelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        성별
      </label>
      <div className="flex w-max rounded-lg overflow-hidden border border-gray-300">
        <button
          type="button"
          className={`px-6 py-2 text-gray-700 transition-colors duration-200 focus:outline-none ${
            value === "남" ? "bg-[#DDE7E7] text-emerald-900" : "bg-white"
          }`}
          onClick={() => setValue("남")}
        >
          남
        </button>
        <button
          type="button"
          className={`px-6 py-2 text-gray-700 transition-colors duration-200 focus:outline-none ${
            value === "여" ? "bg-[#DDE7E7] text-emerald-900" : "bg-white"
          }`}
          onClick={() => setValue("여")}
        >
          여
        </button>
      </div>
    </div>
  );
}
