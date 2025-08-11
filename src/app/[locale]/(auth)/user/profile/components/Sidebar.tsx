"use client";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Hamburger button (visible on mobile only) */}
      <button
        className="p-2 md:hidden bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <i className="fas fa-arrow text-xl text-red-700"></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-56 bg-white border-r border-gray-200 flex flex-col items-center pt-8 pb-10 select-none z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex`}
      >
        {/* Logo section */}
        <div className="mb-12 flex flex-col items-center gap-1">
          
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-6 w-full px-6 text-xs text-gray-400">
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors">
            <i className="fas fa-circle-notch text-[10px]"></i> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors relative">
            <i className="fas fa-briefcase"></i> Opportunities
            <i className="fas fa-chevron-down ml-auto text-xs"></i>
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors">
            <i className="fas fa-box"></i> Suppliers
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors">
            <i className="fas fa-tags"></i> Buyers
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors">
            <i className="fas fa-paper-plane"></i> Contacts
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors">
            <i className="fas fa-star"></i> Watchlist
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors relative">
            <i className="fas fa-comment-alt"></i> Messages
            <span className="absolute right-6 top-0 -translate-y-1/2 bg-red-600 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#1f2a56] transition-colors">
            <i className="fas fa-calendar-alt"></i> Scheduling
          </a>
        </nav>
      </aside>

      {/* Overlay on mobile when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
