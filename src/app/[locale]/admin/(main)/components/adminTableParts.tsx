"use client";

import { AlertTriangle, ChevronLeft, ChevronRight, Search } from "lucide-react";
import React from "react";

/** Where the Laravel app serves uploaded photos from. */
export const STORAGE_BASE = "https://zippy.elrincondsabor.com/storage";

export function storageUrl(path?: string | null): string {
  if (!path) return "";
  return /^https?:\/\//.test(path) ? path : `${STORAGE_BASE}/${path}`;
}

/** "Karine Malkhasyan" -> "KM" */
function initials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] ?? "")
      .join("")
      .toUpperCase() || "?"
  );
}

export function Avatar({
  src,
  name,
  size = 40,
}: {
  src?: string | null;
  name: string;
  size?: number;
}) {
  const [failed, setFailed] = React.useState(false);
  const url = storageUrl(src);

  if (!url || failed) {
    return (
      <span
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full bg-[#ffe0cc] text-[#ff9a5a] font-bold text-xs flex items-center justify-center"
      >
        {initials(name)}
      </span>
    );
  }

  return (
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full object-cover object-top bg-[#f4f7f9]"
    />
  );
}

export function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: "green" | "grey" | "orange";
}) {
  const tones = {
    green: "bg-green-50 text-green-700",
    grey: "bg-gray-100 text-gray-500",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative w-full sm:w-80">
      <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent transition"
      />
    </div>
  );
}

export function TableMessage({
  children,
  tone = "plain",
}: {
  children: React.ReactNode;
  tone?: "plain" | "error";
}) {
  return (
    <div className="p-12 text-center">
      {tone === "error" && (
        <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-3" />
      )}
      <div
        className={
          tone === "error"
            ? "text-orange-700 font-semibold"
            : "text-gray-500 font-medium"
        }
      >
        {children}
      </div>
    </div>
  );
}

export function Pagination({
  page,
  lastPage,
  total,
  onChange,
}: {
  page: number;
  lastPage: number;
  total: number;
  onChange: (page: number) => void;
}) {
  if (lastPage <= 1) return null;

  const buttonClass =
    "inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-[#2f3e4e] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition";

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-gray-100">
      <p className="text-sm text-gray-500">
        Page {page} of {lastPage} · {total} total
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className={buttonClass}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page >= lastPage}
          className={buttonClass}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
