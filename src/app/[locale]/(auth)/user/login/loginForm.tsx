"use client";
import { login } from "@/action/apiAction";
import ErrorMessage from "@/app/component/general/ErrorMessage";
import LoadingPage from "@/app/component/general/Loading";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";

export default function LoginForm() {
  const t = useTranslations("SignIn");
  const locale = useLocale();

  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result) {
      setMessage(result.message);
    } else {
      // ✅ Redirect or show success as needed
      // e.g., router.push('/dashboard')
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
      <div>
        <label className="block text-sm font-semibold text-[#2f3e4e] mb-2">
          {t("password")}
        </label>
        <input
          autoComplete="current-password"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
          id="password"
          name="password"
          placeholder={t("placeholder")}
          type="password"
        />
      </div>
      <ErrorMessage message={message} />
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center text-sm text-gray-400">
          <input
            className="form-checkbox h-5 w-5 text-[#4f5c69] checked:border-orange-500"
            name="remember"
            type="checkbox"
          />
          <span className="ml-2 text-[#4f5c69]">{t("rememberMe")}</span>
        </label>
        <a
          className="text-sm text-[#4f5c69] hover:underline"
          href={`/${locale}/forgot-password`}
        >
          {t("forgotPassword")}
        </a>
      </div>
      <button
        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition"
        type="submit"
      >
        {t("signinbtn")}
      </button>
    </form>
  );
}
