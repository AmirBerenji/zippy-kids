import React from "react";
import ShopHeader from "../components/header";
import ProductDetailClient from "./components/productDetailClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <ShopHeader />
      <ProductDetailClient productId={Number(id) || 0} />
    </>
  );
}
