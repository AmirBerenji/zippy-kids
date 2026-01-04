"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";
import { parentregister, register } from "@/action/apiAction";
import LoadingPage from "@/app/component/general/Loading";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import ErrorMessage from "@/app/component/general/ErrorMessage";
import Link from "next/link";

export default function NfcActivationPage() {
  const locale = useLocale();
  const t = useTranslations("SignUp");

  const [isDetected, setIsDetected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Mimic the "Scanning" feel on load
    const timer = setTimeout(() => setIsDetected(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append("role", "parent");

    const result = await parentregister(formData);
    if (!result.success) {
      setMessage(result.message);
    }

    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans">
      {/* --- LEFT SIDE: Brand & Visuals (Hidden on mobile, visible on LG+) --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-orange-300 p-12 flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full -ml-20 -mb-20 opacity-50 blur-2xl"></div>

        <div className="z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-20 h-20 rounded-xl flex items-center justify-center ">
              <img src="/assets/images/logo.png" />
            </div>
            <span className="text-white font-bold text-4xl tracking-tight mt-5">
              <h2 className="text-3xl font-extrabold text-[#2f3e4e]">
                <span className="text-[#ff9a5a]">Kidoo</span>Hub
              </h2>
            </span>
          </div>

          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Connecting physical safety <br /> with digital care.
          </h1>
          <p className="text-blue-100 text-xl max-w-md leading-relaxed">
            Your new KidooHub Smart Tag is ready to be linked. Join thousands of
            parents protecting their children with our NFC technology.
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: Activation & Form (Full width on mobile) --- */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile Header (Visible only on small screens) */}
        <header className="lg:hidden flex justify-between items-center p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center ">
              <img src="/assets/images/logo.png" />
            </div>
            <span className="font-bold text-lg text-slate-800">
              {" "}
              <h2 className="text-3xl font-extrabold text-[#2f3e4e]">
                <span className="text-[#ff9a5a]">Kidoo</span>Hub
              </h2>
            </span>
          </div>
        </header>

        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 max-w-2xl mx-auto w-full">
          {/* Tag Status Indicator */}
          <div className="flex items-center gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                isDetected ? "bg-green-100 scale-110" : "bg-blue-100"
              }`}
            >
              {isDetected ? (
                <CheckCircle2 className="text-green-600" />
              ) : (
                <Loader2 className="text-blue-600 animate-spin" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-800">
                {isDetected ? "Tag Successfully Detected" : "Detecting Tag..."}
              </h3>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 lg:text-4xl">
              Activate Your Tag
            </h2>
            <p className="text-slate-500">
              Create your parent account to link this tag and set up your
              child's safety profile.
            </p>
          </div>

          {/* Form */}

          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            {isLoading && <LoadingPage />}

            {/* Animated Form Fields */}
            <AnimatePresence>
              <motion.div
                key="form-fields"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#2f3e4e] mb-2">
                    {t("fullname")}
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
                    id="fullname"
                    name="fullname"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>

                {/* Email */}
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

                {/* Phone */}
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

                {/* Password */}
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

                {/* Confirm Password */}
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

                <ErrorMessage message={message} />

                {/* Submit */}
                <button
                  className="w-full bg-[#ff9a5a] hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition"
                  type="submit"
                >
                  {t("signupbtn")}
                </button>
              </motion.div>
            </AnimatePresence>
          </form>

          <p className="mt-6 text-center text-sm text-[#4f5c69]">
            {t("alreadyHaveAccount")}
            <Link
              className="text-[#2f3e4e] ml-1 font-semibold"
              href={`/${locale}/user/login`}
            >
              {t("signin")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
