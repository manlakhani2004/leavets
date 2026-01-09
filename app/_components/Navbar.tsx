"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User,
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isLoggedIn = false;

  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

        <Link href="/" className="text-xl font-bold text-indigo-500">
          LeaveTracker
        </Link>

     
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8">
          <Link href="/" className="hover:text-indigo-400">Home</Link>
          <Link href="/about" className="hover:text-indigo-400">Why Us</Link>
          {/* <Link href="/contactus" className="hover:text-indigo-400">Contact Us</Link> */}
        </div>

        
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/auth/signup"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
              <Link
                href="/auth/login"
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
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-white/60">{user.email}</p>
                </div>

                <ChevronDown size={16} className="text-white/70" />
              </button>

              
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-slate-800 rounded-lg border border-white/10 shadow-lg">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-700 transition"
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>

                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-700 transition">
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
          ☰
        </button>
      </div>

 
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-slate-900 border-t border-white/10">
          <Link href="/" className="block">Home</Link>
          <Link href="/about" className="block">Why Us</Link>
          {/* <Link href="/contactus" className="block">Contact Us</Link> */}

          {!isLoggedIn ? (
            <>
              <Link href="/signup" className="block text-indigo-400">Sign Up</Link>
              <Link href="/signin" className="block text-indigo-400">Sign In</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="block">Dashboard</Link>
              <button className="block text-left w-full">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
