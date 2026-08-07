"use client";

import {
  BRAND_LABELS,
  CardBrand,
  cvcLength,
  formatCardNumber,
  formatExpiry,
} from "@/lib/card";
import { CardDetails } from "@/model/payment";
import { CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  card: CardDetails;
  brand: CardBrand;
  onChange: (field: keyof CardDetails, value: string) => void;
}

export default function CardForm({ card, brand, onChange }: Props) {
  const t = useTranslations("Subscription.Checkout");

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent transition";
  const labelClass = "block text-sm font-semibold text-[#2f3e4e] mb-2";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-5 h-5 text-[#ff9a5a]" />
        <h2 className="text-xl font-bold text-[#2f3e4e]">{t("cardDetails")}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="cardNumber" className={labelClass}>
            {t("cardNumber")}
          </label>
          <div className="relative">
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
              value={card.number}
              onChange={(e) =>
                onChange("number", formatCardNumber(e.target.value))
              }
              className={`${inputClass} pr-20 tracking-wider`}
            />
            {BRAND_LABELS[brand] && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#2f3e4e]">
                {BRAND_LABELS[brand]}
              </span>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cardHolder" className={labelClass}>
            {t("cardHolder")}
          </label>
          <input
            id="cardHolder"
            name="cardHolder"
            type="text"
            autoComplete="cc-name"
            placeholder={t("cardHolderPlaceholder")}
            value={card.holder}
            onChange={(e) => onChange("holder", e.target.value)}
            className={`${inputClass} uppercase`}
          />
        </div>

        <div>
          <label htmlFor="expiry" className={labelClass}>
            {t("expiry")}
          </label>
          <input
            id="expiry"
            name="expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            maxLength={5}
            value={card.expiry}
            onChange={(e) => onChange("expiry", formatExpiry(e.target.value))}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cvc" className={labelClass}>
            {t("cvc")}
          </label>
          <input
            id="cvc"
            name="cvc"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder={brand === "amex" ? "0000" : "000"}
            maxLength={cvcLength(brand)}
            value={card.cvc}
            onChange={(e) =>
              onChange("cvc", e.target.value.replace(/\D/g, "").slice(0, cvcLength(brand)))
            }
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-2">{t("cvcHint")}</p>
        </div>
      </div>
    </div>
  );
}
