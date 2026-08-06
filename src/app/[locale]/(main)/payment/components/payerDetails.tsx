"use client";

import { PayerDetails as PayerDetailsModel } from "@/model/payment";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  payer: PayerDetailsModel;
  onChange: (field: keyof PayerDetailsModel, value: string) => void;
}

export default function PayerDetails({ payer, onChange }: Props) {
  const t = useTranslations("Payment");

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent transition";
  const labelClass = "block text-sm font-semibold text-[#2f3e4e] mb-2";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h2 className="text-xl font-bold text-[#2f3e4e] mb-6">
        {t("payerDetails")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className={labelClass}>
            {t("fullName")}
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder={t("fullNamePlaceholder")}
            value={payer.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={payer.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            value={payer.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="note" className={labelClass}>
            {t("note")}
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            placeholder={t("notePlaceholder")}
            value={payer.note}
            onChange={(e) => onChange("note", e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    </div>
  );
}
