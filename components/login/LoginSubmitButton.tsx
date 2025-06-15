import React from "react";

interface LoginSubmitButtonProps {
  isActive: boolean;
  children: React.ReactNode;
}

export default function LoginSubmitButton({
  isActive,
  children,
}: LoginSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`
        w-full py-3 rounded-lg font-semibold transition-all
        ${
          isActive
            ? "bg-[#CEE5D5] hover:bg-[#B7D8C7] text-emerald-900 cursor-pointer"
            : "bg-gray-300 text-gray-400 cursor-pointer"
        }
      `}
    >
      {children}
    </button>
  );
}
