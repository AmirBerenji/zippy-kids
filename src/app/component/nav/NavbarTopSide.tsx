import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function NavbarTopSide() {
  const t = useTranslations("MenuPage");
  return (
    <>
      <header className="relative bg-[#e6f0f6] pt-6 pb-10 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* <img
              alt="BubaKids logo with colorful letters B O O B A"
              className="w-10 h-10"
              height="40"
              src="https://storage.googleapis.com/a1aa/image/75da4383-60c7-4ded-f9a0-adc73db40a0c.jpg"
              width="40"
            /> */}
            <span className="font-bold text-2xl text-[#2f3e4e] tracking-wide">
              Zippy
            </span>
            <span className="font-bold text-2xl text-[#ff9a5a]">Kids</span>
          </div>
          <nav className="mt-4 sm:mt-0 flex space-x-6 text-sm text-gray-600 font-semibold">
            <Link href={"/"}  className="relative text-[#ff9a5a] after:absolute after:-bottom-1 after:left-0 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#ff9a5a]"
             >
             {t("home")}
             </Link>
            <Link href={"/aboutus"} >
            {t("aboutus")}
            </Link>
            <Link href={"/services"} > 
              {t("services")}
            </Link>
            <a href="#">{t("blog")}</a>
             <Link href={"/contact"} > 
              {t("contact")}
            </Link>
          </nav>
          <button className="mt-4 sm:mt-0 bg-[#ff9a5a] text-white text-sm font-semibold rounded-full px-5 py-2 hover:bg-[#e07a3f] transition flex items-center space-x-1">
            <span>Enroll now</span>
            <i className="fas fa-chevron-down text-xs"></i>
          </button>
        </div>
        <img
          alt="Decorative wave shape border in white and light blue at top"
          className="absolute top-0 left-0 w-full h-10 object-cover pointer-events-none select-none"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/603796a3-4bbc-4068-60e2-0e270529f7ce.jpg"
          style={{ zIndex: "-1" }}
          width="1920"
        />
      </header>
    </>
  );
}
