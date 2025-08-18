"use client";
import { getLanguages, getLocation } from "@/action/nurseApiAction";
import { Profile } from "@/model/auth";
import { Languages } from "@/model/language";
import React, { useEffect, useState } from "react";
import { Location } from "@/model/location";
import { ShieldAlert } from "lucide-react";

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
      <div className="bg-white  text-xs ">
        <div className="grid grid-cols-1 php  ">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-5  ">
            <div className="w-full col-span-3">
              <label className="block text-gray-700 font-medium ">
                Select languages you can speak
              </label>
              <span className="text-[#fdb68a] text-xs inline-flex items-center mb-3">
                <ShieldAlert size={16} className="mr-1" />
                base on your language selected we show your information in nurse
                list
              </span>

              <div className="space-y-5">
                {listLanguages.map((lang) => (
                  <label
                    key={lang.id}
                    className="items-center space-x-1 cursor-pointer hover:bg-gray-50 p-4 transition"
                  >
                    <input
                      type="checkbox"
                      name="language"
                      value={lang.id}
                      className="w-4 h-4 text-[#fdb68a] border-gray-300 rounded focus:ring-[#fdb68a] focus:ring-2 "
                      onChange={(e) => {
                        // Handle checkbox change
                        const value = e.target.value;
                        const isChecked = e.target.checked;

                        // Add your logic here to manage selected languages
                        // For example, updating state in parent component:
                        // handleLanguageChange(value, isChecked);
                      }}
                    />
                    <span className="text-gray-700 select-none">
                      {lang.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <input
              autoComplete="fullname"
               className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
              id="fullname"
              name="fullename"
              placeholder="Full Name"
              type="text"
            />

            <select
              className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
              id="gender"
              name="gender"
            >
              <option value="">Select a gender</option>
              <option value="Female"> Female </option>
              <option value="Male"> Male </option>
              <option value="Other"> Other </option>
            </select>

            <select
               className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
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
              className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
              id="yearsExperience"
              name="yearsExperience"
              placeholder="Years Experience"
              type="text"
            />
            <input
               className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
              id="dayavailable"
              name="dayavailable"
              placeholder="Day Available"
              type="text"
            />
            <input
              className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
              id="commitment_type"
              name="commitment_type"
              placeholder="commitment type"
              type="text"
            />

            <input
              className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
              id="hourly_rate"
              name="hourly_rate"
              placeholder="hourly_rate"
              type="text"
            />
            <input
               className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
              id="booking_type"
              name="booking_type"
              placeholder="booking_type"
              type="text"
            />

            <input
               className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
              id="photo"
              name="photo"
              placeholder="photo"
              type="text"
            />

            <input
               className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
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
