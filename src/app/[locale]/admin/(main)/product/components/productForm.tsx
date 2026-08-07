"use client";

import ErrorMessage from "@/app/component/general/ErrorMessage";
import { useToast } from "@/app/component/toast/ToastProvider";
import { createProduct, updateProduct } from "@/lib/productStore";
import { DEFAULT_CURRENCY, formatAmount } from "@/model/payment";
import {
  PRODUCT_CATEGORIES,
  Product,
  ProductCategory,
  ProductInput,
  productPlaceholder,
} from "@/model/product";
import { ArrowLeft, Save } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

interface Props {
  /** Omitted when adding; supplied when editing an existing product. */
  product?: Product;
}

const EMOJIS = [
  "🧸",
  "🌈",
  "📚",
  "👕",
  "🍼",
  "🚼",
  "🔤",
  "🌙",
  "🧱",
  "🎨",
  "👟",
  "🎹",
  "🧩",
  "🚗",
  "⚽",
  "🎈",
];

const TINTS = [
  "#ffd9bf",
  "#cfe4ef",
  "#e2ecd8",
  "#e6ddf3",
  "#fde3ea",
  "#fff0c9",
];

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  toys: "Toys",
  books: "Books",
  clothing: "Clothing",
  care: "Baby care",
  gear: "Gear",
  learning: "Learning",
};

/** "Wooden Rainbow Stacker" -> "wooden-rainbow-stacker" */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Reads the icon and colour back out of a tile produced by
 * `productPlaceholder`, so editing a product keeps the tile it already has.
 */
function readTile(image?: string): { emoji: string; tint: string } {
  const fallback = { emoji: EMOJIS[0], tint: TINTS[0] };
  if (!image || !image.startsWith("data:image/svg+xml")) return fallback;

  try {
    const svg = decodeURIComponent(image.slice(image.indexOf(",") + 1));
    return {
      emoji: svg.match(/>([^<>]+)<\/text>/)?.[1] ?? fallback.emoji,
      tint: svg.match(/stop-color="(#[0-9a-fA-F]{3,8})"/)?.[1] ?? fallback.tint,
    };
  } catch {
    return fallback;
  }
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const toast = useToast();

  const isEdit = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [category, setCategory] = useState<ProductCategory>(
    product?.category ?? "toys",
  );
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [compareAtPrice, setCompareAtPrice] = useState(
    product?.compareAtPrice ? String(product.compareAtPrice) : "",
  );
  const [stock, setStock] = useState(product ? String(product.stock) : "");
  const [ageRange, setAgeRange] = useState(product?.ageRange ?? "");
  const [imageUrl, setImageUrl] = useState(
    product && !product.image.startsWith("data:") ? product.image : "",
  );
  const [emoji, setEmoji] = useState(() => readTile(product?.image).emoji);
  const [tint, setTint] = useState(() => readTile(product?.image).tint);
  const [active, setActive] = useState(product?.active ?? true);

  const [message, setMessage] = useState("");
  const [isSaving, setSaving] = useState(false);

  // A pasted URL wins; otherwise the emoji tile stands in for a photo.
  const previewImage = useMemo(
    () => (imageUrl.trim() ? imageUrl.trim() : productPlaceholder(emoji, tint)),
    [imageUrl, emoji, tint],
  );

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent transition";
  const labelClass = "block text-sm font-semibold text-[#2f3e4e] mb-2";

  const validate = () => {
    if (!name.trim()) return "Please enter a product name.";
    if (!description.trim()) return "Please enter a description.";
    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      return "Please enter a price greater than 0.";
    }
    if (compareAtPrice.trim()) {
      if (!Number.isFinite(Number(compareAtPrice))) {
        return "The old price must be a number.";
      }
      if (Number(compareAtPrice) <= Number(price)) {
        return "The old price must be higher than the selling price.";
      }
    }
    if (!Number.isFinite(Number(stock)) || Number(stock) < 0) {
      return "Please enter the stock quantity (0 or more).";
    }
    if (!ageRange.trim()) return "Please enter the recommended age range.";
    return "";
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    const input: ProductInput = {
      slug: slugify(name),
      name: name.trim(),
      description: description.trim(),
      price: Math.round(Number(price)),
      compareAtPrice: compareAtPrice.trim()
        ? Math.round(Number(compareAtPrice))
        : undefined,
      currency: DEFAULT_CURRENCY,
      category,
      image: previewImage,
      stock: Math.round(Number(stock)),
      rating: product?.rating ?? 0,
      reviewsCount: product?.reviewsCount ?? 0,
      ageRange: ageRange.trim(),
      active,
    };

    setSaving(true);

    // ─── TODO: connect to the products API ────────────────────────────────
    // const result = isEdit
    //   ? await updateProductApi(product!.id, input)
    //   : await createProductApi(input);
    // if (!result?.success) {
    //   setMessage(result?.message ?? "The product could not be saved.");
    //   setSaving(false);
    //   return;
    // }
    // ──────────────────────────────────────────────────────────────────────
    if (isEdit && product) {
      updateProduct(product.id, input);
      toast.success("Product updated.");
    } else {
      createProduct(input);
      toast.success("Product added.");
    }

    setSaving(false);
    router.push(`/${locale}/admin/product`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href={`/${locale}/admin/product`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#ff9a5a] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to products
          </Link>
          <h1 className="text-2xl font-bold text-[#2f3e4e] mt-2">
            {isEdit ? "Edit product" : "Add product"}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="name" className={labelClass}>
                Product name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Wooden Rainbow Stacker"
                className={inputClass}
              />
              {name.trim() && (
                <p className="text-xs text-gray-400 mt-1">
                  Slug: {slugify(name)}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className={labelClass}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What it is, what it is made of, why a parent would buy it."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className={inputClass}
              >
                {PRODUCT_CATEGORIES.map((key) => (
                  <option key={key} value={key}>
                    {CATEGORY_LABELS[key]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ageRange" className={labelClass}>
                Recommended age
              </label>
              <input
                id="ageRange"
                name="ageRange"
                type="text"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                placeholder="1–5 years"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="price" className={labelClass}>
                Price ({DEFAULT_CURRENCY})
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min={0}
                step={100}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="8900"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="compareAtPrice" className={labelClass}>
                Old price (optional)
              </label>
              <input
                id="compareAtPrice"
                name="compareAtPrice"
                type="number"
                min={0}
                step={100}
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value)}
                placeholder="11900"
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1">
                Shown struck through, with a discount badge on the card.
              </p>
            </div>

            <div>
              <label htmlFor="stock" className={labelClass}>
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min={0}
                step={1}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="24"
                className={inputClass}
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer pb-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="h-5 w-5 accent-[#ff9a5a]"
                />
                <span className="text-sm font-semibold text-[#2f3e4e]">
                  Visible in the shop
                </span>
              </label>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="imageUrl" className={labelClass}>
                Image URL (optional)
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1">
                Leave it empty to use a coloured tile instead of a photo.
              </p>
            </div>
          </div>

          {!imageUrl.trim() && (
            <div className="pt-2 space-y-3">
              <p className={labelClass}>Tile icon</p>
              <div className="flex flex-wrap gap-2">
                {EMOJIS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setEmoji(item)}
                    className={`w-11 h-11 rounded-xl text-xl border transition ${
                      emoji === item
                        ? "border-[#ff9a5a] bg-orange-50"
                        : "border-gray-200 hover:border-[#ff9a5a]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <p className={labelClass}>Tile colour</p>
              <div className="flex flex-wrap gap-2">
                {TINTS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTint(item)}
                    aria-label={`Tile colour ${item}`}
                    style={{ backgroundColor: item }}
                    className={`w-11 h-11 rounded-xl border-2 transition ${
                      tint === item ? "border-[#ff9a5a]" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <ErrorMessage message={message} />

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center justify-center gap-2 bg-[#ff9a5a] hover:bg-orange-500 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
            >
              <Save className="w-4 h-4" />
              {isEdit ? "Save changes" : "Add product"}
            </button>

            <Link
              href={`/${locale}/admin/product`}
              className="px-6 py-3 rounded-xl border border-gray-300 text-[#2f3e4e] font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl lg:sticky lg:top-4">
          <h2 className="text-sm font-bold text-[#2f3e4e] mb-4">
            Shop card preview
          </h2>

          <img
            src={previewImage}
            alt={name || "Product preview"}
            className="w-full aspect-square object-cover rounded-xl bg-[#f4f7f9]"
          />

          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mt-4">
            {CATEGORY_LABELS[category]}
          </p>
          <p className="text-lg font-semibold text-[#2f3e4e] mt-1">
            {name || "Product name"}
          </p>
          <p className="text-xl font-extrabold text-[#ff9a5a] mt-2">
            {formatAmount(Number(price) || 0, DEFAULT_CURRENCY)}
          </p>
          {compareAtPrice.trim() && Number(compareAtPrice) > Number(price) && (
            <p className="text-sm text-gray-400 line-through">
              {formatAmount(Number(compareAtPrice), DEFAULT_CURRENCY)}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
