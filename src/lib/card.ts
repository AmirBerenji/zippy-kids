export type CardBrand = "visa" | "mastercard" | "amex" | "unknown";

export const BRAND_LABELS: Record<CardBrand, string> = {
  visa: "VISA",
  mastercard: "Mastercard",
  amex: "Amex",
  unknown: "",
};

/** Digits only, useful before any check or formatting. */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function detectBrand(value: string): CardBrand {
  const digits = onlyDigits(value);

  if (/^4/.test(digits)) return "visa";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^5[1-5]/.test(digits) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(digits)) {
    return "mastercard";
  }
  return "unknown";
}

/** Amex is 15 digits in 4-6-5 groups, everything else 16 in groups of 4. */
export function formatCardNumber(value: string): string {
  const brand = detectBrand(value);
  const digits = onlyDigits(value).slice(0, brand === "amex" ? 15 : 16);

  const groups =
    brand === "amex"
      ? [digits.slice(0, 4), digits.slice(4, 10), digits.slice(10, 15)]
      : (digits.match(/.{1,4}/g) ?? []);

  return groups.filter(Boolean).join(" ");
}

export function formatExpiry(value: string): string {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function cvcLength(brand: CardBrand): number {
  return brand === "amex" ? 4 : 3;
}

export function luhnCheck(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length < 12) return false;

  let sum = 0;
  let double = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);

    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    double = !double;
  }

  return sum % 10 === 0;
}

export function isCardNumberValid(value: string): boolean {
  const digits = onlyDigits(value);
  const expected = detectBrand(value) === "amex" ? 15 : 16;
  return digits.length === expected && luhnCheck(digits);
}

/** Accepts MM/YY and rejects anything already past. */
export function isExpiryValid(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 4) return false;

  const month = Number(digits.slice(0, 2));
  const year = 2000 + Number(digits.slice(2));
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const endOfMonth = new Date(year, month, 1);
  return endOfMonth > now;
}

export function isCvcValid(value: string, brand: CardBrand): boolean {
  return onlyDigits(value).length === cvcLength(brand);
}

/** Last 4 digits, for confirmation screens and receipts. */
export function lastFour(value: string): string {
  return onlyDigits(value).slice(-4);
}
