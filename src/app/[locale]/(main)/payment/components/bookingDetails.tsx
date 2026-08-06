"use client";

import { MAX_HOURS, MIN_HOURS } from "@/model/payment";
import { CalendarDays, Clock, Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  date: string;
  time: string;
  hours: number;
  minDate: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onHoursChange: (value: number) => void;
}

export default function BookingDetails({
  date,
  time,
  hours,
  minDate,
  onDateChange,
  onTimeChange,
  onHoursChange,
}: Props) {
  const t = useTranslations("Payment");

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent transition";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h2 className="text-xl font-bold text-[#2f3e4e] mb-6">
        {t("bookingDetails")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            htmlFor="date"
            className="flex items-center gap-2 text-sm font-semibold text-[#2f3e4e] mb-2"
          >
            <CalendarDays className="w-4 h-4 text-[#ff9a5a]" />
            {t("date")}
          </label>
          <input
            id="date"
            name="date"
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="flex items-center gap-2 text-sm font-semibold text-[#2f3e4e] mb-2"
          >
            <Clock className="w-4 h-4 text-[#ff9a5a]" />
            {t("time")}
          </label>
          <input
            id="time"
            name="time"
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <span className="block text-sm font-semibold text-[#2f3e4e] mb-2">
          {t("duration")}
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={t("decreaseHours")}
            disabled={hours <= MIN_HOURS}
            onClick={() => onHoursChange(hours - 1)}
            className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 text-[#2f3e4e] hover:border-[#ff9a5a] hover:text-[#ff9a5a] disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:text-[#2f3e4e] transition"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="min-w-[7rem] text-center text-lg font-semibold text-[#2f3e4e]">
            {hours} {t("hoursSuffix")}
          </span>

          <button
            type="button"
            aria-label={t("increaseHours")}
            disabled={hours >= MAX_HOURS}
            onClick={() => onHoursChange(hours + 1)}
            className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 text-[#2f3e4e] hover:border-[#ff9a5a] hover:text-[#ff9a5a] disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:text-[#2f3e4e] transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
