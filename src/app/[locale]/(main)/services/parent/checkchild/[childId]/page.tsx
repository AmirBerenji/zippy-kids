"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { checkChildId } from "@/action/parentApiAction";
import LoadingPage from "@/app/component/general/Loading";

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
      router.push(`/child/10`);
    }
  };

  useEffect(() => {
    isTagRegistered(childId);
  }, [childId]);

  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50"></div>
    );
  } else {
    return <LoadingPage />;
  }
}
