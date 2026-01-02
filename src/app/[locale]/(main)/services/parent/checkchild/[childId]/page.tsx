"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { checkChildId } from "@/action/parentApiAction";

export default function CheckChildPage() {
  const params = useParams();
  const childId = params.childId as string;
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const isTagRegistered = async (id: string) => {
    var response = await checkChildId(id);
    setIsRegistered(response);
  };

  useEffect(() => {
    isTagRegistered(childId);
  }, [childId]);

  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Child Registered
          </h1>
          <p className="text-gray-700">
            The provided Child ID{" "}
            <span className="font-semibold">{childId}</span> is successfully
            registered in our system.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Child Not Registered
          </h1>
          <p className="text-gray-700">
            The provided Child ID{" "}
            <span className="font-semibold">{childId}</span> is not registered
            in our system.
          </p>
        </div>
      </div>
    );
  }
}
