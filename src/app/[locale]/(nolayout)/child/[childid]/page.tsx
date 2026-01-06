"use client";
import React from "react";
import { Phone, MapPin, Droplets, User } from "lucide-react";

const ProfilePage = () => {
  // Sample Data
  const user = {
    firstName: "John",
    lastName: "Doe",
    age: 28,
    phone: "(555) 012-3456",
    address: "123 Maple Street, Springfield, IL 62704",
    bloodType: "O+",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center items-start">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl">
        {/* Header Section */}
        <div className="bg-orange-400 p-6 text-[#2f3e4e]  flex flex-col items-center md:flex-row md:space-x-6">
          <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center border-4 border-slate-700 mb-4 md:mb-0">
            <User size={48} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Personal Info */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Age
              </label>
              <p className="text-lg font-medium text-gray-900">
                {user.age} Years
              </p>
            </div>
          </div>

          {/* Column 2: Vitals & Contact */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Phone className="text-blue-500 mt-1" size={20} />
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Phone
                </label>
                <p className="text-lg font-medium text-blue-600 cursor-pointer hover:underline">
                  {user.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="text-gray-400 mt-1" size={20} />
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Address
                </label>
                <p className="text-gray-700 leading-relaxed">{user.address}</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplets className="text-red-600" size={24} />
                <span className="font-bold text-red-900">BLOOD TYPE</span>
              </div>
              <span className="text-2xl font-black text-red-600">
                {user.bloodType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
