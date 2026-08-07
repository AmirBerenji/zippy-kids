import React from "react";
import EditProductClient from "./components/editProductClient";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditProductClient productId={Number(id) || 0} />;
}
