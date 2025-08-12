"use client";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile toggle button */}
      <button
        className="top-5 left-1 md:hidden fixed  z-50 rounded-full bg-amber-500  "
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <ArrowRight className="text-xs text-white" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-56 bg-white border-r border-gray-200 flex flex-col items-center pt-8 pb-10 select-none z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:flex`}
      >
        {/* Navigation */}
        <nav className="flex flex-col gap-6 w-full px-6 text-xs text-gray-400 ">
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors">
            <i className="fas fa-circle-notch text-[10px]"></i> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors">
            <i className="fas fa-briefcase"></i> Opportunities
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors">
            <i className="fas fa-box"></i> Suppliers
          </a>
          {/* Add other links here */}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
