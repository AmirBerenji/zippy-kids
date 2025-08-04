"use client";
import { getLanguages, getLocation } from "@/action/nurseApiAction";
import { Languages } from "@/model/language";
import { Location } from "@/model/location";
import React, { useEffect, useState } from "react";

export default function NurseAddpage() {
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
      setLanguages(languages||[]);
    } catch (error) {
      console.error("Error loading pets:", error);
    }
  };

  return (
    <div className="bg-white p-5  rounded-2xl shadow-xl  " >
      <div className="grid grid-cols-1 lg:grid-col-3 xl:grid-cols-3 " >
        <div>

        </div>
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
              <option  value="Female"> Female </option>
              <option  value="Male"> Male </option>
              <option  value="Other"> Other </option>
            
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
            autoComplete="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email1"
            name="email1"
            placeholder="you@example.com"
            type="email"
          />
          <input
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email2"
            name="email2"
            placeholder="you@example.com"
            type="text"
          />
          <input
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email3"
            name="email3"
            placeholder="you@example.com"
            type="text"
          />
          <input
            autoComplete="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email1"
            name="email1"
            placeholder="you@example.com"
            type="email"
          />
          <input
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email2"
            name="email2"
            placeholder="you@example.com"
            type="text"
          />
          <input
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email3"
            name="email3"
            placeholder="you@example.com"
            type="text"
          />
        </div>
      </div>
    </div>
  );
}
