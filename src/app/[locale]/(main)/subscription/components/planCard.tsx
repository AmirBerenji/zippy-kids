"use client";

import { formatAmount } from "@/model/payment";
import {
  BillingCycle,
  SubscriptionPlan,
  monthlyEquivalent,
  planPrice,
  yearlySavings,
} from "@/model/subscription";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  plan: SubscriptionPlan;
  cycle: BillingCycle;
  selected: boolean;
  onSelect: (plan: SubscriptionPlan) => void;
}

export default function PlanCard({ plan, cycle, selected, onSelect }: Props) {
  const t = useTranslations("Subscription");

  const features = t.raw(`plans.${plan.key}.features`) as string[];
  const isFree = plan.monthlyPrice === 0;
  const headline = monthlyEquivalent(plan, cycle);
  const savings = yearlySavings(plan);

  return (
    <div
      className={`relative flex flex-col h-full bg-white rounded-2xl p-6 sm:p-8 transition ${
        selected
          ? "border-2 border-[#ff9a5a] shadow-xl"
          : plan.highlighted
            ? "border-2 border-[#c6d9e3] shadow-lg"
            : "border border-gray-200 shadow-lg"
      }`}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff9a5a] text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
          {t("mostPopular")}
        </span>
      )}

      <h3 className="text-xl font-bold text-[#2f3e4e]">
        {t(`plans.${plan.key}.name`)}
      </h3>
      <p className="text-sm text-gray-500 mt-2 min-h-[2.5rem]">
        {t(`plans.${plan.key}.description`)}
      </p>

      <div className="mt-6 pb-6 border-b border-gray-100">
        {isFree ? (
          <span className="text-3xl font-extrabold text-[#2f3e4e]">
            {t("free")}
          </span>
        ) : (
          <>
            <span className="text-3xl font-extrabold text-[#2f3e4e]">
              {formatAmount(headline, plan.currency)}
            </span>
            <span className="text-sm text-gray-500 ml-1">{t("perMonth")}</span>
          </>
        )}

        <p className="text-xs text-gray-400 mt-2 min-h-[1rem]">
          {isFree
            ? t("noCardNeeded")
            : cycle === "yearly"
              ? t("billedYearly", {
                  amount: formatAmount(planPrice(plan, cycle), plan.currency),
                })
              : t("billedMonthly")}
        </p>

        {!isFree && cycle === "yearly" && savings > 0 && (
          <p className="text-xs font-semibold text-[#ff9a5a] mt-1">
            {t("savingsNote", {
              amount: formatAmount(savings, plan.currency),
            })}
          </p>
        )}
      </div>

      <ul className="flex-1 py-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className="w-4 h-4 text-[#ff9a5a] shrink-0 mt-0.5" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect(plan)}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          selected
            ? "bg-[#ff9a5a] text-white hover:bg-orange-500"
            : "border border-[#ff9a5a] text-[#ff9a5a] hover:bg-orange-50"
        }`}
      >
        {selected ? t("selected") : isFree ? t("getStarted") : t("choosePlan")}
      </button>
    </div>
  );
}
