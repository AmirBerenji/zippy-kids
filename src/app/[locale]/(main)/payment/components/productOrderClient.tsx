"use client";

import ErrorMessage from "@/app/component/general/ErrorMessage";
import LoadingPage from "@/app/component/general/Loading";
import { useToast } from "@/app/component/toast/ToastProvider";
import { getProduct } from "@/lib/productStore";
import { PaymentMethod, formatAmount } from "@/model/payment";
import {
  MAX_QUANTITY,
  MIN_QUANTITY,
  Product,
  ProductOrderRequest,
  ShippingDetails as ShippingDetailsModel,
  calculateOrderSummary,
  clampQuantity,
} from "@/model/product";
import { ArrowLeft, Lock, Minus, PackageX, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import PaymentMethods from "./paymentMethods";
import ProductSummary from "./productSummary";
import ShippingDetails from "./shippingDetails";

interface Props {
  productId: number;
  quantity: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProductOrderClient({
  productId,
  quantity: initialQuantity,
}: Props) {
  const t = useTranslations("Shop.Checkout");
  const tShop = useTranslations("Shop");
  const locale = useLocale();
  const toast = useToast();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isResolving, setResolving] = useState(true);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [shipping, setShipping] = useState<ShippingDetailsModel>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  // The price is read from the catalogue, never from the query string — only
  // the product id and the quantity come in through the URL.
  useEffect(() => {
    const found = getProduct(productId);
    setProduct(found);
    if (found) {
      setQuantity((prev) => clampQuantity(prev, found.stock));
    }
    setResolving(false);
  }, [productId]);

  const summary = useMemo(
    () =>
      calculateOrderSummary(
        product?.price ?? 0,
        quantity,
        product?.currency ?? "AMD",
      ),
    [product?.price, product?.currency, quantity],
  );

  if (isResolving) {
    return <LoadingPage />;
  }

  if (!product || !product.active || product.stock <= 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-lg py-16 flex flex-col items-center text-center px-6">
          <PackageX className="w-10 h-10 text-[#ff9a5a] mb-4" />
          <p className="text-lg font-semibold text-[#2f3e4e]">
            {tShop("notFound")}
          </p>
          <Link
            href={`/${locale}/shop`}
            className="mt-6 bg-[#ff9a5a] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#ff7a3a] transition"
          >
            {tShop("backToShop")}
          </Link>
        </div>
      </section>
    );
  }

  const maxQuantity = Math.min(MAX_QUANTITY, product.stock);

  const changeQuantity = (delta: number) =>
    setQuantity((prev) => clampQuantity(prev + delta, product.stock));

  const handleShippingChange = (
    field: keyof ShippingDetailsModel,
    value: string,
  ) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!shipping.fullName.trim()) return t("errorFullName");
    if (!EMAIL_PATTERN.test(shipping.email.trim())) return t("errorEmail");
    if (!shipping.phone.trim()) return t("errorPhone");
    if (!shipping.address.trim()) return t("errorAddress");
    if (!shipping.city.trim()) return t("errorCity");
    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    const request: ProductOrderRequest = {
      product_id: product.id,
      quantity,
      method,
      full_name: shipping.fullName.trim(),
      email: shipping.email.trim(),
      phone: shipping.phone.trim(),
      address: shipping.address.trim(),
      city: shipping.city.trim(),
      note: shipping.note.trim(),
      amount: summary.total,
      currency: summary.currency,
    };

    setLoading(true);

    // ─── TODO: connect to the orders API ──────────────────────────────────
    // Mirrors the booking flow in paymentClient.tsx — see PAYMENT_API.md.
    //
    // const result = await createProductOrder(request);
    // if (!result?.success) {
    //   setMessage(result?.message ?? t("errorGeneric"));
    //   setLoading(false);
    //   return;
    // }
    // if (result.redirect_url) {
    //   window.location.href = result.redirect_url;   // bank / wallet page
    //   return;
    // }
    // router.push(`/${locale}/payment/result?orderId=${result.order_id}`);
    // ──────────────────────────────────────────────────────────────────────
    console.log("Product order payload:", request);
    toast.info(t("apiPending"));

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      {isLoading && <LoadingPage />}

      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-20 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Link
            href={`/${locale}/shop/${product.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#ff9a5a] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToProduct")}
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#2f3e4e] mb-6">
              {t("yourOrder")}
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-xl object-cover bg-[#f4f7f9] border border-gray-100"
              />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#2f3e4e]">{product.name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatAmount(product.price, product.currency)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#2f3e4e]">
                  {t("quantity")}
                </span>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => changeQuantity(-1)}
                    disabled={quantity <= MIN_QUANTITY}
                    aria-label={tShop("decrease")}
                    className="px-3 py-2 text-[#2f3e4e] hover:bg-gray-50 disabled:opacity-40 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-[#2f3e4e]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => changeQuantity(1)}
                    disabled={quantity >= maxQuantity}
                    aria-label={tShop("increase")}
                    className="px-3 py-2 text-[#2f3e4e] hover:bg-gray-50 disabled:opacity-40 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ShippingDetails shipping={shipping} onChange={handleShippingChange} />

          <PaymentMethods
            selected={method}
            onSelect={setMethod}
            labels={{
              title: t("paymentMethod"),
              methods: {
                cash: {
                  title: t("cash"),
                  description: t("cashDescription"),
                },
              },
            }}
          />

          <ErrorMessage message={message} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#ff9a5a] hover:bg-orange-500 disabled:opacity-60 text-white font-semibold py-4 rounded-xl shadow-md transition"
          >
            <Lock className="w-4 h-4" />
            {method === "cash"
              ? t("placeOrder")
              : `${t("payNow")} · ${formatAmount(summary.total, summary.currency)}`}
          </button>
        </div>

        <div className="lg:col-span-1">
          <ProductSummary product={product} summary={summary} />
        </div>
      </section>
    </form>
  );
}
