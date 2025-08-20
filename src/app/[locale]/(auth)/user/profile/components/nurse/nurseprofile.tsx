"use client";
import { getLanguages, getLocation } from "@/action/nurseApiAction";
import { Profile } from "@/model/auth";
import { Languages } from "@/model/language";
import { Location } from "@/model/location";

import React, { useEffect, useState } from "react";
import { ShieldAlert, X, Loader2, Check } from "lucide-react";
import { Nanny, NannyTranslation } from "@/model/nany";

interface Props {
  userInfo: Profile;
}

interface SelectedLanguage {
  id: string;
  name: string;
  fullName: string;
  specialization: string;
  ageGroups: string;
}

interface FormData {
  gender: string;
  location_id: string;
  years_experience: string;
  working_hours: string;
  commitment_type: string;
  hourly_rate: string;
  booking_type: string;
  fixed_package_description: string;
  video_intro_url: string;
  resume_url: string;
}

export default function NannyProfile(prop: Props) {
  const [listLocation, setLocation] = useState<Location[]>([]);
  const [listLanguages, setLanguages] = useState<Languages[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguage[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    location_id: "",
    years_experience: "",
    working_hours: "",
    commitment_type: "",
    hourly_rate: "",
    booking_type: "",
    fixed_package_description: "",
    video_intro_url: "",
    resume_url: ""
  });

  const daysOfWeek = [
    { id: 'monday', name: 'Monday', short: 'Mon' },
    { id: 'tuesday', name: 'Tuesday', short: 'Tue' },
    { id: 'wednesday', name: 'Wednesday', short: 'Wed' },
    { id: 'thursday', name: 'Thursday', short: 'Thu' },
    { id: 'friday', name: 'Friday', short: 'Fri' },
    { id: 'saturday', name: 'Saturday', short: 'Sat' },
    { id: 'sunday', name: 'Sunday', short: 'Sun' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const locations = await getLocation();
      setLocation(locations || []);
      const languages = await getLanguages();
      setLanguages(languages || []);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageChange = (langId: string | number, langName: string, isChecked: boolean) => {
    const stringId = String(langId);
    if (isChecked) {
      setSelectedLanguages(prev => [
        ...prev,
        { 
          id: stringId, 
          name: langName, 
          fullName: '',
          specialization: '',
          ageGroups: ''
        }
      ]);
    } else {
      setSelectedLanguages(prev => prev.filter(lang => lang.id !== stringId));
    }
  };

  const handleLanguageDetailChange = (
    langId: string | number, 
    field: 'fullName' | 'specialization' | 'ageGroups', 
    value: string
  ) => {
    const stringId = String(langId);
    setSelectedLanguages(prev =>
      prev.map(lang =>
        lang.id === stringId ? { ...lang, [field]: value } : lang
      )
    );
  };

  const removeLanguage = (langId: string | number) => {
    const stringId = String(langId);
    setSelectedLanguages(prev => prev.filter(lang => lang.id !== stringId));
  };

  const handleDayChange = (dayId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedDays(prev => [...prev, dayId]);
    } else {
      setSelectedDays(prev => prev.filter(day => day !== dayId));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.gender) return "Gender is required";
    if (!formData.location_id) return "Location is required";
    if (!formData.years_experience) return "Years of experience is required";
    if (!formData.commitment_type) return "Commitment type is required";
    if (!formData.hourly_rate) return "Hourly rate is required";
    if (!formData.booking_type) return "Booking type is required";
    if (selectedDays.length === 0) return "At least one day must be selected";
    if (selectedLanguages.length === 0) return "At least one language must be selected";
    
    // Validate language translations
    for (const lang of selectedLanguages) {
      if (!lang.fullName.trim()) return `Full name is required for ${lang.name}`;
      if (!lang.specialization.trim()) return `Specialization is required for ${lang.name}`;
      if (!lang.ageGroups.trim()) return `Age groups is required for ${lang.name}`;
    }

    return null;
  };

  const mapFormDataToNannyModel = (): Nanny => {
    // Create nanny translations
    const nannytranslation: NannyTranslation[] = selectedLanguages.map(lang => ({
      language_code: lang.id,
      full_name: lang.fullName.trim(),
      specialization: lang.specialization.trim(),
      age_groups: lang.ageGroups.trim()
    }));

    // Map form data to Nanny model
    const nannyData: Nanny = {
      gender: formData.gender,
      location_id: parseInt(formData.location_id),
      years_experience: parseInt(formData.years_experience),
      working_hours: formData.working_hours || "9:00-17:00", // Default or from form
      days_available: selectedDays.join(','), // Convert array to comma-separated string
      commitment_type: formData.commitment_type,
      hourly_rate: parseFloat(formData.hourly_rate),
      fixed_package_description: formData.fixed_package_description,
      contact_enabled: true,
      booking_type: formData.booking_type,
      availability_calendar: [], // Empty array as per model
      is_verified: true,
      video_intro_url: formData.video_intro_url || "",
      resume_url: formData.resume_url || "",
      nannytranslation: nannytranslation
    };

    return nannyData;
  };

  const submitToAPI = async (nannyData: Nanny) => {
    // Replace this with your actual API endpoint
    const response = await fetch('/api/nanny/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
      },
      body: JSON.stringify(nannyData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save profile');
    }

    return await response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous states
    setSubmitError(null);
    setSubmitSuccess(false);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Map form data to model
      const nannyData = mapFormDataToNannyModel();
      
      // Log the data for debugging (remove in production)
      console.log('Submitting nanny data:', nannyData);
      
      // Submit to API
      const result = await submitToAPI(nannyData);
      
      console.log('API Response:', result);
      setSubmitSuccess(true);
      
      // Optionally reset form or redirect
      // resetForm();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred while saving your profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      gender: "",
      location_id: "",
      years_experience: "",
      working_hours: "",
      commitment_type: "",
      hourly_rate: "",
      booking_type: "",
      fixed_package_description: "",
      video_intro_url: "",
      resume_url: ""
    });
    setSelectedLanguages([]);
    setSelectedDays([]);
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fdb68a]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white text-xs p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit}>
          
          {/* Success/Error Messages */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                <p className="text-sm font-medium text-green-800">
                  Profile saved successfully!
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
            <span className="text-[#fdb68a] text-xs inline-flex items-center">
              <ShieldAlert size={16} className="mr-1" />
              Based on your language selected we show your information in nanny list
            </span>

            {/* Language Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4 mt-3">
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
                    checked={selectedLanguages.some(selected => selected.id === String(lang.id))}
                    onChange={(e) => {
                      handleLanguageChange(lang.id, lang.name || '', e.target.checked);
                    }}
                  />
                  <span className="text-gray-700 select-none text-sm">
                    {lang.name}
                  </span>
                </label>
              ))}
            </div>

            {/* Dynamic Fields for Selected Languages */}
            {selectedLanguages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Enter details for each selected language:
                </h3>
                <div className="space-y-6">
                  {selectedLanguages.map((lang) => (
                    <div key={lang.id} className="border border-gray-200 rounded-lg p-4">
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={lang.fullName}
                            onChange={(e) => handleLanguageDetailChange(lang.id, 'fullName', e.target.value)}
                            placeholder={`Full name in ${lang.name}`}
                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Specialization *
                          </label>
                          <input
                            type="text"
                            value={lang.specialization}
                            onChange={(e) => handleLanguageDetailChange(lang.id, 'specialization', e.target.value)}
                            placeholder={`Specialization in ${lang.name}`}
                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Age Groups *
                          </label>
                          <input
                            type="text"
                            value={lang.ageGroups}
                            onChange={(e) => handleLanguageDetailChange(lang.id, 'ageGroups', e.target.value)}
                            placeholder="e.g., 0-3, 4-8, 9-12"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="location_id" className="block text-sm font-medium text-gray-700 mb-1">
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

            <div>
              <label htmlFor="years_experience" className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience *
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="years_experience"
                name="years_experience"
                placeholder="e.g., 5"
                type="number"
                min="0"
                value={formData.years_experience}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="working_hours" className="block text-sm font-medium text-gray-700 mb-1">
                Working Hours
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="working_hours"
                name="working_hours"
                placeholder="e.g., 9:00-17:00"
                type="text"
                value={formData.working_hours}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="commitment_type" className="block text-sm font-medium text-gray-700 mb-1">
                Commitment Type *
              </label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="commitment_type"
                name="commitment_type"
                value={formData.commitment_type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select commitment type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div>
              <label htmlFor="hourly_rate" className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate ($) *
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="hourly_rate"
                name="hourly_rate"
                placeholder="e.g., 25"
                type="number"
                min="0"
                step="0.01"
                value={formData.hourly_rate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="booking_type" className="block text-sm font-medium text-gray-700 mb-1">
                Booking Type *
              </label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="booking_type"
                name="booking_type"
                value={formData.booking_type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select booking type</option>
                <option value="immediate">Immediate</option>
                <option value="scheduled">Scheduled</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div>
              <label htmlFor="video_intro_url" className="block text-sm font-medium text-gray-700 mb-1">
                Video Introduction URL
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="video_intro_url"
                name="video_intro_url"
                placeholder="https://..."
                type="url"
                value={formData.video_intro_url}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="resume_url" className="block text-sm font-medium text-gray-700 mb-1">
                Resume URL
              </label>
              <input
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="resume_url"
                name="resume_url"
                placeholder="https://..."
                type="url"
                value={formData.resume_url}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Days Available Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Days Available *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <label
                  key={day.id}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    name="dayavailable"
                    value={day.id}
                    className="w-4 h-4 text-[#fdb68a] border-gray-300 rounded focus:ring-[#fdb68a] focus:ring-2"
                    checked={selectedDays.includes(day.id)}
                    onChange={(e) => handleDayChange(day.id, e.target.checked)}
                  />
                  <span className="text-sm text-gray-700 select-none">
                    <span className="hidden sm:inline">{day.name}</span>
                    <span className="sm:hidden">{day.short}</span>
                  </span>
                </label>
              ))}
            </div>
            {selectedDays.length > 0 && (
              <div className="mt-2 text-xs text-[#fdb68a]">
                Selected: {selectedDays.map(dayId => 
                  daysOfWeek.find(day => day.id === dayId)?.name
                ).join(', ')}
              </div>
            )}
          </div>

          {/* Package Description */}
          <div className="mb-6">
            <label htmlFor="fixed_package_description" className="block text-sm font-medium text-gray-700 mb-1">
              Package Description
            </label>
            <textarea
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent resize-y min-h-[100px]"
              id="fixed_package_description"
              name="fixed_package_description"
              placeholder="Describe your service packages..."
              rows={4}
              value={formData.fixed_package_description}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#fdb68a] hover:bg-[#fd9f5a] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:ring-offset-2 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Saving...
                </>
              ) : (
                'Save Profile'
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