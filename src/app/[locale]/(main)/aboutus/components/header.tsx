import { useTranslations } from "next-intl";
import React from "react";

export default function Aboutheader() {
  const t = useTranslations("AboutUs");
  return (
    <>
      <section className="py-16 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2f3e4e] max-w-4xl mx-auto leading-tight">
          {t("header")}
          <span className=" text-[#ff9a5a] ml-3">Kidoo</span>
          <span className="text-[#2f3e4e] tracking-wide">Hub</span>
        </h1>
        <p className="mt-4 text-lg sm:text-lg text-gray-600 max-w-3xl mx-auto">
          {t("body")}
        </p>
        <div className="flex items-center justify-center max-w-2xl mx-auto mt-8">
          <div className="rounded-[50%_50%_50%_50%/40%_40%_60%_60%] border-8 border-[#c6d9e3] overflow-hidden">
            <img
              alt="Children playing and learning in a colorful classroom with bright decorations and toys"
              className="rounded-lg shadow-lg w-full max-w-4xl object-cover"
              height="300"
              loading="lazy"
              src="/assets/images/aboutus/about-header.jpg"
              width="600"
            />
          </div>
        </div>
      </section>
    </>
  );
}
