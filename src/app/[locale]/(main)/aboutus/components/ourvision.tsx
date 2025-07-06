import { useTranslations } from "next-intl";
import React from "react";

export default function AboutOurvision() {
  const t = useTranslations("OurVision");
  return (
    <section className=" py-16 px-6 sm:px-12 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-48 items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#2f3e4e] mb-4">
            {t("header")}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">{t("body")}</p>
        </div>
        <img
          alt="Children dreaming and imagining with colorful balloons and clouds in a bright outdoor setting"
          className="rounded-lg shadow-lg w-full object-cover"
          height="400"
          loading="lazy"
          src="/assets/images/aboutus/ourvision.jpg"
          width="500"
        />
      </div>
    </section>
  );
}
