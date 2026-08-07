import { getPlanByKey, parseBillingCycle } from "@/model/subscription";
import { notFound } from "next/navigation";
import React from "react";
import CheckoutClient from "./components/checkoutClient";
import CheckoutHeader from "./components/header";

type SearchParams = Record<string, string | string[] | undefined>;

function readParam(params: SearchParams, key: string): string {
  const value = params[key];
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function SubscriptionCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const plan = getPlanByKey(readParam(params, "plan"));

  // Unknown plan, or the free tier which never reaches a card form.
  if (!plan || plan.monthlyPrice === 0) {
    notFound();
  }

  const cycle = parseBillingCycle(readParam(params, "cycle"));

  return (
    <>
      <CheckoutHeader />
      <CheckoutClient plan={plan} cycle={cycle} />
    </>
  );
}
