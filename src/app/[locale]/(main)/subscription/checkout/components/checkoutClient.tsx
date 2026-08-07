"use client";

import ErrorMessage from "@/app/component/general/ErrorMessage";
import LoadingPage from "@/app/component/general/Loading";
import { useToast } from "@/app/component/toast/ToastProvider";
import {
  detectBrand,
  isCardNumberValid,
  isCvcValid,
  isExpiryValid,
  lastFour,
} from "@/lib/card";
import { CardDetails, formatAmount } from "@/model/payment";
import {
  BillingCycle,
  SubscribeChargeRequest,
  SubscriptionPlan,
  planPrice,
} from "@/model/subscription";
import { ArrowLeft, Lock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import CardForm from "./cardForm";
import PlanSummary from "./planSummary";

interface Props {
  plan: SubscriptionPlan;
  cycle: BillingCycle;
}

export default function CheckoutClient({ plan, cycle }: Props) {
  const t = useTranslations("Subscription.Checkout");
  const locale = useLocale();
  const toast = useToast();

  const [card, setCard] = useState<CardDetails>({
    number: "",
    holder: "",
    expiry: "",
    cvc: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const brand = useMemo(() => detectBrand(card.number), [card.number]);
  const total = planPrice(plan, cycle);

  const handleCardChange = (field: keyof CardDetails, value: string) => {
    setCard((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!isCardNumberValid(card.number)) return t("errorCardNumber");
    if (!card.holder.trim()) return t("errorCardHolder");
    if (!isExpiryValid(card.expiry)) return t("errorExpiry");
    if (!isCvcValid(card.cvc, brand)) return t("errorCvc");
    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    setLoading(true);

    // ─── TODO: tokenize, then charge ──────────────────────────────────────
    // Hand the raw card to the gateway's tokenizer in the browser and send
    // only the token onward. `card.number` / `card.cvc` must never be posted
    // to our own API.
    //
    // const token = await gateway.createToken(card);
    // const request: SubscribeChargeRequest = {
    //   plan: plan.key,
    //   cycle,
    //   amount: total,
    //   currency: plan.currency,
    //   card_token: token.id,
    //   card_last_four: lastFour(card.number),
    //   card_holder: card.holder.trim(),
    // };
    // const result = await createSubscription(request);
    // if (!result?.success) {
    //   setMessage(result?.message ?? t("errorGeneric"));
    //   setLoading(false);
    //   return;
    // }
    // if (result.redirect_url) {
    //   window.location.href = result.redirect_url;   // 3-D Secure step
    //   return;
    // }
    // router.push(`/${locale}/user/profile`);
    // ──────────────────────────────────────────────────────────────────────
    console.log("Subscription charge:", {
      plan: plan.key,
      cycle,
      amount: total,
      currency: plan.currency,
      card_last_four: lastFour(card.number),
      card_holder: card.holder.trim(),
      brand,
    } satisfies Partial<SubscribeChargeRequest> & { brand: string });
    toast.info(t("apiPending"));

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      {isLoading && <LoadingPage />}

      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-20 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <a
            href={`/${locale}/subscription`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#ff9a5a] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToPlans")}
          </a>

          <CardForm card={card} brand={brand} onChange={handleCardChange} />

          <ErrorMessage message={message} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#ff9a5a] hover:bg-orange-500 disabled:opacity-60 text-white font-semibold py-4 rounded-xl shadow-md transition"
          >
            <Lock className="w-4 h-4" />
            {`${t("payNow")} · ${formatAmount(total, plan.currency)}`}
          </button>
        </div>

        <div className="lg:col-span-1">
          <PlanSummary plan={plan} cycle={cycle} />
        </div>
      </section>
    </form>
  );
}
