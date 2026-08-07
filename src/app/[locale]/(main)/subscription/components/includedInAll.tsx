import { CalendarX, Headphones, Languages, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const ITEMS = [
  { key: "verified", icon: ShieldCheck },
  { key: "multilingual", icon: Languages },
  { key: "support", icon: Headphones },
  { key: "cancel", icon: CalendarX },
];

export default function IncludedInAll() {
  const t = useTranslations("Subscription");

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-20 pb-16">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[#2f3e4e] text-center mb-8">
          {t("includedTitle")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map(({ key, icon: Icon }) => (
            <div key={key} className="flex flex-col items-center text-center">
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-50 mb-3">
                <Icon className="w-5 h-5 text-[#ff9a5a]" />
              </span>
              <p className="font-semibold text-[#2f3e4e] text-sm">
                {t(`included.${key}.title`)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {t(`included.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
