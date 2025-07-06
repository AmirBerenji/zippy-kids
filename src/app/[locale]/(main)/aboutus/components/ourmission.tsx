import { useTranslations } from "next-intl";
import React from "react";

export default function AboutOurmission() {
  const t = useTranslations("OurMission");
  return (
    <section className=" mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-16 bg-[#e6f0f6]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-48 items-center max-w-7xl">
        <img
          alt="Teacher engaging with children in an interactive learning session with colorful educational materials"
          className="rounded-lg shadow-lg w-full object-cover"
          height="400"
          loading="lazy"
          src="/assets/images/aboutus/ourmission.jpg"
          width="500"
        />
        <div>
          <h2 className="text-3xl font-bold text-[#2f3e4e] mb-4">
            {t("header")}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">{t("body")}</p>
        </div>
      </div>
    </section>
  );
}
