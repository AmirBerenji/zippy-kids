"use client";
import React, { useEffect, useState } from "react";
import { Phone, MapPin, Droplets, User, Calendar } from "lucide-react";
import { Child } from "@/model/child";
import { getchildByToken } from "@/action/parentApiAction";

interface ProfilePageProps {
  params: Promise<{ locale: string; childid: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [childId, setChildId] = useState<string>("");

  useEffect(() => {
    console.log("1. Component mounted, raw params:", params);

    async function loadParams() {
      try {
        const resolvedParams = await Promise.resolve(params);
        console.log("2. Resolved params object:", resolvedParams);
        console.log("3. Child ID:", resolvedParams.childid);

        if (resolvedParams.childid) {
          setChildId(resolvedParams.childid);
        } else {
          console.error("Could not find childid in params:", resolvedParams);
        }
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    }
    loadParams();
  }, [params]);

  useEffect(() => {
    console.log("4. childId state changed:", childId); // Debug log
    if (childId) {
      console.log("5. Fetching data for ID:", childId); // Debug log
      fetchChildData();
    } else {
      console.log("5. childId is empty, not fetching"); // Debug log
    }
  }, [childId]);

  const fetchChildData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Calling getchildByToken with:", childId); // Debug log
      const childInfo = await getchildByToken(childId);
      console.log("Received child data:", childInfo); // Debug log
      setChild(childInfo);
    } catch (err) {
      setError("Failed to load child data");
      console.error("Error fetching child data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-5 md:p-8 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading child data...</p>
            <p className="text-sm text-gray-400 mt-2">
              ID: {childId || "Loading..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-5 md:p-8 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl text-center">
          <p className="text-red-600 text-lg font-semibold">{error}</p>
          <p className="text-gray-500 mt-2">Child ID: {childId}</p>
          <button
            onClick={fetchChildData}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!child) {
    return (
      <div className="min-h-screen bg-gray-100 p-5 md:p-8 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl text-center">
          <p className="text-gray-600 text-lg">
            No child data found for ID: {childId}
          </p>
        </div>
      </div>
    );
  }

  // Calculate age from birthday
  const calculateAge = (birthday: any) => {
    if (!birthday) return "N/A";
    try {
      // Handle different date formats
      const birthDate = new Date(birthday);

      // Check if date is valid
      if (isNaN(birthDate.getTime())) {
        console.log("Invalid date format:", birthday);
        return "N/A";
      }

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Adjust age if birthday hasn't occurred this year yet
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      console.log("Birthday:", birthday, "Calculated age:", age);
      return age;
    } catch (error) {
      console.error("Error calculating age:", error);
      return "N/A";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 md:p-8 flex justify-center items-start">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl">
        {/* Header Section */}
        <div className="bg-[#ff9a5a] p-6 text-[#2f3e4e] flex flex-col items-center md:flex-row md:space-x-6">
          <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center border-4 border-slate-700 mb-4 md:mb-0">
            {child.image ? (
              <img
                src={
                  "https://zippy.elrincondsabor.com/storage/app/public/" +
                  child.image
                }
                alt="Child"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User size={48} className="text-white" />
            )}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">
              {child.name} {child.last_name}
            </h1>
            <p className="text-sm opacity-80 mt-1">ID: {childId}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Personal Info */}
          <div className="space-y-4">
            <div></div>

            <div className="flex items-start space-x-3">
              <Calendar className="text-[#ff9a5a] mt-1" size={20} />
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Age
                </label>
                <p className="text-lg font-medium text-gray-700">
                  {calculateAge(child.birthday)} Years
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <User className="text-[#ff9a5a] mt-1" size={20} />
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Parent name
                </label>
                <p className="text-lg font-medium text-gray-700">
                  {child.user.name}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Vitals & Contact */}
          <div className="space-y-4">
            {child.user.phone && (
              <div className="flex items-start space-x-3">
                <Phone className="text-[#ff9a5a]" size={20} />
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Phone
                  </label>
                  <p className="text-lg font-medium text-gray-700 cursor-pointer hover:underline">
                    {child.user.phone}
                  </p>
                  <div className="text-[#ff9a5a] text-xs -mt-1">
                    Click the number to call the parent.
                  </div>
                </div>
              </div>
            )}

            {child.address && (
              <div className="flex items-start space-x-3">
                <MapPin className="text-[#ff9a5a] mt-1" size={20} />
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Address
                  </label>
                  <p className="text-lg font-medium text-gray-700 leading-relaxed">
                    {child.address}
                  </p>
                </div>
              </div>
            )}

            {child.blood_type && (
              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="text-[#ff9a5a]" size={24} />
                  <span className="font-bold text-[#ff9a5a]">Blood type</span>
                </div>
                <span className="text-lg font-black text-[#ff9a5a]">
                  {child.blood_type}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
