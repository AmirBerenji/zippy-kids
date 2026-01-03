"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { checkChildId } from "@/action/parentApiAction";

export default function CheckChildPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.childId as string;
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const isTagRegistered = async (id: string) => {
    var response = await checkChildId(id);
    console.log("response check tag", response);
    if (response === false) {
      router.push(`/user/signup/parent`);
      return;
    } else {
      setIsRegistered(response);
    }
  };

  useEffect(() => {
    isTagRegistered(childId);
  }, [childId]);

  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        Register
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        not register
      </div>
    );
  }
}
