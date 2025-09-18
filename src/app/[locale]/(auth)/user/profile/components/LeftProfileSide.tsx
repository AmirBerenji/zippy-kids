import { updateProfileImage } from "@/action/apiAction";
import { Profile } from "@/model/auth";
import React, { useState, useRef } from "react";

interface Props {
  userInfo: Profile;
  onProfileImageChange?: (imageFile: File) => void; // Optional callback for parent component
}

export default function LeftProfileSide(prop: Props) {
  const [profileImage, setProfileImage] = useState<string>(
    "https://storage.googleapis.com/a1aa/image/ba44c489-de91-426d-20e1-3e0d56e98f5f.jpg"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB.');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfileImage(e.target.result as string);
        setSelectedFile(file);
        setHasUnsavedChanges(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = async () => {
    if (!selectedFile) return;

    setIsSaving(true);

    try {
      // Call parent callback if provided
      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log("Form Data", formData);
      console.log("Selected File", selectedFile);
      await updateProfileImage(formData);

      if (prop.onProfileImageChange) {
        await prop.onProfileImageChange(selectedFile);
      }
      
      // Reset states after successful save
      setSelectedFile(null);
      setHasUnsavedChanges(false);
      
      // You could add a success notification here
      console.log('Profile image saved successfully');
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelChanges = () => {
    // Reset to original image
    setProfileImage("https://storage.googleapis.com/a1aa/image/ba44c489-de91-426d-20e1-3e0d56e98f5f.jpg");
    setSelectedFile(null);
    setHasUnsavedChanges(false);
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const copyProfileLink = () => {
    const profileUrl = `https://app.ahireground.com/profile/${prop.userInfo?.name?.toLowerCase().replace(/\s+/g, '')}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      // You could add a toast notification here
      console.log('Profile URL copied to clipboard');
    });
  };

  return (
    <aside className="">
      <div className="bg-white rounded-lg shadow-md w-full md:w-64 flex flex-col items-center pt-12 pb-8 px-6">
        {/* Profile Image Section */}
        <div className="relative group">
          <img
            alt={`Profile picture of ${prop.userInfo?.name}`}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:shadow-xl"
            src={profileImage}
            width="96"
            height="96"
          />
          
          {/* Edit Icon */}
          <button
            onClick={handleEditClick}
            disabled={isUploading}
            className="absolute -top-1 -right-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 border-2 border-white rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            title="Change profile picture"
          >
            {isUploading ? (
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg 
                className="w-3 h-3 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                />
              </svg>
            )}
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          
        </div>

        {/* Save/Cancel Buttons - Show only when there are unsaved changes */}
        {hasUnsavedChanges && (
          <div className="mt-4 flex gap-2 w-full">
            <button
              onClick={handleSaveImage}
              disabled={isSaving}
              className="flex-1 bg-[#ff9a5a] hover:bg-[#fc7827] disabled:bg-gray-400 text-white text-xs font-medium py-2 px-3 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:ring-offset-2 flex items-center justify-center gap-1"
            >
              {isSaving ? (
                <>
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </>
              )}
            </button>
            <button
              onClick={handleCancelChanges}
              disabled={isSaving}
              className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white text-xs font-medium py-2 px-3 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          </div>
        )}

        {/* User Info */}
        <div className="text-center mt-4 space-y-1">
          <h3 className="text-sm font-semibold text-[#1f2a56]">
            {prop.userInfo?.name || 'Unknown User'}
          </h3>
          <p className="text-xs text-gray-400">
            {prop.userInfo?.roles?.[0]?.toUpperCase() || 'NO ROLE ASSIGNED'}
          </p>
          <p className="text-xs text-gray-400 break-all">
            {prop.userInfo?.email || 'No email provided'}
          </p>
        </div>

  
        {/* <div className="mt-6 w-full space-y-3 text-xs text-gray-500">
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span>Opportunities applied</span>
            <span className="text-[#fbbf24] font-semibold">32</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span>Opportunities won</span>
            <span className="text-[#22c55e] font-semibold">26</span>
          </div>
          <div className="flex justify-between">
            <span>Current opportunities</span>
            <span className="text-gray-700 font-medium">6</span>
          </div>
        </div>

      
        <button
          className="mt-6 w-full border border-gray-200 rounded-md text-xs text-gray-500 py-2 px-4 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="button"
        >
          View Public Profile
        </button>

     
        <div
          className="mt-3 w-full border border-gray-200 rounded-md px-3 py-2 text-xs text-[#3b5dd8] truncate cursor-pointer select-text hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center justify-between group"
          title={`https://app.ahireground.com/profile/${prop.userInfo?.name?.toLowerCase().replace(/\s+/g, '')}`}
          onClick={copyProfileLink}
        >
          <span className="truncate">
            https://app.ahireground.com/profile/{prop.userInfo?.name?.toLowerCase().replace(/\s+/g, '')}
          </span>
          <svg 
            className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 flex-shrink-0 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
            />
          </svg>
        </div> */}
      </div>
    </aside>
  );
}