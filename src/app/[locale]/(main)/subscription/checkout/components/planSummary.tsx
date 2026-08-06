"use client";

import { formatAmount } from "@/model/payment";
import {
  BillingCycle,
  SubscriptionPlan,
  monthlyEquivalent,
  planPrice,
  yearlySavings,
} from "@/model/subscription";
import { ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

interface Props {
  plan: SubscriptionPlan;
  cycle: BillingCycle;
}

export default function PlanSummary({ plan, cycle }: Props) {
  const t = useTranslations("Subscription.Checkout");
  const tp = useTranslations("Subscription");
  const locale = useLocale();

  const total = planPrice(plan, cycle);
  const savings = yearlySavings(plan);

  return (
    <div className="lg:sticky lg:top-8 space-y-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[#2f3e4e] mb-6">
          {t("orderSummary")}
        </h2>

        <dl className="space-y-3 text-sm pb-6 border-b border-gray-100">
          <div className="flex justify-between">
            <dt className="text-gray-500">{t("plan")}</dt>
            <dd className="text-[#2f3e4e] font-medium">
              {tp(`plans.${plan.key}.name`)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">{t("billingCycle")}</dt>
            <dd className="text-[#2f3e4e] font-medium">{tp(cycle)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">{t("pricePerMonth")}</dt>
            <dd className="text-[#2f3e4e] font-medium">
              {formatAmount(monthlyEquivalent(plan, cycle), plan.currency)}
            </dd>
          </div>
          {cycle === "yearly" && savings > 0 && (
            <div className="flex justify-between">
              <dt className="text-gray-500">{t("savings")}</dt>
              <dd className="text-[#ff9a5a] font-semibold">
                −{formatAmount(savings, plan.currency)}
              </dd>
            </div>
          )}
        </dl>

        <div className="flex items-baseline justify-between pt-6">
          <span className="text-base font-bold text-[#2f3e4e]">
            {t("chargedToday")}
          </span>
          <span className="text-2xl font-extrabold text-[#ff9a5a]">
            {formatAmount(total, plan.currency)}
          </span>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          {cycle === "yearly" ? t("renewsYearly") : t("renewsMonthly")}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#ff9a5a] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#2f3e4e] text-sm">
              {t("securePayment")}
            </p>
            <p className="text-sm text-gray-500 mt-1">{t("securityNote")}</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
          {t("cancelNote")}{" "}
          <a
            href={`/${locale}/terms`}
            className="text-[#ff9a5a] hover:underline font-medium"
          >
            {tp("termsLink")}
          </a>
        </p>
      </div>
    </div>
  );
}
