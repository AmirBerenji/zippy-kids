import { DEFAULT_CURRENCY } from "./payment";

export type BillingCycle = "monthly" | "yearly";

export type PlanKey = "starter" | "family" | "premium";

export interface SubscriptionPlan {
  key: PlanKey;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  highlighted: boolean;
}

/** Payload the subscription page hands to the backend once the API is wired up. */
export interface SubscribeRequest {
  plan: PlanKey;
  cycle: BillingCycle;
  amount: number;
  currency: string;
}

/**
 * What the card step submits. Carries a gateway token, never the raw card
 * number — see the SECURITY note on `CardDetails` in ./payment.
 */
export interface SubscribeChargeRequest extends SubscribeRequest {
  card_token: string;
  card_last_four: string;
  card_holder: string;
}

export interface SubscribeResponse {
  success: boolean;
  subscription_id?: string;
  /** Set for redirect based gateways (ArCa / Ameria / Idram / Stripe Checkout). */
  redirect_url?: string;
  status?: "pending" | "active" | "failed";
  message?: string;
}

/** A yearly plan costs 10 monthly payments, so 2 months are free. */
export const YEARLY_PAID_MONTHS = 10;

/**
 * TODO: replace with the plans returned by the API so pricing can change
 * without a deploy. Shape is already API friendly.
 */
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    key: "starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    currency: DEFAULT_CURRENCY,
    highlighted: false,
  },
  {
    key: "family",
    monthlyPrice: 4900,
    yearlyPrice: 4900 * YEARLY_PAID_MONTHS,
    currency: DEFAULT_CURRENCY,
    highlighted: true,
  },
  {
    key: "premium",
    monthlyPrice: 9900,
    yearlyPrice: 9900 * YEARLY_PAID_MONTHS,
    currency: DEFAULT_CURRENCY,
    highlighted: false,
  },
];

export function getPlanByKey(key: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find((plan) => plan.key === key);
}

export function parseBillingCycle(value: string): BillingCycle {
  return value === "yearly" ? "yearly" : "monthly";
}

/** Total charged for one billing period. */
export function planPrice(plan: SubscriptionPlan, cycle: BillingCycle): number {
  return cycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
}

/** Price per month, used as the headline figure on both cycles. */
export function monthlyEquivalent(
  plan: SubscriptionPlan,
  cycle: BillingCycle,
): number {
  return cycle === "yearly"
    ? Math.round(plan.yearlyPrice / 12)
    : plan.monthlyPrice;
}

/** How much a year on the yearly cycle saves against paying monthly. */
export function yearlySavings(plan: SubscriptionPlan): number {
  return plan.monthlyPrice * 12 - plan.yearlyPrice;
}
