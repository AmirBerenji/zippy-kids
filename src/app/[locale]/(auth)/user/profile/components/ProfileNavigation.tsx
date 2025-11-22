import { Profile } from "@/model/auth";
import React from "react";

interface Props {
  userInfo: Profile;
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export default function ProfileNavigation({
  userInfo,
  activeTab,
  onChangeTab,
}: Props) {
  const tabs =
    userInfo?.roles == "parent"
      ? [{ key: "account", label: "Account Settings" }]
      : userInfo?.roles == "nurse"
      ? [
          { key: "account", label: "Wesite Account Setting" },
          { key: "technicalInfo", label: "Nurse Information" },
          // { key: "documents", label: "Documents" },
          // { key: "billing", label: "Billing" },
          // { key: "notifications", label: "Notifications" },
        ]
      : userInfo?.roles == "doctor" ?
      [
          { key: "account", label: "Wesite Account Setting" },
          { key: "doctortechnicalInfo", label: "Doctor Information" },
          // { key: "documents", label: "Documents" },
          // { key: "billing", label: "Billing" },
          // { key: "notifications", label: "Notifications" },
      ]:[];

  return (
    <nav className="flex flex-wrap border-b border-gray-200 text-xs text-gray-400 mb-6 select-none">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`mr-4 mb-2 pb-2 transition-colors ${
            activeTab === tab.key
              ? "border-b-2 text-[#ff9a5a] text-[#ff9a5a] font-semibold"
              : "hover:text-[#ff9a5a]"
          }`}
          onClick={() => onChangeTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
