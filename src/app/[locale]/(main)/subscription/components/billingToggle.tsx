"use client";

import { BillingCycle } from "@/model/subscription";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  cycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}

const CYCLES: BillingCycle[] = ["monthly", "yearly"];

export default function BillingToggle({ cycle, onChange }: Props) {
  const t = useTranslations("Subscription");

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="tablist"
        aria-label={t("billingCycle")}
        className="inline-flex p-1 bg-gray-100 rounded-full"
      >
        {CYCLES.map((value) => {
          const isActive = cycle === value;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(value)}
              className={`px-6 sm:px-8 py-2.5 rounded-full text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-[#2f3e4e] shadow-sm"
                  : "text-gray-500 hover:text-[#2f3e4e]"
              }`}
            >
              {t(value)}
            </button>
          );
        })}
      </div>

      <span className="text-sm font-medium text-[#ff9a5a]">
        {t("yearlyBadge")}
      </span>
    </div>
  );
}
