export type ProviderType = "nurse" | "doctor";

export type PaymentMethod = "card" | "idram" | "cash";

export interface BookingDraft {
  providerType: ProviderType;
  providerId: number;
  providerName: string;
  providerTitle: string;
  providerPhoto: string;
  hourlyRate: number;
  currency: string;
  hours: number;
}

export interface PayerDetails {
  fullName: string;
  email: string;
  phone: string;
  note: string;
}

/**
 * Card fields as typed by the user.
 *
 * SECURITY: never send `number` or `cvc` to your own backend — hand them to
 * the gateway's tokenizer (Stripe Elements, bank iframe) and submit the
 * resulting token instead, so the raw PAN never reaches your server.
 */
export interface CardDetails {
  number: string;
  holder: string;
  expiry: string;
  cvc: string;
}

export interface PaymentSummary {
  subtotal: number;
  serviceFee: number;
  total: number;
  currency: string;
}

/** Payload the checkout page hands to the backend once the API is wired up. */
export interface PaymentIntentRequest {
  provider_type: ProviderType;
  provider_id: number;
  date: string;
  time: string;
  hours: number;
  method: PaymentMethod;
  full_name: string;
  email: string;
  phone: string;
  note: string;
  amount: number;
  currency: string;
}

export interface PaymentIntentResponse {
  success: boolean;
  order_id?: string;
  /** Set for redirect based gateways (ArCa / Ameria / Idram / Stripe Checkout). */
  redirect_url?: string;
  status?: "pending" | "paid" | "failed";
  message?: string;
}

export const SERVICE_FEE_RATE = 0.05;
export const MIN_HOURS = 1;
export const MAX_HOURS = 12;
export const DEFAULT_CURRENCY = "AMD";

export function calculateSummary(
  hourlyRate: number,
  hours: number,
  currency: string = DEFAULT_CURRENCY,
): PaymentSummary {
  const subtotal = hourlyRate * hours;
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);

  return {
    subtotal,
    serviceFee,
    total: subtotal + serviceFee,
    currency,
  };
}

export function formatAmount(amount: number, currency: string): string {
  return `${new Intl.NumberFormat("en-US").format(Math.round(amount))} ${currency}`;
}
