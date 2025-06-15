import React from "react";

interface AuthSubmitButtonProps {
  isActive: boolean;
  children: React.ReactNode;
}

export default function AuthSubmitButton({
  isActive,
  children,
}: AuthSubmitButtonProps) {
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
