"use client";

import { useEffect, useState } from "react";
import Header from "../_components/Header";
import LeaveBox from "../_components/LeaveBox";
import UpcommingLeaves from "../_components/UpcommingLeaves";
import Modal from "../_components/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { calculateDays } from "../_lib/utilities"
import { useRouter } from "next/navigation";
import { User } from "@/app/types/user"
import { LeaveType, LeaveRequest } from "@/app/types/leave"


export default function LeaveTracker() {
    const [employee, setEmployee] = useState<User | null>(null);
    const [open, setopen] = useState<boolean>(false);
    const [fromDate, setFromDate] = useState<Date | null>(new Date());
    const [toDate, setToDate] = useState<Date | null>(new Date());
    const [leaveType, setLeaveType] = useState<LeaveType>("sickLeave");
    const [reason, setReason] = useState<string>("");
    const [upcomingLeaves, setUpcomingLeaves] = useState<LeaveRequest[]>([]);
    const [allUser, setAllUser] = useState<User[]>([]);
    const router = useRouter();
    useEffect(() => {

        const StoredUser = localStorage.getItem("currentuser");
        const user: User | null = StoredUser ? JSON.parse(StoredUser) : null;
        if (!user) {
            router.push("/auth/signin");
            return;
        }
        if (user.role != "employee") {
            router.push("/dashboardadmin");
            return;
        }
        setEmployee(user);

        const StoredAllUser = localStorage.getItem("users");
        const allUserdata: User[] | [] = StoredAllUser ? JSON.parse(StoredAllUser) : [];
        setAllUser(allUserdata);
    }, []);

    if (!employee) return null;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const currentuser = employee;
        if (!currentuser) {
            return;
        }
        // const currentuser:User | null = JSON.parse(localStorage.getItem("currentuser"));
        if (!fromDate || !toDate) {
            toast.error("Please select date range");
            return;
        }
        if (!reason) {
            toast.error("Please Enter Reason");
            return;
        } else if (reason.length < 3) {
            toast.warn("Please enter valid Reason");
            return;
        }

        const days = calculateDays(fromDate, toDate);

        if (!currentuser.leaveBalance || currentuser.leaveBalance.length === 0) {
            toast.error("Leave balance not available");
            return;
        }
        // find leave type index
        const leaveIndex = currentuser.leaveBalance.findIndex(
            (leave) => leave.leaveType === leaveType
        );

        if (leaveIndex === -1) {
            toast.error("Invalid leave type")
            return;
        }
        // console.log(leaveType);
        // console.log(currentuser.leaveBalance[leaveIndex])
        const availableBalance = currentuser.leaveBalance[leaveIndex].total - currentuser.leaveBalance[leaveIndex].used;
        const remainingBalance = availableBalance - days;
        // console.log(remainingBalance);
        // console.log(availableBalance);
        if (remainingBalance < 0) {

            toast.error("Insufficient leave balance")
            return;
        }

        currentuser.leaveBalance[leaveIndex].used += days;
        localStorage.setItem("currentuser", JSON.stringify(currentuser));

       
        const userIndex = allUser.findIndex((user) => user.email == currentuser.email)
        const tempAllUser = allUser;
        tempAllUser[userIndex] = currentuser;
        localStorage.setItem("users", JSON.stringify(tempAllUser));
        setAllUser(tempAllUser)
        setEmployee({ ...currentuser });

        if (!fromDate || !toDate) {
            toast.error("Please select valid dates");
            return
        }
        const leaveRequest: LeaveRequest = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            employeeName: currentuser.username,
            employeeEmail: currentuser.email,
            leaveType,
            fromDate,
            toDate,
            reason,
            status: "Pending",
            days
        };


        const StoredleavesRequests = localStorage.getItem("leaveRequests");
        const leavesRequests: LeaveRequest[] = StoredleavesRequests ? JSON.parse(StoredleavesRequests) : [];

        leavesRequests.push(leaveRequest);
        localStorage.setItem("leaveRequests", JSON.stringify(leavesRequests));
        setUpcomingLeaves(getUpcommingLeaves());
        toast.success("Leave Requested Successfully..");

        setLeaveType("sickLeave");
        setFromDate(new Date());
        setToDate(new Date());
        setReason("");
        setopen(false);
    }

    const getUpcommingLeaves = (): LeaveRequest[] => {
        const storedLeavesRequests = localStorage.getItem("leaveRequests");
        const allLeavesRequests: LeaveRequest[] = storedLeavesRequests ? JSON.parse(storedLeavesRequests) : [];
        const filterByUser = allLeavesRequests.filter((leave) => leave.employeeName == employee.username)
        // console.log(filterByUser);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingLeaves = filterByUser.filter(leave => {
            const fromDate = new Date(leave.fromDate);
            fromDate.setHours(0, 0, 0, 0);
            return fromDate >= today;
        });

        return upcomingLeaves;
    }

    return (
        <div className="min-h-screen bg-slate-800">
            <Header employee={employee} />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-4">
                    <LeaveBox leaveBalance={employee.leaveBalance ?? []} />

                    <button
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-lg font-semibold transition-colors shadow-lg"
                        onClick={() => setopen(true)}
                    >
                        Apply Leave
                    </button>
                </div>

                <div className="my-6">
                    <h2 className="font-semibold text-2xl sm:text-3xl py-3 text-blue-300">
                        Upcoming Leaves
                    </h2>
                    <UpcommingLeaves upcomingLeavesHandler={getUpcommingLeaves} upcomingLeaves={upcomingLeaves} setUpcomingLeaves={setUpcomingLeaves} />
                </div>
            </div>

            {open && (
                <Modal isOpen={open} onClose={() => setopen(false)}>
                    <div className="text-white">
                        <form onSubmit={handleSubmit} className="bg-slate-800 flex flex-col gap-5">
                            <h3 className="text-2xl font-bold text-blue-300 mb-4">Apply for Leave</h3>


                            <div className="flex flex-col gap-2">
                                <label htmlFor="leavetype" className="text-sm font-medium text-slate-300">
                                    Leave Type
                                </label>
                                <select
                                    name="leavetype"
                                    id="leavetype"
                                    required
                                    onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                                    className="bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="sickLeave">Sick Leave</option>
                                    <option value="casualLeave">Casual Leave</option>
                                    <option value="earnedLeave">Earned Leave</option>
                                </select>
                            </div>


                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-300">Date Range</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <DatePicker

                                        selected={fromDate}
                                        minDate={new Date()}
                                        onChange={(date: Date | null) => setFromDate(date)}
                                        className="bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholderText="From date"
                                    />
                                    <DatePicker

                                        selected={toDate}
                                        minDate={fromDate ? fromDate : undefined}
                                        onChange={(date: Date | null) => setToDate(date as Date)}
                                        className="bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholderText="To date"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="reason" className="text-sm font-medium text-slate-300">
                                    Reason
                                </label>
                                <input
                                    type="text"
                                    name="reason"
                                    onChange={(e) => setReason(e.target.value)}
                                    className="bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400"
                                    placeholder="Enter reason for leave"
                                />
                            </div>


                            <button
                                type="submit"
                                className=" cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors font-semibold shadow-lg mt-6"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>

    )
}