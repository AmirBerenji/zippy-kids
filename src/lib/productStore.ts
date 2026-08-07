"use client";

import { DUMMY_PRODUCTS, Product, ProductInput } from "@/model/product";

/**
 * Browser-side stand-in for the products API.
 *
 * Everything the admin panel saves lands in localStorage so the shop, the
 * product page and the checkout all see the same catalogue during the demo.
 *
 * TODO: replace every function here with a call to the real endpoints
 * (`GET/POST/PUT/DELETE /products`) — the signatures already match, so the
 * pages that use them will not need to change.
 */

const STORAGE_KEY = "kidoohub.products.v1";
/** Pages listen for this to re-read the catalogue after an admin change. */
export const PRODUCTS_CHANGED_EVENT = "kidoohub:products-changed";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function read(): Product[] {
  if (!isBrowser()) return DUMMY_PRODUCTS;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      write(DUMMY_PRODUCTS);
      return DUMMY_PRODUCTS;
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Product[]) : DUMMY_PRODUCTS;
  } catch {
    // Corrupted or unreadable storage — fall back to the seed catalogue.
    return DUMMY_PRODUCTS;
  }
}

function write(products: Product[]): void {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event(PRODUCTS_CHANGED_EVENT));
  } catch {
    // Storage full or blocked (private mode) — the in-memory list still works.
  }
}

/** Everything in the catalogue, including products hidden from the shop. */
export function listAllProducts(): Product[] {
  return read();
}

/** What the shop shows: active products only. */
export function listProducts(): Product[] {
  return read().filter((product) => product.active);
}

export function getProduct(id: number): Product | undefined {
  return read().find((product) => product.id === id);
}

export function createProduct(input: ProductInput): Product {
  const products = read();
  const nextId = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const product: Product = { ...input, id: nextId };

  write([product, ...products]);
  return product;
}

export function updateProduct(
  id: number,
  input: ProductInput,
): Product | undefined {
  const products = read();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return undefined;

  const updated: Product = { ...input, id };
  const next = [...products];
  next[index] = updated;

  write(next);
  return updated;
}

export function deleteProduct(id: number): void {
  write(read().filter((product) => product.id !== id));
}

export function toggleProductActive(id: number): void {
  write(
    read().map((product) =>
      product.id === id ? { ...product, active: !product.active } : product,
    ),
  );
}

/** Throws away admin changes and restores the seed catalogue. */
export function resetProducts(): void {
  write(DUMMY_PRODUCTS);
}

/** Calls `handler` whenever the catalogue changes, in this tab or another one. */
export function subscribeProducts(handler: () => void): () => void {
  if (!isBrowser()) return () => {};

  window.addEventListener(PRODUCTS_CHANGED_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(PRODUCTS_CHANGED_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
