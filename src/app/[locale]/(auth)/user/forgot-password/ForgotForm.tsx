"use client";
import { forgotPassword, login } from "@/action/apiAction";
import ErrorMessage from "@/app/component/general/ErrorMessage";
import LoadingPage from "@/app/component/general/Loading";
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/dist/server/api-utils";
import React, { useState } from "react";

export default function ForgotForm() {
  const t = useTranslations("SignIn");
  const locale = useLocale();

  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setMessage("");
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await forgotPassword(formData);

    console.log("Result", result);
    if (!result.success) {
      setMessage(result.message);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6" method="POST">
      {isLoading ? <LoadingPage /> : <></>}
      <div>
        <label className="block text-sm font-semibold text-[#2f3e4e] mb-2">
          {t("email")}
        </label>
        <input
          autoComplete="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
          id="email"
          name="email"
          placeholder="you@example.com"
          type="email"
        />
      </div>
      <ErrorMessage message={message} />

      <button
        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
