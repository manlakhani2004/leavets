"use client";
import { useRouter } from "next/navigation";
import LeaveList from "../_components/LeaveList";
import { useEffect } from "react";
import {User} from "@/app/types/user"

export default function page() {
   const router = useRouter();
   useEffect(() => {

      const storedUser = localStorage.getItem("currentuser");
      const user: User | null = storedUser ? JSON.parse(storedUser) : null
      if (!user) {
         router.push("/auth/signin");
         return;
      }
      if (user.role != "admin") {
         router.push("/leavetracker");
      }
   }, [router])
   return (<div className=" w-full ">
      <div>
         <h2 className=" font-semibold  text-4xl ">Leave Requests Management</h2>
      </div>
      <LeaveList />
   </div>)
}