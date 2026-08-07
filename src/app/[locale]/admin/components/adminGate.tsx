"use client";

import { unlockAdmin } from "@/action/adminAuthAction";
import ErrorMessage from "@/app/component/general/ErrorMessage";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AdminGate() {
  const router = useRouter();

  const [passcode, setPasscode] = useState("");
  const [reveal, setReveal] = useState(false);
  const [message, setMessage] = useState("");
  const [isChecking, setChecking] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setChecking(true);

    const result = await unlockAdmin(passcode);

    if (!result.success) {
      setMessage(result.message ?? "That passcode is not correct.");
      setPasscode("");
      setChecking(false);
      return;
    }

    // The cookie is set — re-run the server layout so it renders the panel.
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#ffe0cc] mb-4">
            <Lock className="w-6 h-6 text-[#ff9a5a]" />
          </span>

          <h1 className="text-2xl font-extrabold text-[#2f3e4e]">
            <span className="text-[#ff9a5a]">Kidoo</span>Hub
          </h1>
          <p className="text-sm font-semibold text-[#2f3e4e] mt-1">
            Admin Panel
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Enter the passcode to continue.
          </p>
        </div>

        <div className="mt-6">
          <label
            htmlFor="passcode"
            className="block text-sm font-semibold text-[#2f3e4e] mb-2"
          >
            Passcode
          </label>

          <div className="relative">
            <input
              id="passcode"
              name="passcode"
              type={reveal ? "text" : "password"}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              autoComplete="current-password"
              autoFocus
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={() => setReveal((prev) => !prev)}
              aria-label={reveal ? "Hide passcode" : "Show passcode"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-[#2f3e4e] transition"
            >
              {reveal ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <ErrorMessage message={message} />
        </div>

        <button
          type="submit"
          disabled={isChecking}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-[#ff9a5a] hover:bg-orange-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl shadow-md transition"
        >
          <Lock className="w-4 h-4" />
          {isChecking ? "Checking…" : "Unlock"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          You stay signed in on this browser for 8 hours.
        </p>
      </form>
    </div>
  );
}
