"use client";

import LoadingPage from "@/app/component/general/Loading";
import { listProducts, subscribeProducts } from "@/lib/productStore";
import { DEFAULT_CURRENCY, formatAmount } from "@/model/payment";
import {
  FREE_SHIPPING_THRESHOLD,
  PRODUCT_CATEGORIES,
  Product,
  ProductCategory,
} from "@/model/product";
import { PackageSearch, Search, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./productCard";

type SortKey = "featured" | "priceAsc" | "priceDesc" | "rating";

const SORTS: SortKey[] = ["featured", "priceAsc", "priceDesc", "rating"];

export default function ShopClient() {
  const t = useTranslations("Shop");

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");

  // The catalogue lives in the browser for now, so it is read after mount and
  // re-read whenever the admin panel changes it.
  useEffect(() => {
    const load = () => {
      setProducts(listProducts());
      setLoading(false);
    };

    load();
    return subscribeProducts(load);
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesQuery =
        !needle ||
        product.name.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle);

      return matchesCategory && matchesQuery;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "priceAsc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured: in stock first, then the biggest discounts.
        sorted.sort((a, b) => {
          const stock = Number(b.stock > 0) - Number(a.stock > 0);
          if (stock !== 0) return stock;
          return (b.compareAtPrice ?? 0) - (a.compareAtPrice ?? 0);
        });
    }

    return sorted;
  }, [products, query, category, sort]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const chipClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-semibold border transition ${
      active
        ? "bg-[#ff9a5a] text-white border-[#ff9a5a]"
        : "bg-white text-[#2f3e4e] border-gray-200 hover:border-[#ff9a5a]"
    }`;

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-20 pb-16">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-white rounded-xl shadow-sm py-3 px-4 mb-8">
        <Truck className="w-4 h-4 text-[#ff9a5a]" />
        {t("freeShippingNote", {
          amount: formatAmount(FREE_SHIPPING_THRESHOLD, DEFAULT_CURRENCY),
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent transition"
            />
          </div>

          <div className="sm:w-64">
            <label htmlFor="sort" className="sr-only">
              {t("sortLabel")}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent transition"
            >
              {SORTS.map((key) => (
                <option key={key} value={key}>
                  {t(`sort.${key}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={chipClass(category === "all")}
          >
            {t("allCategories")}
          </button>
          {PRODUCT_CATEGORIES.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={chipClass(category === key)}
            >
              {t(`categories.${key}`)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {t("resultCount", { count: visible.length })}
      </p>

      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg py-16 flex flex-col items-center text-center px-6">
          <PackageSearch className="w-10 h-10 text-[#ff9a5a] mb-4" />
          <p className="text-lg font-semibold text-[#2f3e4e]">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
