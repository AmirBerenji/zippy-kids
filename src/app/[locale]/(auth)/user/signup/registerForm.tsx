"use client";

import { register } from "@/action/apiAction";
import ErrorMessage from "@/app/component/general/ErrorMessage";
import LoadingPage from "@/app/component/general/Loading";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { User, Stethoscope, HeartPulse } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterForm() {
  const t = useTranslations("SignUp");

  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const roles = [
    { id: "parent", name: "Parent", icon: <User className="w-6 h-6" /> },
    { id: "nurse", name: "Nurse", icon: <HeartPulse className="w-6 h-6" /> },
    { id: "doctor", name: "Doctor", icon: <Stethoscope className="w-6 h-6" /> },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append("role", selectedRole);

    const result = await register(formData);
    if (!result.success) {
      setMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" method="POST">
        {isLoading && <LoadingPage />}

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-semibold text-[#2f3e4e] mb-3">
            {t("roleSelect")}
          </label>
          <div className="grid grid-cols-3 gap-4">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition ${
                  selectedRole === role.id
                    ? "border-[#fdb68a] bg-[#fff4ee]"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                {role.icon}
                <span className="mt-2 text-sm font-medium">{role.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Form Fields */}
        <AnimatePresence>
          {selectedRole && (
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
          )}
        </AnimatePresence>
      </form>
    </>
  );
}
