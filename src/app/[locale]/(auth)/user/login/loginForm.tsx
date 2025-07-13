"use client";
import { login } from "@/action/apiAction";
import React, { useState } from "react";

export default function LoginForm() {
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    // if (result.error) {
    //   setMessage(result.message);
    // } else {
    //   // ✅ Redirect or show success as needed
    //   // e.g., router.push('/dashboard')
    // }

    // setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6" method="POST">
      <div>
        <label className="block text-sm font-semibold text-[#2f3e4e] mb-2">
          Email address
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
          Password
        </label>
        <input
          autoComplete="current-password"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center text-sm text-gray-400">
          <input
            className="form-checkbox h-5 w-5 text-[#4f5c69] checked:border-orange-500"
            name="remember"
            type="checkbox"
          />
          <span className="ml-2 text-[#4f5c69]">Remember me</span>
        </label>
        <a
          className="text-sm text-[#4f5c69] hover:underline"
          href="/en/forgot-password"
        >
          Forgot password?
        </a>
      </div>
      <button
        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition"
        type="submit"
      >
        Log In
      </button>
    </form>
  );
}
