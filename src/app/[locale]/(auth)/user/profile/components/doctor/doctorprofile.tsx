"use client";
import {
  addDoctorProfile,
  getDoctorByUserId,
  getLanguages,
  getLocation,
  updateDoctorProfile,
} from "@/action/doctorApiAction";
import { Profile } from "@/model/auth";
import { Languages, SelectedLanguage } from "@/model/language";
import { Location } from "@/model/location";

import React, { useEffect, useState } from "react";
import { ShieldAlert, X, Loader2, Check } from "lucide-react";
import { Doctor, DoctorTranslation, DoctorFormData } from "@/model/doctor";
import LoadingPage from "@/app/component/general/Loading";

interface DoctorSelectedLanguage {
  id: string;
  code: string;
  name: string;
  doctorName: string;
  bio: string;
  education: string;
  address: string;
}

export default function DoctorProfile() {
  const [listLocation, setLocation] = useState<Location[]>([]);
  const [listLanguages, setLanguages] = useState<Languages[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<
    DoctorSelectedLanguage[]
  >([]);
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [doctorId, setDoctorId] = useState<number | null>(null);

  const [formData, setFormData] = useState<DoctorFormData>({
    email: "",
    phone: "",
    specialization: "",
    experience_years: "",
    license_number: "",
    location_id: "",
    status: "active",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const populateFormWithExistingData = (
    doctorData: any,
    languages: Languages[]
  ) => {
    if (!doctorData) {
      console.log("No existing doctor data found");
      setLoading(false);
      return;
    }

    console.log("Populating form with doctor data:", doctorData);
    console.log("Available languages:", languages);

    // Store the doctor ID for updates
    if (doctorData.id) {
      setDoctorId(doctorData.id);
    }

    setFormData({
      email: doctorData.email || "",
      phone: doctorData.phone || "",
      specialization: doctorData.specialization || "",
      experience_years: doctorData.experience_years?.toString() || "",
      license_number: doctorData.license_number || "",
      location_id:
        doctorData.location?.id?.toString() ||
        doctorData.location_id?.toString() ||
        "",
      status: doctorData.status || "active",
    });

    if (
      doctorData.translations &&
      Array.isArray(doctorData.translations) &&
      languages.length > 0
    ) {
      console.log("Doctor translations:", doctorData.translations);

      const mappedLanguages: DoctorSelectedLanguage[] = doctorData.translations
        .map((trans: any) => {
          console.log("Processing translation:", trans);

          // Try multiple ways to match the language
          const language = languages.find((lang) => {
            const match =
              lang.code === trans.language_code ||
              String(lang.id) === String(trans.language_code) ||
              String(lang.id) === String(trans.language_id) ||
              lang.id === trans.language_id;
            if (match) {
              console.log("Found matching language:", lang);
            }
            return match;
          });

          if (!language) {
            console.warn(`Language not found for translation:`, trans);
            return null;
          }

          return {
            id: String(language.id),
            code: language.code,
            name: language.name || trans.language_code,
            doctorName: trans.name || "",
            bio: trans.bio || "",
            education: trans.education || "",
            address: trans.address || "",
          };
        })
        .filter(
          (
            lang: DoctorSelectedLanguage | null
          ): lang is DoctorSelectedLanguage => lang !== null
        );

      console.log("Mapped languages:", mappedLanguages);
      setSelectedLanguages(mappedLanguages);
    }

    setIsEditMode(true);
  };

  const fetchData = async () => {
    try {
      // Fetch locations and languages first
      const [locations, languages] = await Promise.all([
        getLocation(),
        getLanguages(),
      ]);

      console.log("Fetched languages:", languages);
      setLocation(locations || []);
      setLanguages(languages || []);

      // Then fetch doctor data using the API
      try {
        const doctor = await getDoctorByUserId();
        console.log("Fetched doctor:", doctor);

        if (doctor && doctor.id) {
          // Pass languages directly to avoid timing issues
          populateFormWithExistingData(doctor, languages || []);
        } else {
          console.log("No existing doctor profile found");
        }
      } catch (doctorError) {
        console.log("No existing doctor profile found or error:", doctorError);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setSubmitError("Failed to load data. Please refresh the page.");
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLanguageChange = (
    langId: string,
    langCode: string,
    langName: string,
    isChecked: boolean
  ) => {
    if (isChecked) {
      setSelectedLanguages((prev) => [
        ...prev,
        {
          id: langId,
          code: langCode,
          name: langName,
          doctorName: "",
          bio: "",
          education: "",
          address: "",
        },
      ]);
    } else {
      setSelectedLanguages((prev) => prev.filter((lang) => lang.id !== langId));
    }
  };

  const handleLanguageDetailChange = (
    langId: string,
    field: "doctorName" | "bio" | "education" | "address",
    value: string
  ) => {
    setSelectedLanguages((prev) =>
      prev.map((lang) =>
        lang.id === langId ? { ...lang, [field]: value } : lang
      )
    );
  };

  const removeLanguage = (langId: string) => {
    setSelectedLanguages((prev) => prev.filter((lang) => lang.id !== langId));
  };

  const validateForm = (): string | null => {
    if (!formData.email) return "Email is required";
    if (!formData.phone) return "Phone is required";
    if (!formData.specialization) return "Specialization is required";
    if (!formData.experience_years) return "Experience years is required";
    if (!formData.license_number) return "License number is required";
    if (!formData.location_id) return "Location is required";
    if (!formData.status) return "Status is required";
    if (selectedLanguages.length === 0)
      return "At least one language must be selected";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address";
    }

    for (const lang of selectedLanguages) {
      if (!lang.doctorName.trim()) return `Name is required for ${lang.name}`;
      if (!lang.bio.trim()) return `Bio is required for ${lang.name}`;
      if (!lang.education.trim())
        return `Education is required for ${lang.name}`;
      if (!lang.address.trim()) return `Address is required for ${lang.name}`;
    }

    return null;
  };

  const mapFormDataToDoctorModel = (): Doctor => {
    const doctorTranslations: DoctorTranslation[] = selectedLanguages.map(
      (lang) => {
        console.log(
          "Mapping language - ID:",
          lang.id,
          "Code:",
          lang.code,
          "Name:",
          lang.name
        );
        return {
          language_id: parseInt(lang.id),
          name: lang.doctorName.trim(),
          bio: lang.bio.trim(),
          education: lang.education.trim(),
          address: lang.address.trim(),
        };
      }
    );

    console.log("Doctor translations to submit:", doctorTranslations);

    const doctorData: Doctor = {
      id: doctorId || 0,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      specialization: formData.specialization.trim(),
      experience_years: parseInt(formData.experience_years),
      license_number: formData.license_number.trim(),
      location_id: parseInt(formData.location_id),
      status: formData.status,
      translations: doctorTranslations,
    };

    return doctorData;
  };

  const submitToAPI = async (doctorData: Doctor) => {
    console.log("Submitting doctor data:", doctorData);
    console.log("Is edit mode:", isEditMode);
    console.log("Doctor ID:", doctorId);

    if (isEditMode && doctorId) {
      const req = await updateDoctorProfile(doctorId, doctorData);
      console.log("Update API Response:", req);
      return req;
    } else {
      const req = await addDoctorProfile(doctorData);
      console.log("Create API Response:", req);
      return req;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitError(null);
    setSubmitSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const doctorData = mapFormDataToDoctorModel();
      console.log("Submitting doctor data:", doctorData);

      const result = await submitToAPI(doctorData);

      console.log("API Response:", result);

      // If it was a create operation, update to edit mode
      if (!isEditMode && result && result.id) {
        setDoctorId(result.id);
        setIsEditMode(true);
      }

      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : `An error occurred while ${
              isEditMode ? "updating" : "saving"
            } your profile`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      phone: "",
      specialization: "",
      experience_years: "",
      license_number: "",
      location_id: "",
      status: "active",
    });
    setSelectedLanguages([]);
    setSubmitSuccess(false);
    setSubmitError(null);
    setIsEditMode(false);
    setDoctorId(null);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-white text-xs">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {isEditMode ? "Update" : "Create"} Doctor Profile
            </h2>
            {isEditMode && (
              <p className="text-sm text-gray-600">
                You are editing an existing profile
              </p>
            )}
          </div>

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                <p className="text-sm font-medium text-green-800">
                  Profile {isEditMode ? "updated" : "saved"} successfully!
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <X className="h-4 w-4 text-red-400 mr-2" />
                <p className="text-sm font-medium text-red-800">
                  {submitError}
                </p>
              </div>
            </div>
          )}

          {/* Language Selection Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Select languages you can speak *
            </label>
            <span className="text-[#ff9a5a] text-xs inline-flex items-center">
              <ShieldAlert size={16} className="mr-1" />
              Based on your language selected we show your information in doctor
              list
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-4 mt-3">
              {listLanguages.map((lang) => {
                const langId = String(lang.id);
                const langCode = lang.code || "";

                return (
                  <label
                    key={lang.id}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="language"
                      value={langId}
                      className="w-4 h-4 text-[#ff9a5a] border-gray-300 rounded focus:ring-[#fdb68a] focus:ring-2"
                      checked={selectedLanguages.some(
                        (selected) => selected.id === langId
                      )}
                      onChange={(e) => {
                        handleLanguageChange(
                          langId,
                          langCode,
                          lang.name || "",
                          e.target.checked
                        );
                      }}
                    />
                    <span className="text-gray-700 select-none text-sm">
                      {lang.name}
                    </span>
                  </label>
                );
              })}
            </div>

            {selectedLanguages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Enter details for each selected language:
                </h3>
                <div className="space-y-6">
                  {selectedLanguages.map((lang) => (
                    <div
                      key={lang.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-800">
                          {lang.name} Details
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeLanguage(lang.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Name *
                          </label>
                          <input
                            type="text"
                            value={lang.doctorName}
                            onChange={(e) =>
                              handleLanguageDetailChange(
                                lang.id,
                                "doctorName",
                                e.target.value
                              )
                            }
                            placeholder={`Name in ${lang.name}`}
                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Education *
                          </label>
                          <input
                            type="text"
                            value={lang.education}
                            onChange={(e) =>
                              handleLanguageDetailChange(
                                lang.id,
                                "education",
                                e.target.value
                              )
                            }
                            placeholder={`Education in ${lang.name}`}
                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Bio *
                          </label>
                          <textarea
                            value={lang.bio}
                            onChange={(e) =>
                              handleLanguageDetailChange(
                                lang.id,
                                "bio",
                                e.target.value
                              )
                            }
                            placeholder={`Bio in ${lang.name}`}
                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent resize-y min-h-[80px]"
                            rows={3}
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Address *
                          </label>
                          <input
                            type="text"
                            value={lang.address}
                            onChange={(e) =>
                              handleLanguageDetailChange(
                                lang.id,
                                "address",
                                e.target.value
                              )
                            }
                            placeholder={`Address in ${lang.name}`}
                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="email"
                name="email"
                type="email"
                placeholder="doctor@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone *
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="phone"
                name="phone"
                type="tel"
                placeholder="+37412345678"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Specialization *
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="specialization"
                name="specialization"
                type="text"
                placeholder="e.g., Cardiology"
                value={formData.specialization}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="experience_years"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Years of Experience *
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="experience_years"
                name="experience_years"
                placeholder="e.g., 10"
                type="number"
                min="0"
                value={formData.experience_years}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="license_number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                License Number *
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="license_number"
                name="license_number"
                type="text"
                placeholder="e.g., LIC12345"
                value={formData.license_number}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="location_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location *
              </label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="location_id"
                name="location_id"
                value={formData.location_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a location</option>
                {listLocation.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status *
              </label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#ff9a5a] hover:bg-[#fc8d3d] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:ring-offset-2 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  {isEditMode ? "Updating..." : "Saving..."}
                </>
              ) : (
                <>{isEditMode ? "Update Profile" : "Save Profile"}</>
              )}
            </button>

            {(submitSuccess || submitError) && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Reset Form
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
