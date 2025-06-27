"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavbarTopSide() {
  const t = useTranslations("MenuPage");
  const pathname = usePathname(); // e.g. /en/aboutus
  const locale = useLocale(); // e.g. en

  // Remove locale prefix and trailing slash
  const normalizedPath = pathname
    .replace(`/${locale}`, "") // remove locale
    .replace(/\/$/, "") || "/"; // remove trailing slash (except root)

  const isActive = (path: string) => normalizedPath === path;

  return (
    <header className="relative bg-[#e6f0f6] pt-6 pb-10 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-[#2f3e4e] tracking-wide">Zippy</span>
          <span className="font-bold text-2xl text-[#ff9a5a]">Kids</span>
        </div>

        <nav className="mt-4 sm:mt-0 flex space-x-6 text-sm text-gray-600 font-semibold">
          {/* <Link
            href="/"
            className={`relative ${isActive("/") ? "text-[#ff9a5a] after:absolute after:-bottom-1 after:left-0 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#ff9a5a]" : "hover:text-[#ff9a5a]"}`}
          >
            {t("home")}
          </Link> */}


          <Link
            href="/"
            className={`relative ${isActive("/") ? "text-[#ff9a5a]" : "hover:text-[#ff9a5a]"}`}
          >
            {t("home")}
          </Link>



          <Link
            href="/aboutus"
            className={`relative ${isActive("/aboutus") ? "text-[#ff9a5a]" : "hover:text-[#ff9a5a]"}`}
          >
            {t("aboutus")}
          </Link>

          <Link
            href="/services"
            className={`relative ${isActive("/services") ? "text-[#ff9a5a]" : "hover:text-[#ff9a5a]"}`}
          >
            {t("services")}
          </Link>
          <Link
            href="/blog"
            className={`relative ${isActive("/blog") ? "text-[#ff9a5a]" : "hover:text-[#ff9a5a]"}`}
          >
            {t("blog")}
          </Link>

          <Link
            href="/contact"
            className={`relative ${isActive("/contact") ? "text-[#ff9a5a]" : "hover:text-[#ff9a5a]"}`}
          >
            {t("contact")}
          </Link>
        </nav>

        <button className="mt-4 sm:mt-0 bg-[#ff9a5a] text-white text-sm font-semibold rounded-full px-5 py-2 hover:bg-[#e07a3f] transition flex items-center space-x-1">
          <span>Enroll now</span>
          <i className="fas fa-chevron-down text-xs"></i>
        </button>
      </div>

      <img
        alt="Decorative wave"
        className="absolute top-0 left-0 w-full h-10 object-cover pointer-events-none select-none"
        height="40"
        src="https://storage.googleapis.com/a1aa/image/603796a3-4bbc-4068-60e2-0e270529f7ce.jpg"
        style={{ zIndex: "-1" }}
        width="1920"
      />
    </header>
  );
}
