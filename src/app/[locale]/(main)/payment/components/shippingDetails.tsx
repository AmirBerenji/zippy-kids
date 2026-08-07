"use client";

import { ShippingDetails as ShippingDetailsModel } from "@/model/product";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  shipping: ShippingDetailsModel;
  onChange: (field: keyof ShippingDetailsModel, value: string) => void;
}

export default function ShippingDetails({ shipping, onChange }: Props) {
  const t = useTranslations("Shop.Checkout");

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent transition";
  const labelClass = "block text-sm font-semibold text-[#2f3e4e] mb-2";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h2 className="text-xl font-bold text-[#2f3e4e] mb-6">
        {t("shippingDetails")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="shipFullName" className={labelClass}>
            {t("fullName")}
          </label>
          <input
            id="shipFullName"
            name="shipFullName"
            type="text"
            autoComplete="name"
            placeholder={t("fullNamePlaceholder")}
            value={shipping.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="shipEmail" className={labelClass}>
            {t("email")}
          </label>
          <input
            id="shipEmail"
            name="shipEmail"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={shipping.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="shipPhone" className={labelClass}>
            {t("phone")}
          </label>
          <input
            id="shipPhone"
            name="shipPhone"
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            value={shipping.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="shipAddress" className={labelClass}>
            {t("address")}
          </label>
          <input
            id="shipAddress"
            name="shipAddress"
            type="text"
            autoComplete="street-address"
            placeholder={t("addressPlaceholder")}
            value={shipping.address}
            onChange={(e) => onChange("address", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="shipCity" className={labelClass}>
            {t("city")}
          </label>
          <input
            id="shipCity"
            name="shipCity"
            type="text"
            autoComplete="address-level2"
            placeholder={t("cityPlaceholder")}
            value={shipping.city}
            onChange={(e) => onChange("city", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="shipNote" className={labelClass}>
            {t("note")}
          </label>
          <textarea
            id="shipNote"
            name="shipNote"
            rows={3}
            placeholder={t("notePlaceholder")}
            value={shipping.note}
            onChange={(e) => onChange("note", e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    </div>
  );
}
