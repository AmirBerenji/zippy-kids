"use client";
import { getLanguages, getLocation } from "@/action/nurseApiAction";
import { Profile } from "@/model/auth";
import { Languages } from "@/model/language";
import React, { useEffect, useState } from "react";
import { Location } from "@/model/location";
import { ShieldAlert, X } from "lucide-react";

interface Props {
  userInfo: Profile;
}

interface SelectedLanguage {
  id: string;
  name: string;
  fullName: string;
}

export default function NurseProfile(prop: Props) {
  const [listLocation, setLocation] = useState<Location[]>([]);
  const [listLanguages, setLanguages] = useState<Languages[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<
    SelectedLanguage[]
  >([]);
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
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  const handleLanguageChange = (
    langId: string | number,
    langName: string,
    isChecked: boolean
  ) => {
    const stringId = String(langId);
    if (isChecked) {
      setSelectedLanguages((prev) => [
        ...prev,
        { id: stringId, name: langName, fullName: "" },
      ]);
    } else {
      setSelectedLanguages((prev) =>
        prev.filter((lang) => lang.id !== stringId)
      );
    }
  };

  const handleFullNameChange = (langId: string | number, fullName: string) => {
    const stringId = String(langId);
    setSelectedLanguages((prev) =>
      prev.map((lang) => (lang.id === stringId ? { ...lang, fullName } : lang))
    );
  };

  const removeLanguage = (langId: string | number) => {
    const stringId = String(langId);
    setSelectedLanguages((prev) => prev.filter((lang) => lang.id !== stringId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fdb68a]"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white text-xs p-4 sm:p-6 lg:p-8">
        <div className=" mx-auto">
          {/* Language Selection Section */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              Select languages you can speak
            </label>
            <span className="text-[#fdb68a] text-xs inline-flex items-center mb-4">
              <ShieldAlert size={16} className="mr-1" />
              Based on your language selected we show your information in nurse
              list
            </span>

            {/* Language Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
              {listLanguages.map((lang) => (
                <label
                  key={lang.id}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    name="language"
                    value={String(lang.id)}
                    className="w-4 h-4 text-[#fdb68a] border-gray-300 rounded focus:ring-[#fdb68a] focus:ring-2"
                    checked={selectedLanguages.some(
                      (selected) => selected.id === String(lang.id)
                    )}
                    onChange={(e) => {
                      handleLanguageChange(
                        lang.id,
                        lang.name || "",
                        e.target.checked
                      );
                    }}
                  />
                  <span className="text-gray-700 select-none text-sm">
                    {lang.name}
                  </span>
                </label>
              ))}
            </div>

            {/* Dynamic Full Name Fields for Selected Languages */}
            {selectedLanguages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Enter your full name in each selected language:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {selectedLanguages.map((lang) => (
                    <div key={lang.id} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-600">
                          Full Name ({lang.name})
                        </label>
                        <button
                          type="button"
                          onClick={() => removeLanguage(lang.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={lang.fullName}
                        onChange={(e) =>
                          handleFullNameChange(lang.id, e.target.value)
                        }
                        placeholder={`Enter your full name in ${lang.name}`}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="gender"
                name="gender"
              >
                <option value="">Select a gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
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
            </div>

            <div>
              <label
                htmlFor="yearsExperience"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Years of Experience
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="yearsExperience"
                name="yearsExperience"
                placeholder="e.g., 5"
                type="number"
                min="0"
              />
            </div>

            <div>
              <label
                htmlFor="dayavailable"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Days Available
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="dayavailable"
                name="dayavailable"
                placeholder="e.g., Mon-Fri"
                type="text"
              />
            </div>

            <div>
              <label
                htmlFor="commitment_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Commitment Type
              </label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="commitment_type"
                name="commitment_type"
              >
                <option value="">Select commitment type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="hourly_rate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Hourly Rate ($)
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="hourly_rate"
                name="hourly_rate"
                placeholder="e.g., 25"
                type="number"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label
                htmlFor="booking_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Booking Type
              </label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="booking_type"
                name="booking_type"
              >
                <option value="">Select booking type</option>
                <option value="immediate">Immediate</option>
                <option value="scheduled">Scheduled</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Photo URL
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="photo"
                name="photo"
                placeholder="https://..."
                type="url"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label
                htmlFor="fixed_package_description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Package Description
              </label>
              <textarea
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent resize-y min-h-[100px]"
                id="fixed_package_description"
                name="fixed_package_description"
                placeholder="Describe your service packages..."
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-[#fdb68a] hover:bg-[#fd9f5a] text-white font-medium py-2 px-6 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:ring-offset-2"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
