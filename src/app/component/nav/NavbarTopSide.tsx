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
  const normalizedPath =
    pathname
      .replace(`/${locale}`, "") // remove locale
      .replace(/\/$/, "") || "/"; // remove trailing slash (except root)

  const isActive = (path: string) => normalizedPath === path;

  return (
    <header className="relative bg-[#e6f0f6] pt-6 pb-10 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center ">
          <span className="font-bold text-2xl text-[#ff9a5a]">Kidoo</span>
          <span className="font-bold text-2xl text-[#2f3e4e] tracking-wide">
            Hub
          </span>
        </div>

        <nav className="mt-4 sm:mt-0 flex space-x-6 text-sm text-gray-600 font-semibold">
          {/* <Link
            href="/"
            className={`relative ${isActive("/") ? "text-[#ff9a5a] after:absolute after:-bottom-1 after:left-0 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#ff9a5a]" : "hover:text-[#ff9a5a]"}`}
          >
            {t("home")}
          </Link> */}

          <Link
            href={`/${locale}/`}
            className={`relative ${
              isActive("/") ? "text-[#ff9a5a]" : "hover:text-[#ff9a5a]"
            }`}
          >
            {t("home")}
          </Link>

          <Link
            href={`/${locale}/aboutus`}
            className={`relative ${
              isActive("/aboutus") ? "text-[#ff9a5a]" : "hover:text-[#ff9a5a]"
            }`}
          >
            {t("aboutus")}
          </Link>

          <Link
            href={`/${locale}/services`}
            className={`relative ${
              isActive("/services") ? "text-[#ff9a5a]" : "hover:text-[#ff9a5a]"
            }`}
          >
            {t("services")}
          </Link>
         

          <Link
            href={`/${locale}/contact`}
            className={`relative ${
              isActive("/contact") ? "text-[#ff9a5a]" : "hover:text-[#ff9a5a]"
            }`}
          >
            {t("contact")}
          </Link>
        </nav>

        <Link  href={`/${locale}/user/signup`} className="mt-4 sm:mt-0 bg-[#ff9a5a] text-white text-sm font-semibold rounded-full px-5 py-2 hover:bg-[#e07a3f] transition flex items-center space-x-1">
          <span>{t("enroll")}</span>
          <i className="fas fa-chevron-down text-xs"></i>
        </Link>
      </div>
    </header>
  );
}
