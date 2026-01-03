"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";

export default function NfcActivationPage() {
  const [isDetected, setIsDetected] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mimic the "Scanning" feel on load
    const timer = setTimeout(() => setIsDetected(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    //preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate API call
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
              KidooHub
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
            <span className="font-bold text-lg text-slate-800">KidooHub</span>
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
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] "
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Complete Activation <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <button className="text-orange-500 font-bold hover:underline">
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
