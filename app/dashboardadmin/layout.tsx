"use client";
import { useState } from "react";
import Sidebar from "../_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTab, setCurrentTab] = useState("LeaveRequests");

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">

      <Sidebar currentTab={currentTab} setcurrentTab={setCurrentTab} />

      <main
        className="
          flex-1 overflow-y-auto
          p-4 sm:p-6
          pt-16 sm:pt-6
        "
      >
        {children}
      </main>
    </div>
  );
}
