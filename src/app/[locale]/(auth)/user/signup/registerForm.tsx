"use client";

import { register } from "@/action/apiAction";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function RegisterForm() {
  const t = useTranslations("SignUp");

  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await register(formData);

    if (result.error) {
      setMessage(result.message);
    } else {
      // ✅ Redirect or show success as needed
      // e.g., router.push('/dashboard')
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" method="POST">
        <div>
          <label className="block text-sm font-semibold text-[#2f3e4e] mb-2">
            {t("fullname")}
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="fullname"
            name="fullname"
            placeholder="Jhon Doe"
            type="text"
          />
        </div>
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
            {t("phone")}
          </label>
          <input
            autoComplete="phone"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="phone"
            name="phone"
            placeholder="+12222222222"
            type="tel"
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
        <div>
          <label className="block text-sm font-semibold text-[#2f3e4e] mb-2">
            {t("confirmPassword")}
          </label>
          <input
            autoComplete="current-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="confirmpassword"
            name="confirmpassword"
            placeholder={t("placeholder")}
            type="password"
          />
        </div>

        <button
          className="w-full bg-[#ff9a5a] hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition"
          type="submit"
        >
          {t("signupbtn")}
        </button>
      </form>
    </>
  );
}
