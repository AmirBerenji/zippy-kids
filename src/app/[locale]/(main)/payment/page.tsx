import {
  BookingDraft,
  DEFAULT_CURRENCY,
  MAX_HOURS,
  MIN_HOURS,
  ProviderType,
} from "@/model/payment";
import React from "react";
import PaymentHeader from "./components/header";
import PaymentClient from "./components/paymentClient";

type SearchParams = Record<string, string | string[] | undefined>;

const FALLBACK_PHOTO =
  "https://storage.googleapis.com/a1aa/image/ba44c489-de91-426d-20e1-3e0d56e98f5f.jpg";

function readParam(params: SearchParams, key: string): string {
  const value = params[key];
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

/**
 * Builds the booking shown on the checkout page.
 *
 * TODO: once the API exists, resolve the provider server side
 * (getNurseById / getDoctorById) and take `providerName` / `hourlyRate`
 * from that response — never from the query string, since the amount
 * charged must not be user controlled.
 */
function buildBookingDraft(params: SearchParams): BookingDraft {
  const providerType: ProviderType =
    readParam(params, "providerType") === "doctor" ? "doctor" : "nurse";

  const hourlyRate = Number(readParam(params, "rate"));
  const hours = Number(readParam(params, "hours"));

  return {
    providerType,
    providerId: Number(readParam(params, "providerId")) || 0,
    providerName: readParam(params, "name") || "KidooHub Specialist",
    providerTitle:
      readParam(params, "title") ||
      (providerType === "doctor" ? "Doctor" : "Nanny / Nurse"),
    providerPhoto: readParam(params, "photo") || FALLBACK_PHOTO,
    hourlyRate: Number.isFinite(hourlyRate) && hourlyRate > 0 ? hourlyRate : 5000,
    currency: DEFAULT_CURRENCY,
    hours: Number.isFinite(hours)
      ? Math.min(Math.max(hours, MIN_HOURS), MAX_HOURS)
      : 2,
  };
}

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const booking = buildBookingDraft(params);

  return (
    <>
      <PaymentHeader />
      <PaymentClient booking={booking} />
    </>
  );
}
