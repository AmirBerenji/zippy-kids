"use client";

import ErrorMessage from "@/app/component/general/ErrorMessage";
import LoadingPage from "@/app/component/general/Loading";
import { useToast } from "@/app/component/toast/ToastProvider";
import {
  BookingDraft,
  MAX_HOURS,
  MIN_HOURS,
  PayerDetails as PayerDetailsModel,
  PaymentIntentRequest,
  PaymentMethod,
  calculateSummary,
  formatAmount,
} from "@/model/payment";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import BookingDetails from "./bookingDetails";
import OrderSummary from "./orderSummary";
import PayerDetails from "./payerDetails";
import PaymentMethods from "./paymentMethods";

interface Props {
  booking: BookingDraft;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PaymentClient({ booking }: Props) {
  const t = useTranslations("Payment");
  const toast = useToast();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState(booking.hours);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [payer, setPayer] = useState<PayerDetailsModel>({
    fullName: "",
    email: "",
    phone: "",
    note: "",
  });

  const [minDate, setMinDate] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  // Set on the client only, so the server rendered markup stays stable.
  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const summary = useMemo(
    () => calculateSummary(booking.hourlyRate, hours, booking.currency),
    [booking.hourlyRate, booking.currency, hours],
  );

  const handleHoursChange = (value: number) => {
    setHours(Math.min(Math.max(value, MIN_HOURS), MAX_HOURS));
  };

  const handlePayerChange = (field: keyof PayerDetailsModel, value: string) => {
    setPayer((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!date) return t("errorDate");
    if (!time) return t("errorTime");
    if (!payer.fullName.trim()) return t("errorFullName");
    if (!EMAIL_PATTERN.test(payer.email.trim())) return t("errorEmail");
    if (!payer.phone.trim()) return t("errorPhone");
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

    const request: PaymentIntentRequest = {
      provider_type: booking.providerType,
      provider_id: booking.providerId,
      date,
      time,
      hours,
      method,
      full_name: payer.fullName.trim(),
      email: payer.email.trim(),
      phone: payer.phone.trim(),
      note: payer.note.trim(),
      amount: summary.total,
      currency: summary.currency,
    };

    setLoading(true);

    // ─── TODO: connect to the payment API ─────────────────────────────────
    // const result = await createPayment(request);
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
    console.log("Payment request payload:", request);
    toast.info(t("apiPending"));

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      {isLoading && <LoadingPage />}

      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-20 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <BookingDetails
            date={date}
            time={time}
            hours={hours}
            minDate={minDate}
            onDateChange={setDate}
            onTimeChange={setTime}
            onHoursChange={handleHoursChange}
          />

          <PayerDetails payer={payer} onChange={handlePayerChange} />

          <PaymentMethods selected={method} onSelect={setMethod} />

          <ErrorMessage message={message} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#ff9a5a] hover:bg-orange-500 disabled:opacity-60 text-white font-semibold py-4 rounded-xl shadow-md transition"
          >
            <Lock className="w-4 h-4" />
            {method === "cash"
              ? t("confirmBooking")
              : `${t("payNow")} · ${formatAmount(summary.total, summary.currency)}`}
          </button>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary booking={booking} hours={hours} summary={summary} />
        </div>
      </section>
    </form>
  );
}
