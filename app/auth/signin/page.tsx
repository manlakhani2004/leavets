"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { User } from "@/app/types/user";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import { Briefcase, Calendar, CheckCircle } from "lucide-react";


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });


  useEffect(() => {
    const storedUser = localStorage.getItem("currentuser");
    const currentUser: User | null = storedUser
      ? JSON.parse(storedUser)
      : null;

    if (currentUser) {
      if (currentUser.role === "admin") {
        router.push("/dashboardadmin");
      } else {
        router.push("/leavetracker");
      }
    }
  }, [router]);


  function onSubmit(data: LoginFormData) {
    const StoredAllUsers = localStorage.getItem("users");
    const users: User[] = StoredAllUsers ? JSON.parse(StoredAllUsers) : [];

    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      toast.error("Email or password incorrect!", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    localStorage.setItem("currentuser", JSON.stringify(user));
    toast.success("Login Successfully..");

    if (user.role === "admin") {
      redirect("/dashboardadmin");
    } else {
      redirect("/leavetracker");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center min-h-screen px-4 bg-slate-900">



        <div className="hidden lg:flex flex-col justify-center items-center flex-1 px-12 py-16">
          <div className="max-w-2xl w-full space-y-8">

            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold text-white mb-3 leading-tight">
                Welcome Back to
                LeaveTracker

              </h1>

              <p className="text-xl text-white/60 max-w-md mx-auto">
                Smart, simple, and secure leave management for your team
              </p>
            </div>


            <div className="flex justify-center items-stretch  pt-8">
              <div className="flex flex-col items-center text-center  rounded-2xl  flex-1 max-w-xs">
                <div className="mb-4 text-indigo-400">
                  <Calendar size={40} strokeWidth={1.5} />
                </div>
                <span className="text-sm  text-white/80">
                  Track leaves easily
                </span>
              </div>

              <div className="flex flex-col items-center text-center rounded-2xl  flex-1 max-w-xs">
                <div className="mb-4 text-indigo-400">
                  <CheckCircle size={40} strokeWidth={1.5} />
                </div>
                <span className="text-sm  text-white/80">
                  Instant approvals
                </span>
              </div>

              <div className="flex flex-col items-center text-center   flex-1 max-w-xs">
                <div className="mb-4 text-indigo-400">
                  <Briefcase size={40} strokeWidth={1.5} />
                </div>
                <span className="text-sm  text-white/80">
                  Manage teams
                </span>
              </div>
            </div>
          </div>
        </div>


        <div className="flex justify-center items-center flex-1 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full max-w-md mx-auto gap-5 p-8 bg-slate-800 rounded-2xl shadow-xl"
          >
            <h2 className="text-blue-300 font-bold text-2xl sm:text-3xl mb-2">
              Login
            </h2>

            <p className="text-slate-400 text-sm text-center mb-2">
              Sign in to access your LeaveTracker dashboard
            </p>

            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-sm w-full">
                {errors.email.message}
              </p>
            )}


            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none "
            />
            {errors.password && (
              <p className="text-red-400 text-sm w-full">
                {errors.password.message}
              </p>
            )}

            <button
              type="submit"

              className="w-full py-3 px-6 bg-blue-800 rounded-lg font-semibold text-white hover:bg-blue-600 transition-colors "
            >
              Log In
            </button>

            <Link href="/auth/signup" className="text-slate-400 text-sm">
              Don't have an account?{" "}
              <span className="text-blue-400">Sign up</span>
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
