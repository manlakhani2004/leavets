"use client";

import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbUsersPlus } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";

interface SidebarProps {
  currentTab: string;
  setcurrentTab: (tab: string) => void;
}

export default function Sidebar({ currentTab, setcurrentTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleSignOut() {
    localStorage.removeItem("currentuser");
    toast.success("Log Out Successfully");
    router.push("/auth/signin");
  }

  function changeTab(tab: string) {
    setcurrentTab(tab);
    setIsOpen(false); 
  }

  return (
    <>

      <button
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-md"
      >
        <AiOutlineMenu/>
      </button>

      <div
        className={`fixed sm:relative top-0 left-0 z-40  h-screen w-60
      bg-slate-950 border-r border-slate-700
        p-4 flex flex-col gap-4
        transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        <p className="font-bold text-3xl text-center text-blue-300 mb-4">
          Admin Dashboard
        </p>

        <Link href="/dashboardadmin" className="w-full">
          <button
            onClick={() => changeTab("LeaveRequests")}
            className={`w-full flex items-center gap-2 p-3 rounded-lg text-white
        ${currentTab === "LeaveRequests"
                ? "bg-blue-600"
                : "hover:bg-slate-800"}`}
          >
            <MdAccessTime className="text-2xl" />
            Leave Requests
          </button>
        </Link>

        <Link href="/dashboardadmin/employees" className="w-full">
          <button
            onClick={() => changeTab("employees")}
            className={`w-full flex items-center gap-2 p-3 rounded-lg text-white
        ${currentTab === "employees"
                ? "bg-blue-600"
                : "hover:bg-slate-800"}`}
          >
            <TbUsersPlus className="text-2xl" />
            Employees
          </button>
        </Link>

        <Link href="/dashboardadmin/leaveTypes" className="w-full">
          <button
            onClick={() => changeTab("leavetypes")}
            className={`w-full flex items-center gap-2 p-3 rounded-lg text-white
        ${currentTab === "leavetypes"
                ? "bg-blue-600"
                : "hover:bg-slate-800"}`}
          >
            <IoNewspaperOutline className="text-2xl" />
            Leave Types
          </button>
        </Link>

        <Link href="/dashboardadmin/profile" className="w-full">
          <button
            onClick={() => changeTab("profile")}
            className={`w-full flex items-center gap-2 p-3 rounded-lg text-white
        ${currentTab === "profile"
                ? "bg-blue-600"
                : "hover:bg-slate-800"}`}
          >
            <CgProfile className="text-2xl" />
            Profile
          </button>
        </Link>

        <button
          onClick={handleSignOut}
          className="mt-auto w-full flex items-center gap-2 p-3 rounded-lg
               text-white cursor-pointer bg-red-600 transition-colors"
        >
          <FaSignOutAlt className="text-2xl" />
          Log Out
        </button>
      </div>


      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
        />
      )}
    </>
  );
}
