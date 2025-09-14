"use client";
import {
  addNuresProfile,
  getLanguages,
  getLocation,
} from "@/action/nurseApiAction";
import { Profile } from "@/model/auth";
import { Languages } from "@/model/language";
import { Location } from "@/model/location";

import React, { useEffect, useRef, useState } from "react";
import { ShieldAlert, X, Loader2, Check, Camera, Upload, AlertCircle } from "lucide-react";
import { Nanny, NannyTranslation } from "@/model/nany";
import LoadingPage from "@/app/component/general/Loading";

interface Props {
  userInfo: Profile;
}

interface SelectedLanguage {
  id: string;
  name: string;
  fullName: string;
  specialization: string;
}

interface NurseFormData {
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
  ageGroups: string;
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


// Image upload state
const [selectedImage, setSelectedImage] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string | null>(null);
const [isUploading, setIsUploading] = useState(false);
const [uploadSuccess, setUploadSuccess] = useState(false);
const [error, setError] = useState<string | null>(null); // Changed to string | null
const [dragOver, setDragOver] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);

const handleImageSelect = (file: File | null) => { // Allow null parameter
  if (!file) return;

  // Reset states
  setError(null); // Changed to null
  setUploadSuccess(false);

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    setError('Please select a valid image file (JPEG, PNG, or WebP)');
    return;
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    setError('Image size must be less than 5MB');
    return;
  }

  setSelectedImage(file); // Removed 'as any'
  
  // Create preview
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => { // Proper typing
    if (e.target?.result && typeof e.target.result === 'string') {
      setImagePreview(e.target.result);
    }
  };
  reader.readAsDataURL(file);
};

const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Proper typing
  const file = e.target.files?.[0] || null;
  handleImageSelect(file);
};

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { // Proper typing
  e.preventDefault();
  setDragOver(true);
};

const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { // Proper typing
  e.preventDefault();
  setDragOver(false);
};

const handleDrop = (e: React.DragEvent<HTMLDivElement>) => { // Proper typing
  e.preventDefault();
  setDragOver(false);
  const file = e.dataTransfer.files?.[0] || null;
  handleImageSelect(file);
};

const triggerFileInput = (e: React.DragEvent<HTMLDivElement>) => {
  fileInputRef.current?.click();
     e.preventDefault();
      const file = e.dataTransfer.files?.[0] || null;
      handleImageSelect(file);
};

const handleRemoveImage = () => {
  setSelectedImage(null);
  setImagePreview(null);
  setError(null); // Changed to null
  setUploadSuccess(false);
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
};

function uploadProfileImage(formData: globalThis.FormData): Promise<{ url?: string; profile_image_url?: string }> {
  // Simulate an API call - replace with actual API integration
  return new Promise((resolve, reject) => {})}

const uploadImage = async (): Promise<string | null> => { // New function for actual upload
  if (!selectedImage) return null;

  setIsUploading(true);
  setError(null);

  try {
    const formDataForUpload = new FormData();
    formDataForUpload.append('profile_image', selectedImage);
    
    // Call your API function to upload image
    const response = await uploadProfileImage(formDataForUpload);
    
    // Assuming the API returns { url: "uploaded_image_url" } or { profile_image_url: "url" }
    return null; //response.url || response.profile_image_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload profile image');
  } finally {
    setIsUploading(false);
  }
};

const handleUpload = async () => { // For demo/testing purposes
  if (!selectedImage) return;

  setIsUploading(true);
  setError(null);

  try {
    // Simulate API call - replace with actual uploadImage() call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success
    setUploadSuccess(true);
    console.log('Image uploaded successfully:', selectedImage.name);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to upload image. Please try again.';
    setError(errorMessage);
  } finally {
    setIsUploading(false);
  }
};

const formatFileSize = (bytes: number): string => { // Proper typing and return type
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};



  // Form state


  const [formData, setFormData] = useState<NurseFormData>({
    gender: "",
    location_id: "",
    years_experience: "",
    working_hours: "",
    commitment_type: "",
    hourly_rate: "",
    booking_type: "",
    fixed_package_description: "",
    video_intro_url: "",
    resume_url: "",
    ageGroups: ""
  });

  const daysOfWeek = [
    { id: "monday", name: "Monday", short: "Mon" },
    { id: "tuesday", name: "Tuesday", short: "Tue" },
    { id: "wednesday", name: "Wednesday", short: "Wed" },
    { id: "thursday", name: "Thursday", short: "Thu" },
    { id: "friday", name: "Friday", short: "Fri" },
    { id: "saturday", name: "Saturday", short: "Sat" },
    { id: "sunday", name: "Sunday", short: "Sun" },
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
    langId: string | number,
    langName: string,
    isChecked: boolean
  ) => {
    const stringId = String(langId);
    if (isChecked) {
      setSelectedLanguages((prev) => [
        ...prev,
        {
          id: stringId,
          name: langName,
          fullName: "",
          specialization: "",
        },
      ]);
    } else {
      setSelectedLanguages((prev) =>
        prev.filter((lang) => lang.id !== stringId)
      );
    }
  };

  const handleLanguageDetailChange = (
    langId: string | number,
    field: "fullName" | "specialization" ,
    value: string
  ) => {
    const stringId = String(langId);
    setSelectedLanguages((prev) =>
      prev.map((lang) =>
        lang.id === stringId ? { ...lang, [field]: value } : lang
      )
    );
  };

  const removeLanguage = (langId: string | number) => {
    const stringId = String(langId);
    setSelectedLanguages((prev) => prev.filter((lang) => lang.id !== stringId));
  };

  const handleDayChange = (dayId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedDays((prev) => [...prev, dayId]);
    } else {
      setSelectedDays((prev) => prev.filter((day) => day !== dayId));
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
    if (selectedLanguages.length === 0)
      return "At least one language must be selected";
    if (!formData.ageGroups) return "Age groups is required";
        
    // Validate language translations
    for (const lang of selectedLanguages) {
      if (!lang.fullName.trim())
        return `Full name is required for ${lang.name}`;
      if (!lang.specialization.trim())
        return `Specialization is required for ${lang.name}`;
    }

    return null;
  };

  const mapFormDataToNannyModel = (): Nanny => {
    // Create nanny translations
    const nannytranslation: NannyTranslation[] = selectedLanguages.map(
      (lang) => ({
        language_code: lang.id,
        full_name: lang.fullName.trim(),
        specialization: lang.specialization.trim(),
      })
    );

    // Map form data to Nanny model
    const nannyData: Nanny = {
      gender: formData.gender,
      location_id: parseInt(formData.location_id),
      years_experience: parseInt(formData.years_experience),
      working_hours: formData.working_hours || "9:00-17:00", // Default or from form
      days_available: selectedDays.join(","), // Convert array to comma-separated string
      commitment_type: formData.commitment_type,
      hourly_rate: parseFloat(formData.hourly_rate),
      fixed_package_description: formData.fixed_package_description,
      contact_enabled: true,
      booking_type: formData.booking_type,
      availability_calendar: [], // Empty array as per model
      is_verified: true,
      video_intro_url: formData.video_intro_url || "",
      resume_url: formData.resume_url || "",
      nannytranslation: nannytranslation,
      age_groups: formData.ageGroups
    };

    return nannyData;
  };

  const submitToAPI = async (nannyData: Nanny) => {
    console.log("Submitting nanny data:", nannyData);
    var req = await addNuresProfile(nannyData);
    console.log("API Response:", req);
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
      console.log("Submitting nanny data:", nannyData);

      // Submit to API
      const result = await submitToAPI(nannyData);

      console.log("API Response:", result);
      setSubmitSuccess(true);

      // Optionally reset form or redirect
      // resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An error occurred while saving your profile"
      );
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
      resume_url: "",
      ageGroups: ""
    });
    setSelectedLanguages([]);
    setSelectedDays([]);
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-white text-xs p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

<div className="  p-0 ">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Picture</h2>
          <p className="text-gray-600">Upload a photo to personalize your profile</p>
        </div>

        {/* Upload Area */}
        <div className="mb-4">
          {/* Image Preview */}
          {imagePreview ? (
            <div className="relative mb-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
               // onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                disabled={isUploading}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            /* Drag & Drop Area */
            <div
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`
                relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-2
                ${dragOver 
                  ? 'border-orange-400 bg-orange-50' 
                  : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
                }
              `}
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Camera className="w-10 h-10 text-gray-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {dragOver ? 'Drop your image here' : 'Choose your profile picture'}
                </h3>
                
                <p className="text-gray-500 mb-4">
                  Drag and drop or click to browse
                </p>
                
                <div className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Image
                </div>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isUploading}
          />
        </div>

        {/* File Information */}
        {selectedImage && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 truncate">
                  {selectedImage.name}
                </p>
                <p className="text-sm text-gray-500">
                {formatFileSize(selectedImage.size)}
                </p>
              </div>
              {uploadSuccess && (
                <div className="flex items-center text-green-600">
                  <Check size={16} className="mr-1" />
                  <span className="text-sm font-medium">Uploaded</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Upload Button */}
        {selectedImage && !uploadSuccess && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full flex items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </>
            )}
          </button>
        )}

        {/* Success State */}
        {uploadSuccess && (
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-800">
              <Check className="w-4 h-4 mr-2" />
              <span className="font-medium">Profile picture updated successfully!</span>
            </div>
          </div>
        )}

        {/* Guidelines */}
        {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Photo Guidelines:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use a clear, recent photo of yourself</li>
            <li>• Face should be clearly visible and centered</li>
            <li>• Accepted formats: JPEG, PNG, WebP</li>
            <li>• Maximum file size: 5MB</li>
            <li>• Recommended: 400x400 pixels or larger</li>
          </ul>
        </div> */}
      </div>










        <form onSubmit={handleSubmit} className="  p-2 border border-gray-200 rounded-xl shadow-sm">
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
            <span className="text-[#ff9a5a] text-xs inline-flex items-center">
              <ShieldAlert size={16} className="mr-1" />
              Based on your language selected we show your information in nanny
              list
            </span>

            {/* Language Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-4 mt-3">
              {listLanguages.map((lang) => (
                <label
                  key={lang.id}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    name="language"
                    value={String(lang.id)}
                    className="w-4 h-4 text-[#ff9a5a] border-gray-300 rounded focus:ring-[#fdb68a] focus:ring-2"
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

            {/* Dynamic Fields for Selected Languages */}
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

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={lang.fullName}
                            onChange={(e) =>
                              handleLanguageDetailChange(
                                lang.id,
                                "fullName",
                                e.target.value
                              )
                            }
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
                            onChange={(e) =>
                              handleLanguageDetailChange(
                                lang.id,
                                "specialization",
                                e.target.value
                              )
                            }
                            placeholder={`Specialization in ${lang.name}`}
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
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-6">
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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

            <div>
              <label
                htmlFor="years_experience"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="working_hours"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Age Groups *
                          </label>
                          <input
                            type="text"
                            name="ageGroups"
                            id="ageGroups"
                            value={formData.ageGroups}
                           onChange={handleInputChange}
                            placeholder="e.g., 0-3, 4-8, 9-12"
                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                            required
                          />
                        </div>
            <div>
              <label
                htmlFor="commitment_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                <option value="Short-term">Short Term</option>
                <option value="Long-term">Long Term</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="hourly_rate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="booking_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                <option value="direct">Direct</option>
                <option value="Interview">Interview</option>
                <option value="on_request">On Request</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="video_intro_url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="resume_url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2">
              {daysOfWeek.map((day) => (
                <label
                  key={day.id}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    name="dayavailable"
                    value={day.id}
                    className="w-4 h-4 text-[#ff9a5a] border-gray-300 rounded focus:ring-[#ff9a5a] focus:ring-2"
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
              <div className="mt-2 text-xs text-[#ff9a5a]">
                Selected:{" "}
                {selectedDays
                  .map(
                    (dayId) => daysOfWeek.find((day) => day.id === dayId)?.name
                  )
                  .join(", ")}
              </div>
            )}
          </div>

          {/* Package Description */}
          <div className="mb-6">
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
              value={formData.fixed_package_description}
              onChange={handleInputChange}
            />
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
                  Saving...
                </>
              ) : (
                "Save Profile"
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
