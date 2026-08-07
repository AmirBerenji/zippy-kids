"use client";

import { getProduct, subscribeProducts } from "@/lib/productStore";
import { Product } from "@/model/product";
import { useLocale } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductForm from "../../components/productForm";

interface Props {
  productId: number;
}

export default function EditProductClient({ productId }: Props) {
  const locale = useLocale();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      setProduct(getProduct(productId));
      setLoading(false);
    };

    load();
    return subscribeProducts(load);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center text-gray-500">
        Loading product…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <p className="font-semibold text-[#2f3e4e]">
          That product no longer exists.
        </p>
        <Link
          href={`/${locale}/admin/product`}
          className="inline-block mt-4 bg-[#ff9a5a] hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
        >
          Back to products
        </Link>
      </div>
    );
  }

  // Keyed so the form re-initialises if the catalogue changes underneath it.
  return <ProductForm key={product.id} product={product} />;
}
