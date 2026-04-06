"use client";
import { login, resetPassword } from "@/action/apiAction";
import ErrorMessage from "@/app/component/general/ErrorMessage";
import LoadingPage from "@/app/component/general/Loading";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";

export default function ResetPasswordForm() {
  const t = useTranslations("SignIn");
  const locale = useLocale();

  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setMessage("");
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await resetPassword(formData);

    console.log("Result", result);
    if (!result.success) {
      setMessage(result.message);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6" method="POST">
      {isLoading ? <LoadingPage /> : <></>}
      <div>
        <label className="block text-xs  text-orange-500 mb-2  ">
          please enter your email, code and new password to reset your password
        </label>
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#2f3e4e] mb-2">
          {t("email")}
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
          id="email"
          name="email"
          placeholder="you@example.com"
          type="email"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#2f3e4e] mb-2">
          Code
        </label>
        <input
          autoComplete="code"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
          id="code"
          name="code"
          placeholder="Enter the 6-digit code sent to your email"
          type="text"
          maxLength={6}
          minLength={6}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#2f3e4e] mb-2">
          Password
        </label>
        <input
          autoComplete="false"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
          id="password"
          name="password"
          placeholder="Enter your new password"
          type="password"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#2f3e4e] mb-2">
          Confirm password
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
          id="password_confirmation"
          name="password_confirmation"
          placeholder="Confirm your new password"
          type="password"
        />
      </div>
      <ErrorMessage message={message} />

      <button
        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition"
        type="submit"
      >
        Reset password
      </button>
    </form>
  );
}
