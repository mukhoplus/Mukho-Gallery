import React from "react";

interface RegisterSubmitButtonProps {
  isActive: boolean;
  children: React.ReactNode;
}

export default function RegisterSubmitButton({
  isActive,
  children,
}: RegisterSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`
        w-full py-3 rounded-lg font-semibold transition-all
        ${
          isActive
            ? "bg-[#CEE5D5] hover:bg-[#B7D8C7] text-emerald-900 cursor-pointer"
            : "bg-gray-300 text-gray-400 cursor-not-allowed"
        }
      `}
      disabled={!isActive}
    >
      {children}
    </button>
  );
}
