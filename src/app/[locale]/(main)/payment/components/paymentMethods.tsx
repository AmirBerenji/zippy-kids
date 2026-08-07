"use client";

import { PaymentMethod } from "@/model/payment";
import { Banknote, CreditCard, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  /**
   * Wording for flows that are not a provider booking — the shop, for example,
   * calls `cash` "cash on delivery". Anything left out falls back to the
   * booking copy in the `Payment` namespace.
   */
  labels?: {
    title?: string;
    methods?: Partial<
      Record<PaymentMethod, { title: string; description: string }>
    >;
  };
}

const METHODS: {
  key: PaymentMethod;
  icon: React.ElementType;
  labelKey: string;
  descriptionKey: string;
}[] = [
  {
    key: "card",
    icon: CreditCard,
    labelKey: "card",
    descriptionKey: "cardDescription",
  },
  {
    key: "idram",
    icon: Wallet,
    labelKey: "idram",
    descriptionKey: "idramDescription",
  },
  {
    key: "cash",
    icon: Banknote,
    labelKey: "cash",
    descriptionKey: "cashDescription",
  },
];

export default function PaymentMethods({ selected, onSelect, labels }: Props) {
  const t = useTranslations("Payment");

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h2 className="text-xl font-bold text-[#2f3e4e] mb-6">
        {labels?.title ?? t("paymentMethod")}
      </h2>

      <div className="space-y-3">
        {METHODS.map(({ key, icon: Icon, labelKey, descriptionKey }) => {
          const isActive = selected === key;
          const override = labels?.methods?.[key];
          return (
            <label
              key={key}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition ${
                isActive
                  ? "border-[#ff9a5a] bg-orange-50"
                  : "border-gray-200 hover:border-[#ff9a5a]"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={key}
                checked={isActive}
                onChange={() => onSelect(key)}
                className="mt-1 h-5 w-5 accent-[#ff9a5a]"
              />
              <Icon
                className={`w-6 h-6 mt-0.5 shrink-0 ${
                  isActive ? "text-[#ff9a5a]" : "text-gray-400"
                }`}
              />
              <span className="flex-1">
                <span className="block font-semibold text-[#2f3e4e]">
                  {override?.title ?? t(labelKey)}
                </span>
                <span className="block text-sm text-gray-500 mt-1">
                  {override?.description ?? t(descriptionKey)}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
