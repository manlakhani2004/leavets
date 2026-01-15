"use client";

import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import {User,
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { User as UserSchema } from "../types/user";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser,setCurrentUser] = useState<UserSchema | null>(null);
  const router = useRouter();
  useEffect(()=>{
    const storedUser = localStorage.getItem("currentuser");
    const user = storedUser ? JSON.parse(storedUser):null
    setCurrentUser(user);
  },[])

   function HandleLogout()
  {
    localStorage.removeItem("currentuser"); 
    router.push('/auth/signin');
    setCurrentUser(null);
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 py-1 border-b border-white/10 text-white">
      <div className="max-w-[90%] mx-auto px-6  h-16 flex items-center justify-between relative">

        <Link href="/" className="text-2xl font-bold flex  items-center gap-3 text-indigo-500">
          <Image src={'/leavetracker.png'} height={50} width={50} alt="Leave Tracker"/>
          <p>Leave Tracker</p>
        </Link>

     
        {/* <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8">
          <Link href="/" className="hover:text-indigo-400">Home</Link>
          <Link href="/about" className="hover:text-indigo-400">Why Us</Link>
          <Link href="/contactus" className="hover:text-indigo-400">Contact Us</Link>
        </div> */}

        
        <div className="hidden md:flex items-center gap-4">
          {!currentUser ? (
            <>
              <Link
                href="/auth/signup"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
              <Link
                href="/auth/signin"
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
              >
                Sign In
              </Link>
            </>
          ) : (
            <div className="relative">
            
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
                  <User size={18} />
                </div>

                <div className="text-left leading-tight hidden sm:block">
                  <p className="text-sm font-medium">{currentUser?.username}</p>
                  <p className="text-xs text-white/60">{currentUser.email}</p>
                </div>

                <ChevronDown size={16} className="text-white/70" />
              </button>

              
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-slate-800 rounded-lg border border-white/10 shadow-lg">
                  <Link
                    href={`${(currentUser.role=="admin")?"/admindashboard":"/leavetracker"}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-700 transition"
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>

                  <button onClick={()=>HandleLogout()} className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-slate-700 transition">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AiOutlineMenu/>
        </button>
      </div>

 
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-slate-900 border-t border-white/10">
          {/* <Link href="/" className="block">Home</Link>
          <Link href="/about" className="block">Why Us</Link>
          <Link href="/contactus" className="block">Contact Us</Link> */}

          {!currentUser ? (
            <div className=" flex items-center flex-col gap-3 pt-3 ">
              <Link href="/auth/signup" className="block bg-slate-800 text-gray-200 w-full text-center py-2 rounded-lg ">Sign Up</Link>
              <Link href="/auth/signin" className="block bg-slate-800 text-gray-200 w-full text-center py-2 rounded-lg ">Sign In</Link>
            </div>
          ) : (
            <>
              <Link href={`${(currentUser.role=="admin")?"/dashboardadmin":"/leavetracker"}`} className="block">Dashboard</Link>
              <button className="block cursor-pointer text-left w-full" onClick={()=>HandleLogout()}>Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
