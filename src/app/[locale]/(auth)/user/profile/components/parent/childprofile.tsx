// ChildrenForm.tsx
"use client";
import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Upload, X } from "lucide-react";
import { ChildFormData, childMessage } from "@/model/child";
import { addChildProfile, updateChildProfile, getChildById } from "@/action/parentApiAction";

interface ChildProfileProps {
  selectedChildId: number | null;  // null = Add mode, number = Edit mode
  onSuccess?: () => void;          // optional: called after save (e.g. switch tab back)
}

const EMPTY_FORM: ChildFormData = {
  name: "",
  last_name: "",
  address: "",
  birthday: "",
  blood_type: "",
  gender: "",
  uuid: "",
  image: null,
};

export default function ChildrenForm({ selectedChildId, onSuccess }: ChildProfileProps) {
  const isEditMode = selectedChildId !== null;

  const [formData, setFormData] = useState<ChildFormData>({
    ...EMPTY_FORM,
    uuid: localStorage.getItem("childTagId") ?? "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [message, setMessage] = useState<childMessage>({ type: "", text: "" });

  // ─── Load existing child data when in Edit mode ───────────────────────────
  useEffect(() => {
    if (!isEditMode) {
      // Reset to empty form when switching to Add mode
      setFormData({ ...EMPTY_FORM, uuid: localStorage.getItem("childTagId") ?? "" });
      setImagePreview(null);
      setMessage({ type: "", text: "" });
      return;
    }

    const fetchChild = async () => {
      setFetching(true);
      try {
        const child = await getChildById(selectedChildId); // your API action
        setFormData({
          name: child.name ?? "",
          last_name: child.last_name ?? "",
          address: child.address ?? "",
          birthday: child.birthday ?? "",
          blood_type: child.blood_type ?? "",
          gender: child.gender ?? "",
          uuid: child.uuid ?? "",
          image: null, // can't prefill file input
        });
        if (child.image_url) setImagePreview(child.image_url);
      } catch {
        setMessage({ type: "error", text: "Failed to load child data." });
      } finally {
        setFetching(false);
      }
    };

    fetchChild();
  }, [selectedChildId]);

  // ─── Handlers (unchanged from your original) ──────────────────────────────
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2048000) {
      setMessage({ type: "error", text: "Image size should be less than 2MB" });
      return;
    }
    setFormData((prev) => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  // ─── Submit: decides Add vs Edit ──────────────────────────────────────────
  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("last_name", formData.last_name);
      if (formData.address)    formPayload.append("address", formData.address);
      if (formData.birthday)   formPayload.append("birthday", formData.birthday);
      if (formData.blood_type) formPayload.append("blood_type", formData.blood_type);
      if (formData.gender)     formPayload.append("gender", formData.gender);
      if (formData.uuid)       formPayload.append("uuid", formData.uuid);
      if (formData.image)      formPayload.append("image", formData.image);

      // ↓ Key difference: call different API based on mode
      const response = isEditMode
        ? await updateChildProfile(selectedChildId, formPayload)  // your update action
        : await addChildProfile(formPayload);

      if (response.success) {
        setMessage({
          type: "success",
          text: isEditMode
            ? "Child updated successfully!"
            : "Child added successfully!",
        });

        if (!isEditMode) {
          // Only reset form on Add, not Edit
          setFormData({ ...EMPTY_FORM, uuid: "" });
          setImagePreview(null);
          localStorage.removeItem("childTagId");
        }

        onSuccess?.(); // e.g. switch tab back to list
      } else {
        setMessage({
          type: "error",
          text: response?.message || "Failed to save data. Please try again.",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const bloodTypes = ["(1)O+", "(1)O-", "(2)A+", "(2)A-", "(3)B+", "(3)B-", "(4)AB+", "(4)AB-"];
  const genderOptions = ["Male", "Female"];

  // ─── Loading skeleton while fetching edit data ────────────────────────────
  if (fetching) {
    return (
      <div className="bg-white p-8 flex items-center justify-center h-64">
        <p className="text-gray-500 animate-pulse">Loading child data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8">
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
          message.type === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {message.type === "success"
            ? <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            : <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo <span className="text-xs text-orange-500">(Optional)</span>
          </label>
          <div className="flex items-center gap-4">
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200" />
                <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Upload</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter first name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter last name" />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address <span className="text-xs text-orange-500">(Optional)</span></label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter address" />
        </div>

        {/* Birthday, Blood Type, Gender, UUID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Birthday <span className="text-xs text-orange-500">(Optional)</span></label>
            <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type <span className="text-xs text-orange-500">(Optional)</span></label>
            <select name="blood_type" value={formData.blood_type} onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="">Select blood type</option>
              {bloodTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender <span className="text-xs text-orange-500">(Optional)</span></label>
            <select name="gender" value={formData.gender} onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="">Select gender</option>
              {genderOptions.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tag info <span className="text-xs text-orange-500">(unique identifier)</span>
            </label>
            <input type="text" name="uuid" value={formData.uuid} onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter tag id" />
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition">
          {loading ? "Saving..." : isEditMode ? "Update Child" : "Save Child"}
        </button>
      </div>
    </div>
  );
}