"use client";
import { getLanguages, getLocation } from "@/action/nurseApiAction";
import { Profile } from "@/model/auth";
import { Languages } from "@/model/language";
import React, { useEffect, useState } from "react";
import { Location } from "@/model/location";

interface Props {
  userInfo: Profile;
}

export default function NurseProfile(prop: Props) {
  const [listLocation, setLocation] = useState<Location[]>([]);
  const [listLanguages, setLanguages] = useState<Languages[]>([]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const locationns = await getLocation();
      setLocation(locationns || []);
      const languages = await getLanguages();
      setLanguages(languages || []);
    } catch (error) {
      console.error("Error loading pets:", error);
    }
  };
  return (
    <>
      <div className="bg-white p-5  rounded-2xl shadow-xl  ">
        <div className="grid grid-cols-1 php  ">
          <div></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-5  ">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="language"
              name="language"
            >
              <option value="">Select a Languages</option>
              {listLanguages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>

            <input
              autoComplete="fullname"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="fullname"
              name="fullename"
              placeholder="Full Name"
              type="text"
            />

            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="gender"
              name="gender"
            >
              <option value="">Select a gender</option>
              <option value="Female"> Female </option>
              <option value="Male"> Male </option>
              <option value="Other"> Other </option>
            </select>

            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="location"
              name="location"
            >
              <option value="">Select a location</option>
              {listLocation.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.city}
                </option>
              ))}
            </select>

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="yearsExperience"
              name="yearsExperience"
              placeholder="Years Experience"
              type="text"
            />
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="dayavailable"
              name="dayavailable"
              placeholder="Day Available"
              type="text"
            />
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="commitment_type"
              name="commitment_type"
              placeholder="commitment type"
              type="text"
            />

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="hourly_rate"
              name="hourly_rate"
              placeholder="hourly_rate"
              type="text"
            />
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="booking_type"
              name="booking_type"
              placeholder="booking_type"
              type="text"
            />

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="photo"
              name="photo"
              placeholder="photo"
              type="text"
            />

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
              id="fixed_package_description"
              name="fixed_package_description"
              placeholder="fixed_package_description"
              type="text"
            />
          </div>
        </div>
      </div>
    </>
  );
}
