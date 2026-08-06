"use client";

import ErrorMessage from "@/app/component/general/ErrorMessage";
import { formatAmount } from "@/model/payment";
import {
  BillingCycle,
  SUBSCRIPTION_PLANS,
  SubscriptionPlan,
  planPrice,
} from "@/model/subscription";
import { Lock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import BillingToggle from "./billingToggle";
import PlanCard from "./planCard";

export default function SubscriptionClient() {
  const t = useTranslations("Subscription");
  const locale = useLocale();
  const router = useRouter();

  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [selected, setSelected] = useState<SubscriptionPlan | null>(null);
  const [message, setMessage] = useState("");

  const handleSelect = (plan: SubscriptionPlan) => {
    setMessage("");
    setSelected(plan);
  };

  const handleContinue = () => {
    setMessage("");

    if (!selected) {
      setMessage(t("errorSelect"));
      return;
    }

    // The free tier just needs an account, no card.
    if (selected.monthlyPrice === 0) {
      router.push(`/${locale}/user/signup`);
      return;
    }

    router.push(
      `/${locale}/subscription/checkout?plan=${selected.key}&cycle=${cycle}`,
    );
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-20 pb-10">
        <div className="flex justify-center mb-12">
          <BillingToggle cycle={cycle} onChange={setCycle} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <PlanCard
              key={plan.key}
              plan={plan}
              cycle={cycle}
              selected={selected?.key === plan.key}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <div className="max-w-xl mx-auto mt-10 space-y-4">
          <ErrorMessage message={message} />

          <button
            type="button"
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 bg-[#ff9a5a] hover:bg-orange-500 text-white font-semibold py-4 rounded-xl shadow-md transition"
          >
            <Lock className="w-4 h-4" />
            {selected && selected.monthlyPrice > 0
              ? `${t("subscribe")} · ${formatAmount(planPrice(selected, cycle), selected.currency)}`
              : t("continue")}
          </button>

          <p className="text-sm text-gray-500 text-center">
            {t("termsNote")}{" "}
            <a
              href={`/${locale}/terms`}
              className="text-[#ff9a5a] hover:underline font-medium"
            >
              {t("termsLink")}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
