"use client";

import LoadingPage from "@/app/component/general/Loading";
import StarRating from "@/app/component/general/StarRating";
import { getProduct, subscribeProducts } from "@/lib/productStore";
import { DEFAULT_CURRENCY, formatAmount } from "@/model/payment";
import {
  FREE_SHIPPING_THRESHOLD,
  LOW_STOCK_THRESHOLD,
  MAX_QUANTITY,
  MIN_QUANTITY,
  Product,
  clampQuantity,
  discountPercent,
} from "@/model/product";
import {
  ArrowLeft,
  Minus,
  PackageX,
  Plus,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  productId: number;
}

export default function ProductDetailClient({ productId }: Props) {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const router = useRouter();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(MIN_QUANTITY);

  useEffect(() => {
    const load = () => {
      setProduct(getProduct(productId));
      setLoading(false);
    };

    load();
    return subscribeProducts(load);
  }, [productId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!product || !product.active) {
    return (
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-lg py-16 flex flex-col items-center text-center px-6">
          <PackageX className="w-10 h-10 text-[#ff9a5a] mb-4" />
          <p className="text-lg font-semibold text-[#2f3e4e]">
            {t("notFound")}
          </p>
          <Link
            href={`/${locale}/shop`}
            className="mt-6 bg-[#ff9a5a] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#ff7a3a] transition"
          >
            {t("backToShop")}
          </Link>
        </div>
      </section>
    );
  }

  const discount = discountPercent(product);
  const soldOut = product.stock <= 0;
  const lineTotal = product.price * quantity;

  const changeQuantity = (delta: number) =>
    setQuantity((prev) => clampQuantity(prev + delta, product.stock));

  // Only the id and the quantity travel in the URL — the checkout reads the
  // price from the catalogue, so it can never be tampered with from here.
  const handleBuyNow = () => {
    router.push(
      `/${locale}/payment?type=product&productId=${product.id}&qty=${quantity}`,
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-20 pb-16">
      <Link
        href={`/${locale}/shop`}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#ff9a5a] transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("backToShop")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-2xl shadow-lg p-6 relative">
          <img
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className={`w-full aspect-square object-cover rounded-xl bg-[#f4f7f9] ${
              soldOut ? "opacity-60" : ""
            }`}
          />
          {discount > 0 && !soldOut && (
            <span className="absolute top-9 left-9 bg-[#ff9a5a] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow">
              {t("save", { percent: discount })}
            </span>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {t(`categories.${product.category}`)}
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2f3e4e] mt-2">
              {product.name}
            </h2>

            <div className="mt-3">
              <StarRating
                rating={product.rating}
                reviewCount={product.reviewsCount}
                size="sm"
              />
            </div>

            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-3xl font-extrabold text-[#ff9a5a]">
                {formatAmount(product.price, product.currency)}
              </span>
              {discount > 0 && (
                <span className="text-lg text-gray-400 line-through">
                  {formatAmount(product.compareAtPrice!, product.currency)}
                </span>
              )}
            </div>

            <p className="text-gray-600 mt-5 leading-relaxed">
              {product.description}
            </p>

            <dl className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 text-sm">
              <div>
                <dt className="text-gray-500">{t("ageRange")}</dt>
                <dd className="font-semibold text-[#2f3e4e] mt-1">
                  {product.ageRange}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">{t("availability")}</dt>
                <dd
                  className={`font-semibold mt-1 ${
                    soldOut ? "text-gray-500" : "text-green-600"
                  }`}
                >
                  {soldOut
                    ? t("outOfStock")
                    : product.stock <= LOW_STOCK_THRESHOLD
                      ? t("lowStock", { count: product.stock })
                      : t("inStock")}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#2f3e4e]">
                  {t("quantity")}
                </span>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => changeQuantity(-1)}
                    disabled={soldOut || quantity <= MIN_QUANTITY}
                    aria-label={t("decrease")}
                    className="px-3 py-3 text-[#2f3e4e] hover:bg-gray-50 disabled:opacity-40 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-[#2f3e4e]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => changeQuantity(1)}
                    disabled={
                      soldOut ||
                      quantity >= Math.min(MAX_QUANTITY, product.stock)
                    }
                    aria-label={t("increase")}
                    className="px-3 py-3 text-[#2f3e4e] hover:bg-gray-50 disabled:opacity-40 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={soldOut}
                className="flex-1 flex items-center justify-center gap-2 bg-[#ff9a5a] hover:bg-orange-500 disabled:opacity-60 disabled:hover:bg-[#ff9a5a] text-white font-semibold py-4 rounded-xl shadow-md transition"
              >
                {soldOut
                  ? t("outOfStock")
                  : `${t("buyNow")} · ${formatAmount(lineTotal, product.currency)}`}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#ff9a5a] shrink-0 mt-0.5" />
              <p className="text-gray-600">
                {t("deliveryNote")}{" "}
                {t("freeShippingNote", {
                  amount: formatAmount(
                    FREE_SHIPPING_THRESHOLD,
                    product.currency || DEFAULT_CURRENCY,
                  ),
                })}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-[#ff9a5a] shrink-0 mt-0.5" />
              <p className="text-gray-600">{t("returnsNote")}</p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#ff9a5a] shrink-0 mt-0.5" />
              <p className="text-gray-600">{t("secureNote")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
