import React from "react";

export default function AuthErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return <div className="text-xs text-red-500 mb-5 text-left">{message}</div>;
}
