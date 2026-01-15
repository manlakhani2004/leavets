import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Calendar, CheckCircle, Plus,
  Settings, FileText, Users,
  TrendingUp
} from 'lucide-react';
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave Tracker",
  icons:{
    icon:"./icon.png"
  }
};

export default function Page() {
    redirect("/auth/login")
  return (
    <div className="min-h-screen bg-slate-900 ">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-bold mb-6 leading-tight">Welcome to LeaveTracker</h1>
          <p className="text-2xl text-blue-200 mb-4">Efficient Leave Management System for Your Organization</p>
          <p className="text-lg text-blue-300 mb-8 max-w-3xl mx-auto">
            Streamline your organization's leave management with our comprehensive platform.
            Easy to use, powerful features, and complete transparency for both employees and administrators.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href={'/auth/signup'} className=" bg-indigo-900 hover:bg-indigo-800 px-8 py-4 rounded-2xl text-lg font-semibold  text-white  border-2 border-indigo-600 transition">
              Get Started Free
            </Link>


            <Link href={'/auth/login'} className="bg-cyan-600 hover:bg-cyan-700 px-8 py-4 rounded-2xl text-lg font-semibold text-white border-2  border-cyan-500  transition">
              Login to Dashboard
            </Link>


            <Link href={'/about'} className="bg-white/10 hover:bg-white/15 px-8 py-4 rounded-2xl text-lg font-semibold text-white  transition border-2 border-white/30">
              Learn More
            </Link>
          </div>
        </div>


        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800 backdrop-blur-lg p-8 rounded-xl text-white hover:bg-slate-700 transition">
            <Plus className="w-12 h-12 mb-4 " />
            <h3 className="text-xl font-bold mb-3">Easy Application</h3>
            <p className="text-blue-200">Apply for leave in seconds with our intuitive interface. Choose leave type, select dates, and submit instantly.</p>
          </div>
          <div className="bg-slate-800 backdrop-blur-lg p-8 rounded-xl text-white hover:bg-slate-700 transition">
            <CheckCircle className="w-12 h-12 mb-4 " />
            <h3 className="text-xl font-bold mb-3">Quick Approval</h3>
            <p className="text-blue-200">Streamlined approval workflow allows administrators to review and approve requests efficiently.</p>
          </div>
          <div className="bg-slate-800 backdrop-blur-lg p-8 rounded-xl text-white hover:bg-slate-700 transition">
            <Calendar className="w-12 h-12 mb-4 " />
            <h3 className="text-xl font-bold mb-3">Calendar View</h3>
            <p className="text-blue-200">Visual calendar to track all leaves at a glance. See who's away and plan accordingly.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <div className="bg-slate-800 backdrop-blur-lg p-8 rounded-xl text-white">
            <TrendingUp className="w-12 h-12 mb-4 " />
            <h3 className="text-xl font-bold mb-3">Real-Time Balance Tracking</h3>
            <p className="text-blue-200">
              Keep track of your leave balance in real-time. Know exactly how many sick, casual, and annual leave days you have remaining.
              Automated calculations ensure accuracy and transparency.
            </p>
          </div>
          <div className="bg-slate-800 backdrop-blur-lg p-8 rounded-xl text-white">
            <Users className="w-12 h-12 mb-4 " />
            <h3 className="text-xl font-bold mb-3">Employee Management</h3>
            <p className="text-blue-200">
              Comprehensive employee management tools for administrators. Approve registrations, manage employee status,
              and maintain complete control over your workforce.
            </p>
          </div>
          <div className="bg-slate-800 backdrop-blur-lg p-8 rounded-xl text-white">
            <Settings className="w-12 h-12 mb-4 " />
            <h3 className="text-xl font-bold mb-3">Customizable Policies</h3>
            <p className="text-blue-200">
              Define and modify leave policies according to your organization's needs. Set different allowances for sick leave,
              casual leave, annual leave, and unpaid leave.
            </p>
          </div>
          <div className="bg-slate-800 backdrop-blur-lg p-8 rounded-xl text-white">
            <FileText className="w-12 h-12 mb-4 " />
            <h3 className="text-xl font-bold mb-3">Detailed Reports</h3>
            <p className="text-blue-200">
              Generate comprehensive reports and analytics. Track leave patterns, monitor usage statistics,
              and make data-driven decisions for better workforce management.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center text-white">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-2">Register</h3>
              <p className="text-blue-200">Create your employee account in seconds</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-2">Apply</h3>
              <p className="text-blue-200">Submit leave request with just a few clicks</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-2">Approve</h3>
              <p className="text-blue-200">Admin reviews and approves instantly</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
              <h3 className="text-xl font-bold mb-2">Track</h3>
              <p className="text-blue-200">Monitor all leaves on calendar view</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 from-green-600 to-blue-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join hundreds of organizations using LeaveTracker to manage their workforce efficiently
          </p>
          <Link href="/auth/signup" className="bg-white text-blue-900 px-10 py-4 rounded-lg text-lg font-bold hover:bg-blue-50 transition shadow-lg">
            Create Your Account Now
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}