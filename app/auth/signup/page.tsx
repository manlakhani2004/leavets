"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { leaveBalance } from "../../data/data";
import { User, LeaveBalance } from "@/app/types/user";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password should be same",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function Page() {
  const defaultLeaveBalance = leaveBalance as LeaveBalance[];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });


  function onSubmit(data: SignUpFormData) {
    const StoredAllUsers = localStorage.getItem("users");
    let users: User[] = StoredAllUsers ? JSON.parse(StoredAllUsers) : [];

    const userExists = users.find((user) => user.email === data.email);
    if (userExists) {
      toast.warn("Admin Already Exists..");
      return;
    }

    const newUser: User = {
      id: nanoid(),
      role: "admin",
      leaveBalance: defaultLeaveBalance,
      ...data,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Admin Created Successfully...");
    redirect("/auth/login");
  }

  return (
    <div>
      <Navbar/>
    <div className="flex flex-col lg:flex-row items-center min-h-screen px-4 bg-slate-900">
      <div className="hidden lg:flex flex-col justify-center items-center flex-1 px-12">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-4 text-center leading-tight">
          Welcome to LeaveTracker
        </h1>

        <p className="text-lg text-white/70 mb-8 text-center max-w-md">
          LeaveTracker helps organizations manage employee leaves efficiently
          and transparently.
        </p>

        <p className="text-lg text-rose-300 mb-8 text-center max-w-md">
          Only Admin or HR can create employee accounts.
        </p>
      </div>

      <div className="flex justify-center items-center flex-1 w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full max-w-md mx-auto gap-5 p-8 bg-slate-800 rounded-2xl shadow-xl"
        >
          <h2 className="text-blue-300 font-bold text-2xl sm:text-3xl ">
            Create Account
          </h2>

          <p className="text-red-400 text-md text-center mb-2">
            Only Admin accounts Creation is allowed here.
          </p>

          <input
            {...register("username")}
            placeholder="Username"
            className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
          />
          {errors.username && (
            <p className="text-red-400 text-sm w-full">
              {errors.username.message}
            </p>
          )}


          <input
            {...register("email")}
            placeholder="Email"
            className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
          />
          {errors.email && (
            <p className="text-red-400 text-sm w-full">
              {errors.email.message}
            </p>
          )}

    
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
          />
          {errors.password && (
            <p className="text-red-400 text-sm w-full">
              {errors.password.message}
            </p>
          )}

          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm w-full">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"  
            className="w-full cursor-pointer py-3 px-6 bg-blue-800 rounded-lg font-semibold text-white hover:bg-blue-700 transition-colors "
          >
            Create Account
          </button>

          <Link href="/auth/login" className="text-slate-400 text-sm">
            Already have an account?{" "}
            <span className="text-blue-400">Login</span>
          </Link>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
