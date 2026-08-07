"use client";

import { getDoctorListPage } from "@/action/doctorApiAction";
import StarRating from "@/app/component/general/StarRating";
import { DoctorDetails } from "@/model/doctor";
import { Pagination as PaginationModel } from "@/model/general";
import { ExternalLink, RefreshCw } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Pagination,
  SearchBox,
  StatusPill,
  TableMessage,
} from "../components/adminTableParts";

function doctorName(doctor: DoctorDetails): string {
  return doctor.name || doctor.translations?.[0]?.name || doctor.user?.name || "—";
}

export default function AdminDoctorListPage() {
  const locale = useLocale();

  const [doctors, setDoctors] = useState<DoctorDetails[]>([]);
  const [pagination, setPagination] = useState<PaginationModel | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (targetPage: number) => {
    setLoading(true);
    setError("");

    try {
      const response = await getDoctorListPage(targetPage);
      if (!Array.isArray(response?.data)) {
        setError("The doctor list could not be loaded. Please try again.");
        setDoctors([]);
        return;
      }

      setDoctors(response.data);
      setPagination(response.pagination ?? null);
    } catch (err) {
      console.error("Error loading doctors:", err);
      setError("The doctor list could not be loaded. Please try again.");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(page);
  }, [load, page]);

  // Searching filters the page already fetched — the endpoint has no `q` yet.
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return doctors;

    return doctors.filter((doctor) =>
      [
        doctorName(doctor),
        doctor.email,
        doctor.phone,
        doctor.specialization,
        doctor.license_number,
        doctor.location?.city,
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(needle)),
    );
  }, [doctors, query]);

  const active = doctors.filter((doctor) => doctor.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2f3e4e]">Doctors</h1>
          <p className="text-sm text-gray-500 mt-1">
            {pagination?.total ?? doctors.length} registered · {active} active on
            this page
          </p>
        </div>

        <button
          type="button"
          onClick={() => load(page)}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-[#2f3e4e] text-sm font-semibold hover:bg-gray-50 disabled:opacity-60 transition self-start"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="Search name, email, phone, specialization, licence..."
      />

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {isLoading ? (
          <TableMessage>Loading doctors…</TableMessage>
        ) : error ? (
          <TableMessage tone="error">
            {error}
            <button
              type="button"
              onClick={() => load(page)}
              className="block mx-auto mt-4 bg-[#ff9a5a] hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
            >
              Try again
            </button>
          </TableMessage>
        ) : visible.length === 0 ? (
          <TableMessage>
            {query ? "No doctor matches your search." : "No doctors yet."}
          </TableMessage>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Doctor</th>
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">Specialization</th>
                    <th className="px-4 py-3 font-semibold">Experience</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                    <th className="px-4 py-3 font-semibold">Licence</th>
                    <th className="px-4 py-3 font-semibold">Rating</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Profile
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visible.map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar
                            src={doctor.image}
                            name={doctorName(doctor)}
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-[#2f3e4e] truncate">
                              {doctorName(doctor)}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              #{doctor.id}
                              {doctor.education ? ` · ${doctor.education}` : ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-[#2f3e4e] truncate max-w-56">
                          {doctor.email || "—"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {doctor.phone || "—"}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <p
                          className="text-gray-600 line-clamp-2 max-w-56"
                          title={doctor.specialization ?? undefined}
                        >
                          {doctor.specialization || "—"}
                        </p>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-[#2f3e4e]">
                        {doctor.experience_years != null
                          ? `${doctor.experience_years} yrs`
                          : "—"}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {doctor.location?.city || "—"}
                      </td>

                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {doctor.license_number || "—"}
                      </td>

                      <td className="px-4 py-3">
                        {doctor.reviews_count > 0 ? (
                          <StarRating
                            rating={doctor.average_rating}
                            reviewCount={doctor.reviews_count}
                            size="sm"
                          />
                        ) : (
                          <span className="text-gray-400">No reviews</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <StatusPill
                          label={doctor.status === "active" ? "Active" : "Inactive"}
                          tone={doctor.status === "active" ? "green" : "grey"}
                        />
                      </td>

                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/${locale}/services/doctor/${doctor.id}/profile`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 text-[#ff9a5a] font-semibold hover:underline whitespace-nowrap"
                        >
                          View
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!query && pagination && (
              <Pagination
                page={pagination.current_page}
                lastPage={pagination.last_page}
                total={pagination.total}
                onChange={setPage}
              />
            )}
          </>
        )}
      </div>

      {query && pagination && pagination.last_page > 1 && (
        <p className="text-xs text-gray-400">
          Search filters the current page only — clear it to move between pages.
        </p>
      )}
    </div>
  );
}
