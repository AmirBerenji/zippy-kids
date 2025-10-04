"use client";

import { getNuresById } from "@/action/nurseApiAction";
import LoadingPage from "@/app/component/general/Loading";
import StarRating from "@/app/component/general/StarRating";
import { Nanny } from "@/model/nany";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NurseProfilePage() {
  const { id } = useParams();
  const [nurse, setNurse] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchNurseProfile = async () => {
      try {
        const response = await getNuresById(Number(id));
        console.log("NurseProfileResponse", response);
        setNurse(response);
      } catch (error) {
        console.error("Error fetching nurse profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNurseProfile();
  }, [id, mounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  if (loading) {
    return <LoadingPage />;
  }

  if (!nurse) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div
          className="text-xl font-semibold text-orange-300 bg-white 
                px-12   
                transform hover:scale-105 transition-transform duration-300"
        >
          <span className="flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Nurse not found
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <img
            src={
              "https://zippy.elrincondsabor.com/storage/app/public/" +
              nurse.user.photo
            }
            alt={nurse.translations[0].full_name}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">
            {nurse.translations[0].full_name}
          </h1>
          <p className="text-gray-600 mb-4">
            <StarRating rating={2.5} reviewCount={102} />
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Professional Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Experience</h3>
              <p className="text-gray-600">{nurse.years_experience}</p>
            </div>
            <div>
              <h3 className="font-medium">Specialization</h3>
              <p className="text-gray-600">
                {nurse.translations[0].specialization}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
