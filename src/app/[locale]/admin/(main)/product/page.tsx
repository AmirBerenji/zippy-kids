"use client";

import { useToast } from "@/app/component/toast/ToastProvider";
import {
  deleteProduct,
  listAllProducts,
  resetProducts,
  subscribeProducts,
  toggleProductActive,
} from "@/lib/productStore";
import { formatAmount } from "@/model/payment";
import { LOW_STOCK_THRESHOLD, Product, ProductCategory } from "@/model/product";
import { Eye, EyeOff, Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  toys: "Toys",
  books: "Books",
  clothing: "Clothing",
  care: "Baby care",
  gear: "Gear",
  learning: "Learning",
};

export default function AdminProductListPage() {
  const locale = useLocale();
  const toast = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      setProducts(listAllProducts());
      setLoading(false);
    };

    load();
    return subscribeProducts(load);
  }, []);

  const handleDelete = (product: Product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      return;
    }
    deleteProduct(product.id);
    toast.success("Product deleted.");
  };

  const handleReset = () => {
    if (!window.confirm("Discard all changes and restore the demo catalogue?")) {
      return;
    }
    resetProducts();
    toast.info("Demo catalogue restored.");
  };

  const activeCount = products.filter((p) => p.active).length;
  const outOfStock = products.filter((p) => p.stock <= 0).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2f3e4e]">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            {products.length} total · {activeCount} visible in the shop ·{" "}
            {outOfStock} out of stock
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-[#2f3e4e] text-sm font-semibold hover:bg-gray-50 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset demo data
          </button>

          <Link
            href={`/${locale}/admin/product/addProduct`}
            className="inline-flex items-center gap-2 bg-[#ff9a5a] hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            Add product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {isLoading ? (
          <p className="p-8 text-center text-gray-500">Loading products…</p>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#2f3e4e] font-semibold">No products yet.</p>
            <Link
              href={`/${locale}/admin/product/addProduct`}
              className="inline-flex items-center gap-2 mt-4 bg-[#ff9a5a] hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
            >
              <Plus className="w-4 h-4" />
              Add the first one
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Stock</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-[#f4f7f9] shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-[#2f3e4e] truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {product.ageRange}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {CATEGORY_LABELS[product.category]}
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-semibold text-[#2f3e4e]">
                        {formatAmount(product.price, product.currency)}
                      </span>
                      {product.compareAtPrice &&
                        product.compareAtPrice > product.price && (
                          <span className="block text-xs text-gray-400 line-through">
                            {formatAmount(
                              product.compareAtPrice,
                              product.currency,
                            )}
                          </span>
                        )}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`font-semibold ${
                          product.stock <= 0
                            ? "text-red-600"
                            : product.stock <= LOW_STOCK_THRESHOLD
                              ? "text-orange-600"
                              : "text-[#2f3e4e]"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          product.active
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.active ? "Visible" : "Hidden"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => toggleProductActive(product.id)}
                          title={
                            product.active ? "Hide from shop" : "Show in shop"
                          }
                          aria-label={
                            product.active ? "Hide from shop" : "Show in shop"
                          }
                          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#2f3e4e] transition"
                        >
                          {product.active ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>

                        <Link
                          href={`/${locale}/admin/product/${product.id}`}
                          title="Edit"
                          aria-label="Edit"
                          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#ff9a5a] transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(product)}
                          title="Delete"
                          aria-label="Delete"
                          className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400">
        Products are stored in this browser until the products API is connected
        — see the TODO blocks in <code>src/lib/productStore.ts</code>.
      </p>
    </div>
  );
}
