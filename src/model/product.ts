import { DEFAULT_CURRENCY, PaymentMethod } from "./payment";

export type ProductCategory =
  | "toys"
  | "books"
  | "clothing"
  | "care"
  | "gear"
  | "learning";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "toys",
  "books",
  "clothing",
  "care",
  "gear",
  "learning",
];

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  /** Integer AMD — same money rule as the rest of the payment flow, no minor units. */
  price: number;
  /** Old price. Shown struck through when it is higher than `price`. */
  compareAtPrice?: number;
  currency: string;
  category: ProductCategory;
  image: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  ageRange: string;
  /** Inactive products stay in the admin list but disappear from the shop. */
  active: boolean;
}

/** What the admin form produces — the id is assigned by the store (later: by the API). */
export type ProductInput = Omit<Product, "id">;

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  note: string;
}

export interface ProductOrderSummary {
  unitPrice: number;
  quantity: number;
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
}

/** Payload the shop checkout hands to the backend once the API is wired up. */
export interface ProductOrderRequest {
  product_id: number;
  quantity: number;
  method: PaymentMethod;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  note: string;
  amount: number;
  currency: string;
}

export interface ProductOrderResponse {
  success: boolean;
  order_id?: string;
  /** Set for redirect based gateways (ArCa / Ameria / Idram / Stripe Checkout). */
  redirect_url?: string;
  status?: "pending" | "paid" | "failed";
  message?: string;
}

export const SHIPPING_FEE = 1500;
export const FREE_SHIPPING_THRESHOLD = 20000;
export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10;
/** A product with stock at or below this shows a "only N left" warning. */
export const LOW_STOCK_THRESHOLD = 5;

export function clampQuantity(value: number, stock: number): number {
  const ceiling = Math.min(MAX_QUANTITY, stock > 0 ? stock : MAX_QUANTITY);
  if (!Number.isFinite(value)) return MIN_QUANTITY;
  return Math.min(Math.max(Math.round(value), MIN_QUANTITY), ceiling);
}

export function calculateOrderSummary(
  unitPrice: number,
  quantity: number,
  currency: string = DEFAULT_CURRENCY,
): ProductOrderSummary {
  const subtotal = unitPrice * quantity;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  return {
    unitPrice,
    quantity,
    subtotal,
    shipping,
    total: subtotal + shipping,
    currency,
  };
}

/** Percentage off, rounded. 0 when there is no discount to show. */
export function discountPercent(product: Product): number {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
    return 0;
  }
  return Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
  );
}

/**
 * Inline SVG stand-in so the catalogue renders without any external image host.
 * Real photos go in `Product.image` as a normal URL — the admin form takes one.
 */
export function productPlaceholder(emoji: string, tint: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="${tint}"/><stop offset="100%" stop-color="#ffffff"/>` +
    `</linearGradient></defs>` +
    `<rect width="600" height="600" fill="url(#g)"/>` +
    `<text x="300" y="300" font-size="240" text-anchor="middle" dominant-baseline="central">${emoji}</text>` +
    `</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * TODO: replace with `GET /products` so the catalogue can change without a
 * deploy. The shape is already API friendly — see PAYMENT_API.md.
 */
export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "wooden-rainbow-stacker",
    name: "Wooden Rainbow Stacker",
    description:
      "Seven sanded beechwood arches in soft water-based colours. Stack them, build tunnels, or use them as a bridge for toy cars — open-ended play that grows with your child.",
    price: 8900,
    compareAtPrice: 11900,
    currency: DEFAULT_CURRENCY,
    category: "toys",
    image: productPlaceholder("🌈", "#ffd9bf"),
    stock: 24,
    rating: 4.8,
    reviewsCount: 132,
    ageRange: "1–5 years",
    active: true,
  },
  {
    id: 2,
    slug: "teddy-bear-miko",
    name: 'Soft Teddy Bear "Miko"',
    description:
      "A 38 cm hypoallergenic plush bear with embroidered eyes — no small parts, safe from day one. Machine washable at 30°C.",
    price: 6500,
    currency: DEFAULT_CURRENCY,
    category: "toys",
    image: productPlaceholder("🧸", "#ffe0cc"),
    stock: 41,
    rating: 4.9,
    reviewsCount: 208,
    ageRange: "0+ years",
    active: true,
  },
  {
    id: 3,
    slug: "first-story-books-set",
    name: "My First Story Books (Set of 5)",
    description:
      "Five thick board books with rounded corners and one short bedtime story each. Printed on FSC paper with non-toxic ink.",
    price: 12500,
    compareAtPrice: 15000,
    currency: DEFAULT_CURRENCY,
    category: "books",
    image: productPlaceholder("📚", "#cfe4ef"),
    stock: 17,
    rating: 4.7,
    reviewsCount: 94,
    ageRange: "1–4 years",
    active: true,
  },
  {
    id: 4,
    slug: "organic-cotton-bodysuit",
    name: "Organic Cotton Bodysuit (3-pack)",
    description:
      "GOTS-certified cotton bodysuits with envelope shoulders and nickel-free snaps. Comes in three neutral colours.",
    price: 4500,
    currency: DEFAULT_CURRENCY,
    category: "clothing",
    image: productPlaceholder("👕", "#e2ecd8"),
    stock: 63,
    rating: 4.6,
    reviewsCount: 76,
    ageRange: "0–18 months",
    active: true,
  },
  {
    id: 5,
    slug: "baby-bath-care-kit",
    name: "Baby Bath & Care Kit",
    description:
      "Tear-free shampoo, body wash, moisturising lotion and a soft bamboo washcloth — fragrance-free and dermatologically tested.",
    price: 9800,
    currency: DEFAULT_CURRENCY,
    category: "care",
    image: productPlaceholder("🍼", "#dff0f6"),
    stock: 3,
    rating: 4.5,
    reviewsCount: 51,
    ageRange: "0+ years",
    active: true,
  },
  {
    id: 6,
    slug: "convertible-stroller-pro",
    name: "Convertible Stroller Pro",
    description:
      "Lie-flat carrycot that converts to a toddler seat, one-hand fold, and an aluminium frame under 8 kg. Includes rain cover and cup holder.",
    price: 145000,
    compareAtPrice: 169000,
    currency: DEFAULT_CURRENCY,
    category: "gear",
    image: productPlaceholder("🚼", "#d7e3f0"),
    stock: 6,
    rating: 4.8,
    reviewsCount: 38,
    ageRange: "0–3 years",
    active: true,
  },
  {
    id: 7,
    slug: "alphabet-learning-tablet",
    name: "Alphabet Learning Tablet",
    description:
      "Trilingual talking tablet — Armenian, Russian and English letters, numbers and songs, with a volume limiter and auto sleep.",
    price: 18900,
    currency: DEFAULT_CURRENCY,
    category: "learning",
    image: productPlaceholder("🔤", "#e6ddf3"),
    stock: 29,
    rating: 4.4,
    reviewsCount: 63,
    ageRange: "2–6 years",
    active: true,
  },
  {
    id: 8,
    slug: "night-light-projector",
    name: "Star Night Light Projector",
    description:
      "Projects a slow-turning starry sky in three brightness levels, with a 30/60 minute timer and warm amber mode for night feeds.",
    price: 7900,
    currency: DEFAULT_CURRENCY,
    category: "care",
    image: productPlaceholder("🌙", "#dcd9f2"),
    stock: 22,
    rating: 4.6,
    reviewsCount: 87,
    ageRange: "0+ years",
    active: true,
  },
  {
    id: 9,
    slug: "building-blocks-120",
    name: "Building Blocks — 120 pieces",
    description:
      "120 chunky blocks in eight shapes, compatible with the big-brick systems you already own. Ships in a reusable storage tub.",
    price: 11500,
    currency: DEFAULT_CURRENCY,
    category: "toys",
    image: productPlaceholder("🧱", "#ffe2d6"),
    stock: 0,
    rating: 4.7,
    reviewsCount: 145,
    ageRange: "2–7 years",
    active: true,
  },
  {
    id: 10,
    slug: "kids-art-studio-set",
    name: "Kids Art Studio Set",
    description:
      "Washable paints, chunky brushes, 24 crayons and a 40-sheet pad in a carry case. Everything is non-toxic and easy to wipe off.",
    price: 8200,
    compareAtPrice: 9900,
    currency: DEFAULT_CURRENCY,
    category: "learning",
    image: productPlaceholder("🎨", "#fde3ea"),
    stock: 35,
    rating: 4.5,
    reviewsCount: 58,
    ageRange: "3–9 years",
    active: true,
  },
  {
    id: 11,
    slug: "toddler-sneakers",
    name: "Toddler First-Step Sneakers",
    description:
      "Flexible non-slip sole with a wide toe box, breathable mesh upper and a single wide velcro strap little hands can manage alone.",
    price: 13500,
    currency: DEFAULT_CURRENCY,
    category: "clothing",
    image: productPlaceholder("👟", "#d9ece4"),
    stock: 18,
    rating: 4.3,
    reviewsCount: 42,
    ageRange: "1–3 years",
    active: true,
  },
  {
    id: 12,
    slug: "musical-xylophone",
    name: "Musical Wooden Xylophone",
    description:
      "Eight tuned metal keys on a solid wood frame with two child-safe mallets. A first real instrument, not a rattle.",
    price: 5400,
    currency: DEFAULT_CURRENCY,
    category: "toys",
    image: productPlaceholder("🎹", "#fff0c9"),
    stock: 12,
    rating: 4.6,
    reviewsCount: 71,
    ageRange: "1–6 years",
    active: true,
  },
];
