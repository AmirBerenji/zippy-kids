"use client";

import { lockAdmin } from "@/action/adminAuthAction";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AdminLockButton({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const [isLocking, setLocking] = useState(false);

  const handleLock = async () => {
    setLocking(true);
    await lockAdmin();
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLock}
      disabled={isLocking}
      className={`inline-flex items-center gap-2 text-sm font-semibold disabled:opacity-60 transition ${className}`}
    >
      <LogOut className="w-4 h-4" />
      {isLocking ? "Locking…" : "Lock panel"}
    </button>
  );
}
