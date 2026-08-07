# Payment, Subscription & Shop — Frontend Status and API Requirements

This document describes the payment, subscription and shop UI already built in the
Next.js app and the backend endpoints needed to make it work. Every endpoint below
includes a `curl` example that can be used as the contract.

**Frontend status:** all pages are complete and building. No network call is made
yet — each submit handler stops at a clearly marked `TODO` block and logs its
payload. Wiring is a small change on our side once these endpoints exist.

---

## 1. What is already built

| Page | Route | Purpose |
|---|---|---|
| Booking checkout | `/{locale}/payment` | Pay a nurse or doctor for a booking (date, time, hours) |
| Subscription plans | `/{locale}/subscription` | Pick a plan and a billing cycle |
| Subscription card entry | `/{locale}/subscription/checkout` | Enter card details and pay for the plan |
| Shop | `/{locale}/shop` | Product catalogue with search, category filter and sorting |
| Product page | `/{locale}/shop/{id}` | One product, quantity picker, "Buy now" |
| Shop checkout | `/{locale}/payment?type=product` | Delivery details and payment for a product order |

`{locale}` is one of `en`, `hy`, `ru`. All three pages are fully translated.

### File map

```
src/model/payment.ts                       booking + card types, fee calculation
src/model/subscription.ts                  plan catalogue, cycle math, request types
src/model/product.ts                       product types, dummy catalogue, order math
src/lib/card.ts                            card formatting, brand detection, Luhn, expiry
src/lib/productStore.ts                    browser stand-in for the products API

src/app/[locale]/(main)/payment/
  page.tsx                                 booking from the URL, or a product order
  components/paymentClient.tsx             booking state owner + submit seam <-- API goes here
  components/productOrderClient.tsx        product state owner + submit seam <-- API goes here
  components/bookingDetails.tsx            date / time / hours
  components/payerDetails.tsx              name / email / phone / note
  components/shippingDetails.tsx           name / email / phone / address / city / note
  components/paymentMethods.tsx            card / idram / cash
  components/orderSummary.tsx              booking totals
  components/productSummary.tsx            product order totals

src/app/[locale]/(main)/shop/
  page.tsx
  components/shopClient.tsx                search, category filter, sorting
  components/productCard.tsx               one product tile
  [id]/components/productDetailClient.tsx  quantity picker -> routes to checkout

src/app/[locale]/admin/(main)/product/
  page.tsx                                 catalogue table: edit, hide, delete
  addProduct/page.tsx                      add form
  [id]/page.tsx                            edit form
  components/productForm.tsx               shared form + live card preview <-- API goes here

src/app/[locale]/(main)/subscription/
  page.tsx
  components/subscriptionClient.tsx        plan selection -> routes to checkout
  components/billingToggle.tsx             monthly / yearly
  components/planCard.tsx                  one plan tier
  components/includedInAll.tsx             trust strip
  checkout/
    page.tsx                               resolves plan + cycle from the URL
    components/checkoutClient.tsx          state owner + submit seam        <-- API goes here
    components/cardForm.tsx                card number / holder / expiry / CVC
    components/planSummary.tsx             totals

messages/en.json, hy.json, ru.json         "Payment", "Subscription" and "Shop" sections
```

---

## 2. Conventions

These follow what `src/api/agent.ts` already does for every other feature.

- **Base URL:** `https://zippy.elrincondsabor.com/api/`
- **Auth:** `Authorization: Bearer <jwt>` — the token from the `jwt` cookie.
  All endpoints below require it unless marked public.
- **Headers:** `Accept: application/json`, `Content-Type: application/json`
- **Success envelope** — same as the existing endpoints, the frontend reads `.data`:

```json
{ "success": true, "data": { } }
```

- **Error envelope** — HTTP 4xx/5xx with:

```json
{ "success": false, "message": "Human readable reason", "errors": { "field": ["detail"] } }
```

- **Money:** integer **AMD (drams)**, no decimals, no minor units. `4900` means 4,900 AMD.
- **Dates:** `YYYY-MM-DD`. **Times:** `HH:mm` (24h). **Timestamps:** ISO 8601 UTC.

---

## 3. Booking payments

Used by `/{locale}/payment`.

### 3.1 Create a booking payment

`POST /payments`

The frontend sends `amount` for display cross-checking only. **The server must
recompute the amount from the provider's stored hourly rate and reject or correct
a mismatch** — the current page can read the rate from the query string, so the
client-sent amount is not trustworthy.

Fee rule the UI currently shows: `service_fee = round(hourly_rate * hours * 0.05)`.
Confirm the real rule and we will match it.

| Field | Type | Notes |
|---|---|---|
| `provider_type` | `"nurse" \| "doctor"` | |
| `provider_id` | integer | |
| `date` | `YYYY-MM-DD` | |
| `time` | `HH:mm` | start time |
| `hours` | integer | 1–12 |
| `method` | `"card" \| "idram" \| "cash"` | |
| `full_name` | string | payer |
| `email` | string | |
| `phone` | string | |
| `note` | string | may be empty |
| `amount` | integer | client-computed total, for verification |
| `currency` | string | `AMD` |

```bash
curl -X POST 'https://zippy.elrincondsabor.com/api/payments' \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "provider_type": "nurse",
    "provider_id": 12,
    "date": "2026-08-20",
    "time": "10:00",
    "hours": 3,
    "method": "card",
    "full_name": "Anna Sargsyan",
    "email": "anna@example.com",
    "phone": "+374 91 234567",
    "note": "Please ring the top bell",
    "amount": 12600,
    "currency": "AMD"
  }'
```

Expected response — `redirect_url` is required for `card` and `idram`, and must be
absent for `cash`:

```json
{
  "success": true,
  "data": {
    "order_id": "PAY-2026-000123",
    "status": "pending",
    "redirect_url": "https://ipay.arca.am/payment/start/abc123",
    "amount": 12600,
    "currency": "AMD"
  }
}
```

For `"method": "cash"`:

```json
{
  "success": true,
  "data": { "order_id": "PAY-2026-000124", "status": "pending", "amount": 12600, "currency": "AMD" }
}
```

### 3.2 Verify a payment after the gateway redirect

`POST /payments/{order_id}/verify`

Called on the result page when the bank sends the user back. Must be safe to call
more than once and must return the authoritative status — never trust the query
string the gateway appends.

```bash
curl -X POST 'https://zippy.elrincondsabor.com/api/payments/PAY-2026-000123/verify' \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

```json
{
  "success": true,
  "data": {
    "order_id": "PAY-2026-000123",
    "status": "paid",
    "amount": 12600,
    "currency": "AMD",
    "paid_at": "2026-08-06T09:31:22Z",
    "provider_name": "Anna Sargsyan",
    "card_last_four": "1111"
  }
}
```

### 3.3 Read one payment

`GET /payments/{order_id}` — same `data` shape as 3.2.

```bash
curl 'https://zippy.elrincondsabor.com/api/payments/PAY-2026-000123' \
  -H 'Authorization: Bearer <JWT>' -H 'Accept: application/json'
```

### 3.4 Payment history

`GET /payments?page=1` — for a billing tab in the user profile later. Paginated
with the same `pagination` block the other list endpoints already return.

```bash
curl 'https://zippy.elrincondsabor.com/api/payments?page=1' \
  -H 'Authorization: Bearer <JWT>' -H 'Accept: application/json'
```

```json
{
  "success": true,
  "data": [
    { "order_id": "PAY-2026-000123", "status": "paid", "amount": 12600, "currency": "AMD",
      "provider_name": "Anna Sargsyan", "date": "2026-08-20", "created_at": "2026-08-06T09:30:00Z" }
  ],
  "pagination": { "total": 1, "per_page": 15, "current_page": 1, "last_page": 1 }
}
```

---

## 4. Subscriptions

Used by `/{locale}/subscription` and `/{locale}/subscription/checkout`.

### 4.1 Plan catalogue

`GET /subscription-plans` — **public, no auth.**

The three tiers are currently hardcoded in `src/model/subscription.ts` as
placeholders. Once this endpoint exists, pricing changes without a deploy.

Current placeholder values:

| key | monthly | yearly | notes |
|---|---|---|---|
| `starter` | 0 | 0 | free, never reaches the card page |
| `family` | 4900 | 49000 | highlighted as "most popular" |
| `premium` | 9900 | 99000 | |

Yearly is 10 monthly payments (2 months free). Confirm whether that rule stays.

```bash
curl 'https://zippy.elrincondsabor.com/api/subscription-plans' \
  -H 'Accept: application/json'
```

```json
{
  "success": true,
  "data": [
    { "key": "starter", "monthly_price": 0,    "yearly_price": 0,     "currency": "AMD", "highlighted": false },
    { "key": "family",  "monthly_price": 4900, "yearly_price": 49000, "currency": "AMD", "highlighted": true  },
    { "key": "premium", "monthly_price": 9900, "yearly_price": 99000, "currency": "AMD", "highlighted": false }
  ]
}
```

Plan names and feature bullets stay in our translation files, keyed by `key`, so
they can be localised. If you would rather serve those too, tell us and we will
read them from here instead.

### 4.2 Create a subscription

`POST /subscriptions`

**The card number never reaches this endpoint.** The browser tokenizes the card
with the gateway first and sends only the token. See section 6.

| Field | Type | Notes |
|---|---|---|
| `plan` | `"family" \| "premium"` | free tier never posts here |
| `cycle` | `"monthly" \| "yearly"` | |
| `amount` | integer | client-computed, verify server side |
| `currency` | string | `AMD` |
| `card_token` | string | single-use token from the gateway |
| `card_last_four` | string | display only |
| `card_holder` | string | display only |

```bash
curl -X POST 'https://zippy.elrincondsabor.com/api/subscriptions' \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: 8f14e45f-ea0b-4f2a-9c31-2f0d1a7b5c33' \
  -d '{
    "plan": "family",
    "cycle": "yearly",
    "amount": 49000,
    "currency": "AMD",
    "card_token": "tok_1PabcXyz",
    "card_last_four": "1111",
    "card_holder": "ANNA SARGSYAN"
  }'
```

Charge succeeded outright:

```json
{
  "success": true,
  "data": {
    "subscription_id": "SUB-2026-000045",
    "status": "active",
    "plan": "family",
    "cycle": "yearly",
    "amount": 49000,
    "currency": "AMD",
    "current_period_end": "2027-08-06"
  }
}
```

3-D Secure needed — we redirect the browser to `redirect_url`:

```json
{
  "success": true,
  "data": {
    "subscription_id": "SUB-2026-000045",
    "status": "pending",
    "redirect_url": "https://acs.bank.am/3ds/challenge/xyz"
  }
}
```

Declined:

```json
{ "success": false, "message": "Your card was declined by the issuer." }
```

### 4.3 Verify after 3-D Secure

`POST /subscriptions/{subscription_id}/verify` — same role as 3.2, returns the
authoritative status.

```bash
curl -X POST 'https://zippy.elrincondsabor.com/api/subscriptions/SUB-2026-000045/verify' \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Accept: application/json' -H 'Content-Type: application/json' -d '{}'
```

### 4.4 Current subscription

`GET /subscriptions/current` — drives the profile billing tab and any
"you are on Family" state on the plans page. Returns `data: null` when the user
has no paid plan.

```bash
curl 'https://zippy.elrincondsabor.com/api/subscriptions/current' \
  -H 'Authorization: Bearer <JWT>' -H 'Accept: application/json'
```

```json
{
  "success": true,
  "data": {
    "subscription_id": "SUB-2026-000045",
    "plan": "family",
    "cycle": "yearly",
    "status": "active",
    "current_period_end": "2027-08-06",
    "cancel_at_period_end": false,
    "card_last_four": "1111"
  }
}
```

### 4.5 Cancel

`POST /subscriptions/{subscription_id}/cancel`

The UI promises "cancel any time", so this must keep access until the period ends
rather than cutting it off immediately.

```bash
curl -X POST 'https://zippy.elrincondsabor.com/api/subscriptions/SUB-2026-000045/cancel' \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Accept: application/json' -H 'Content-Type: application/json' -d '{}'
```

```json
{
  "success": true,
  "data": { "subscription_id": "SUB-2026-000045", "status": "active", "cancel_at_period_end": true,
            "current_period_end": "2027-08-06" }
}
```

---

## 5. Shop — products and orders

Used by `/{locale}/shop`, `/{locale}/shop/{id}`, `/{locale}/payment?type=product`
and the admin screens under `/{locale}/admin/product`.

The catalogue is currently the dummy array in `src/model/product.ts`, held in the
browser by `src/lib/productStore.ts`. Swapping that file for these endpoints is
the only change needed on our side.

### 5.1 Product catalogue

`GET /products` — **public, no auth.** Optional `?category=`, `?q=`, `?page=`.

| Field | Type | Notes |
|---|---|---|
| `id` | integer | |
| `slug` | string | |
| `name` | string | |
| `description` | string | |
| `price` | integer | AMD |
| `compare_at_price` | integer \| null | old price, shown struck through |
| `currency` | string | `AMD` |
| `category` | `toys \| books \| clothing \| care \| gear \| learning` | |
| `image` | string | absolute URL |
| `stock` | integer | 0 means sold out |
| `rating` | number | 0–5 |
| `reviews_count` | integer | |
| `age_range` | string | free text, e.g. `1–5 years` |
| `active` | boolean | hidden from the shop when false |

```bash
curl 'https://zippy.elrincondsabor.com/api/products?category=toys' \
  -H 'Accept: application/json'
```

```json
{
  "success": true,
  "data": [
    { "id": 1, "slug": "wooden-rainbow-stacker", "name": "Wooden Rainbow Stacker",
      "description": "Seven sanded beechwood arches...", "price": 8900,
      "compare_at_price": 11900, "currency": "AMD", "category": "toys",
      "image": "https://cdn.kidoohub.com/products/1.jpg", "stock": 24,
      "rating": 4.8, "reviews_count": 132, "age_range": "1–5 years", "active": true }
  ],
  "pagination": { "total": 12, "per_page": 15, "current_page": 1, "last_page": 1 }
}
```

`GET /products/{id}` — **public**, one product, same `data` shape.

### 5.2 Create a product order

`POST /product-orders`

Same rules as 3.1: **the server must recompute the amount from the stored product
price and the stock**, and reject the order if the product is inactive or out of
stock. The client-sent `amount` is for cross-checking only.

Delivery rule the UI currently shows: `shipping = subtotal >= 20000 ? 0 : 1500`.
Confirm the real rule and we will match it.

| Field | Type | Notes |
|---|---|---|
| `product_id` | integer | |
| `quantity` | integer | 1–10, capped at the product's stock |
| `method` | `"card" \| "idram" \| "cash"` | `cash` = cash on delivery |
| `full_name` | string | |
| `email` | string | |
| `phone` | string | |
| `address` | string | |
| `city` | string | |
| `note` | string | may be empty |
| `amount` | integer | client-computed total incl. delivery, for verification |
| `currency` | string | `AMD` |

```bash
curl -X POST 'https://zippy.elrincondsabor.com/api/product-orders' \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: 3d1f0c22-9b4e-4a71-8f10-6c2b7d9e4a55' \
  -d '{
    "product_id": 1,
    "quantity": 2,
    "method": "card",
    "full_name": "Anna Sargsyan",
    "email": "anna@example.com",
    "phone": "+374 91 234567",
    "address": "Abovyan 12, apt 4",
    "city": "Yerevan",
    "note": "Call before arriving",
    "amount": 17800,
    "currency": "AMD"
  }'
```

```json
{
  "success": true,
  "data": {
    "order_id": "ORD-2026-000077",
    "status": "pending",
    "redirect_url": "https://ipay.arca.am/payment/start/def456",
    "amount": 17800,
    "currency": "AMD"
  }
}
```

`redirect_url` is required for `card` and `idram` and must be absent for `cash`,
exactly as in 3.1. Verification reuses the same shape:
`POST /product-orders/{order_id}/verify` and `GET /product-orders/{order_id}`.

### 5.3 Admin product management

Admin-only, behind whatever role check the other admin endpoints use.

```bash
# create
curl -X POST 'https://zippy.elrincondsabor.com/api/products' \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Accept: application/json' -H 'Content-Type: application/json' \
  -d '{
    "name": "Wooden Rainbow Stacker",
    "slug": "wooden-rainbow-stacker",
    "description": "Seven sanded beechwood arches...",
    "price": 8900,
    "compare_at_price": 11900,
    "currency": "AMD",
    "category": "toys",
    "image": "https://cdn.kidoohub.com/products/1.jpg",
    "stock": 24,
    "age_range": "1–5 years",
    "active": true
  }'

# update / delete
curl -X PUT    'https://zippy.elrincondsabor.com/api/products/1' -H 'Authorization: Bearer <JWT>' ...
curl -X DELETE 'https://zippy.elrincondsabor.com/api/products/1' -H 'Authorization: Bearer <JWT>'
```

`rating` and `reviews_count` are computed by the backend from real reviews — the
admin form does not send them.

**Image upload:** the admin form currently takes an image URL, or generates a
coloured tile when it is left empty. If you would rather have a real upload,
give us a `POST /products/{id}/image` multipart endpoint and we will swap the
URL field for a file picker.

---

## 6. Card handling — please read

The card entry page collects the number, holder, expiry and CVC in our own form.
That is what was asked for, and the form validates properly (Luhn, brand
detection, expiry not in the past, Amex 4-digit CVC).

**The raw card number must not be posted to our own API.** If it is, the Laravel
server enters PCI-DSS scope and needs a full SAQ-D assessment. The intended flow:

1. Browser sends the card straight to the gateway's tokenization endpoint.
2. Gateway returns a single-use token.
3. Browser posts only `card_token` to `POST /subscriptions`.
4. Backend charges with the token and stores the token/customer reference — never the PAN.

What we need from you to finish step 1:

- Which gateway: **ArCa / AmeriaBank, Idram, or Stripe**?
- The **publishable/public key** for the browser, and the tokenization endpoint or SDK.
- Whether recurring billing is handled by the gateway (saved card / recurring token)
  or by a backend scheduler charging a stored token.

If the chosen gateway has no browser tokenization and requires a full redirect
instead, say so — we will drop the card form and redirect from the plan page
directly, which is simpler and safer. The card page stays in the repo either way.

---

## 7. Status values

| Context | Values |
|---|---|
| Booking payment | `pending`, `paid`, `failed`, `refunded`, `cancelled` |
| Product order | `pending`, `paid`, `shipped`, `delivered`, `failed`, `refunded`, `cancelled` |
| Subscription | `pending`, `active`, `past_due`, `cancelled`, `failed` |

Please use exactly these strings. Anything unknown renders as a generic error.

---

## 8. Also needed on the backend (no UI involved)

- **Gateway webhook** — e.g. `POST /webhooks/payments`, public but signature-verified.
  This is what actually flips a payment to `paid` / a subscription to `active`.
  Browser redirects can be lost (user closes the tab), so the webhook must be the
  source of truth, and `/verify` should just read the result.
- **Idempotency** — honour the `Idempotency-Key` header on all three create endpoints
  so a double-click or a retry cannot charge twice.
- **Server-side amount authority** — recompute every amount from stored prices.
- **Stock** — decrement on a paid product order and refuse an order that would take
  stock below zero, even if the page showed the item as available.
- **Recurring renewals** — a scheduled job that charges the stored token and updates
  `current_period_end`.

---

## 9. Questions for the backend

1. Which gateway, and is it redirect-based or token-based?
2. What is the real service fee for bookings? The UI shows 5% as a placeholder.
3. Are the plan prices in section 4.1 correct?
4. Does `cash` booking skip payment entirely and just create a booking record?
5. Should a booking record be created before payment, or by the payment endpoint itself?
6. Do subscriptions apply to parent accounts only, or to providers too?
7. What is the real delivery fee and free-delivery threshold? The UI shows 1,500 AMD
   and free over 20,000 AMD as placeholders.
8. Can a guest order a product, or must they be logged in? The shop checkout does
   not require an account today.
9. Do product orders need a cart (several products in one order), or is one product
   per order enough? The UI is single-product today.

---

## 10. What we do once the endpoints exist

1. Add a `PaymentApi` group to `src/api/agent.ts`.
2. Add `src/action/paymentApiAction.ts` with `"use server"` wrappers.
3. Replace the `TODO` block in `components/paymentClient.tsx` (booking).
4. Replace the `TODO` block in `checkout/components/checkoutClient.tsx` (subscription).
5. Replace the `TODO` block in `components/productOrderClient.tsx` (product order).
6. Build `/{locale}/payment/result` for the gateway callback.
7. Load plans from `GET /subscription-plans` instead of the hardcoded array.
8. Point `src/lib/productStore.ts` at `/products` instead of localStorage — the
   shop, the product page and the admin screens all go through it, so nothing
   else has to change.

Steps 3, 4 and 5 are roughly five lines each — the payloads are already built and typed.
