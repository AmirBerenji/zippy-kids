"use client";

import StarRating from "@/app/component/general/StarRating";
import { formatAmount } from "@/model/payment";
import { LOW_STOCK_THRESHOLD, Product, discountPercent } from "@/model/product";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const t = useTranslations("Shop");
  const locale = useLocale();

  const discount = discountPercent(product);
  const soldOut = product.stock <= 0;
  const detailHref = `/${locale}/shop/${product.id}`;

  return (
    <div
      className="group rounded-2xl shadow-md p-4 flex flex-col bg-white
      hover:shadow-lg hover:shadow-[#ff9a5a]/40 transition-shadow duration-300"
    >
      <Link
        href={detailHref}
        className="relative block rounded-xl overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          loading="lazy"
          className={`w-full aspect-square object-cover bg-[#f4f7f9] transition-transform duration-300 group-hover:scale-105 ${
            soldOut ? "opacity-60" : ""
          }`}
        />

        {discount > 0 && !soldOut && (
          <span className="absolute top-3 left-3 bg-[#ff9a5a] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {t("save", { percent: discount })}
          </span>
        )}

        {soldOut && (
          <span className="absolute top-3 left-3 bg-[#2f3e4e] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {t("outOfStock")}
          </span>
        )}
      </Link>

      <div className="flex-1 flex flex-col mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {t(`categories.${product.category}`)}
        </p>

        {/* Two fixed lines, so the rows underneath line up across the grid. */}
        <Link href={detailHref}>
          <h3 className="text-lg font-semibold text-[#2f3e4e] mt-1 line-clamp-2 min-h-14 hover:text-[#ff9a5a] transition">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2">
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewsCount}
            size="sm"
          />
        </div>

        <p className="text-sm text-gray-500 mt-3 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-4">
          {/* Price and old price share one baseline so neither can wrap the
              button onto a second line the way a side-by-side row did. */}
          <div className="flex items-baseline gap-2 min-h-7">
            <span className="text-xl font-extrabold text-[#ff9a5a] whitespace-nowrap">
              {formatAmount(product.price, product.currency)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through whitespace-nowrap">
                {formatAmount(product.compareAtPrice!, product.currency)}
              </span>
            )}
          </div>

          <p className="text-xs font-semibold mt-1 min-h-4">
            {soldOut ? (
              <span className="text-gray-400">{t("outOfStock")}</span>
            ) : product.stock <= LOW_STOCK_THRESHOLD ? (
              <span className="text-orange-600">
                {t("lowStock", { count: product.stock })}
              </span>
            ) : (
              <span className="text-green-600">{t("inStock")}</span>
            )}
          </p>

          <Link
            href={detailHref}
            className={`mt-3 w-full flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
              soldOut
                ? "border border-gray-300 text-[#2f3e4e] hover:bg-gray-50"
                : "bg-[#ff9a5a] text-white hover:bg-[#ff7a3a] shadow-sm"
            }`}
          >
            {t("viewDetails")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
