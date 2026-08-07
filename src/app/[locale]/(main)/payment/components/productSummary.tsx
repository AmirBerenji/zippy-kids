"use client";

import { formatAmount } from "@/model/payment";
import { Product, ProductOrderSummary } from "@/model/product";
import { ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

interface Props {
  product: Product;
  summary: ProductOrderSummary;
}

export default function ProductSummary({ product, summary }: Props) {
  const t = useTranslations("Shop.Checkout");
  const locale = useLocale();

  return (
    <div className="lg:sticky lg:top-8 space-y-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[#2f3e4e] mb-6">
          {t("orderSummary")}
        </h2>

        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            width={64}
            height={64}
            loading="lazy"
            className="w-16 h-16 rounded-xl object-cover border border-[#c6d9e3] bg-[#f4f7f9]"
          />
          <div className="min-w-0">
            <p className="font-semibold text-[#2f3e4e] truncate">
              {product.name}
            </p>
            <p className="text-sm text-gray-500 truncate">{product.ageRange}</p>
          </div>
        </div>

        <dl className="py-6 space-y-3 text-sm border-b border-gray-100">
          <div className="flex justify-between">
            <dt className="text-gray-500">{t("unitPrice")}</dt>
            <dd className="text-[#2f3e4e] font-medium">
              {formatAmount(summary.unitPrice, summary.currency)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">{t("quantity")}</dt>
            <dd className="text-[#2f3e4e] font-medium">{summary.quantity}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">{t("subtotal")}</dt>
            <dd className="text-[#2f3e4e] font-medium">
              {formatAmount(summary.subtotal, summary.currency)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">{t("shipping")}</dt>
            <dd
              className={`font-medium ${
                summary.shipping === 0 ? "text-green-600" : "text-[#2f3e4e]"
              }`}
            >
              {summary.shipping === 0
                ? t("freeShipping")
                : formatAmount(summary.shipping, summary.currency)}
            </dd>
          </div>
        </dl>

        <div className="flex items-baseline justify-between pt-6">
          <span className="text-base font-bold text-[#2f3e4e]">
            {t("total")}
          </span>
          <span className="text-2xl font-extrabold text-[#ff9a5a]">
            {formatAmount(summary.total, summary.currency)}
          </span>
        </div>
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
          {t("returnsNote")}{" "}
          <a
            href={`/${locale}/terms`}
            className="text-[#ff9a5a] hover:underline font-medium"
          >
            {t("termsLink")}
          </a>
        </p>
      </div>
    </div>
  );
}
