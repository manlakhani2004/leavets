"use client"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LeaveRequest } from "@/app/types/leave"
import { User } from "../types/user";
import { number } from "zod";
import { required } from "zod/v4-mini";
export default function LeaveList() {


  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [PendingLeavessList, setPendingLeavesList] = useState<LeaveRequest[]>([]);
  const [allUser, setAllUser] = useState<User[]>([]);
  useEffect(() => {
    const StoredLeaveRequests = localStorage.getItem("leaveRequests")
    const leavRes = StoredLeaveRequests ? JSON.parse(StoredLeaveRequests) : []
    const StoredUser = localStorage.getItem("users");
    const Users = StoredUser ? JSON.parse(StoredUser) : []
    setAllUser(Users)
    setLeaveRequests(leavRes)
    PendingLeaves(leavRes);
  }, [])
  if (!leaveRequests) {
    return null;
  }

  function PendingLeaves(leaveRequests: LeaveRequest[]) {
    setPendingLeavesList(leaveRequests.filter((leave) => leave.status == "Pending"));
  }

  function handleLeaveAprove(id: number) {

    const notRequested = leaveRequests.filter((leave) => leave.id !== id)
    const Requseted = leaveRequests.filter((leave) => leave.id == id)
    Requseted[0].status = "Approved";
    // console.log(Requseted);
    notRequested.push(Requseted[0]);
    // console.log(notRequested);
    setLeaveRequests(notRequested);
    localStorage.setItem("leaveRequests", JSON.stringify(notRequested));
    toast.success("Leave Approved Successfully...")
  }
  // function handleLeaveReject(id: number) {


  //   // console.log(Requseted);
  //   notRequested.push(Requseted[0]);
  //   // console.log(notRequested);
  //   // setLeaveRequests(notRequested);
  //   // localStorage.setItem("leaveRequests", JSON.stringify(notRequested));
  //   toast.success("Leave Rejected Successfully...")
  // }

  function handleLeaveReject(id: number) {
    const notRequested = leaveRequests.filter((leave) => leave.id !== id);
    const requested = leaveRequests.find((leave) => leave.id === id);

    if (!requested) {
      toast.error("Leave request not found");
      return;
    }
    requested.status = "Rejected";
    const employee = allUser.find(
      (emp) => emp.email === requested.employeeEmail
    );
    const empIndex = allUser.findIndex((emp)=>emp.email == requested.employeeEmail);
    // const otherEmployees = allUser.filter((emp)=>emp.email === requested.employeeEmail);

    if (!employee) {
      toast.error("Employee not found");
      return;
    }

    if (!employee.leaveBalance) {
      toast.error("Employee leave balance not found");
      return;
    }

    const leaveTypeIndex = employee.leaveBalance.findIndex(
      (type) => type.leaveType === requested.leaveType
    );

    if (leaveTypeIndex === -1) {
      toast.error("Leave type not found");
      return;
    }

    employee.leaveBalance[leaveTypeIndex].used -= requested.days;
    allUser[empIndex]= employee
    
    notRequested.push(requested);
    setLeaveRequests(notRequested);
    localStorage.setItem("leaveRequests", JSON.stringify(notRequested));
    localStorage.setItem("users", JSON.stringify(allUser));
    // console.log("users",allUser);
    // console.log("leave request",leaveRequests);
    toast.success("Leave Rejected Successfully...");
  }
  return (
    <div>

      <h1 className="mt-4 sm:mt-6 text-lg sm:text-2xl text-gray-200 font-semibold">
        Pending Approvals ({PendingLeavessList.length})
      </h1>

      <div className="mt-2 bg-slate-800 rounded-2xl  shadow-xl border border-slate-700 overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm sm:text-base">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="text-left px-3 sm:px-4 py-3 sm:py-4 font-semibold text-blue-300">
                Leave Requests
              </th>
              <th className="text-left px-3 sm:px-4 py-3 sm:py-4 font-semibold text-blue-300">
                Status
              </th>
              <th className="text-left px-3 sm:px-4 py-3 sm:py-4 font-semibold text-blue-300">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {
              PendingLeavessList.length > 0 ? (
                PendingLeavessList.map((leave) => (
                  <tr
                    key={leave.id}
                    className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <div className="font-medium text-white text-sm sm:text-base">
                        {leave.employeeName} is Requesting {leave.leaveType} from{" "}
                        {new Date(leave.fromDate).toLocaleDateString()} to{" "}
                        {new Date(leave.toDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400 mt-1">
                        {leave.days} days for {leave.reason}
                      </div>
                    </td>

                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <span
                        className={`px-2 sm:px-3 uppercase py-1 text-xs rounded-full font-semibold
                  ${leave.status === "Approved"
                            ? "text-green-400 border border-green-500/50"
                            : leave.status === "Rejected"
                              ? "text-red-400 border border-red-500/50"
                              : "text-yellow-400 border border-yellow-500/50"
                          }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      {leave.status === "Pending" && (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleLeaveAprove(leave.id)}
                            className="text-xs sm:text-sm rounded-2xl border-2 border-green-700 hover:bg-green-400 hover:text-gray-800 transition-all font-semibold text-gray-300 py-1.5 sm:py-2 px-3"

                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleLeaveReject(leave.id)}
                            className="text-xs sm:text-sm rounded-2xl border-2 border-red-400 hover:bg-red-500 text-gray-300  font-semibold py-1.5 sm:py-2 px-4"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    <h2 className="text-gray-200 text-lg">
                      No pending leaves available
                    </h2>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>


      <h1 className="mt-6 text-lg sm:text-2xl text-gray-200 font-semibold">
        All Leaves ({leaveRequests.length})
      </h1>

      <div className="mt-2 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm sm:text-base">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="text-left px-3 sm:px-4 py-3 sm:py-4 font-semibold text-blue-300">
                Leave Requests
              </th>
              <th className="text-left px-3 sm:px-4 py-3 sm:py-4 font-semibold text-blue-300">
                Status
              </th>
              <th className="text-left px-3 sm:px-4 py-3 sm:py-4 font-semibold text-blue-300">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {
              leaveRequests.length > 0 ? (
                leaveRequests.map((leave) => (
                  <tr
                    key={leave.id}
                    className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <div className="font-medium text-white text-sm sm:text-base">
                        {leave.employeeName} is Requesting {leave.leaveType} from{" "}
                        {new Date(leave.fromDate).toLocaleDateString()} to{" "}
                        {new Date(leave.toDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400 mt-1">
                        {leave.days} days for {leave.reason}
                      </div>
                    </td>

                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <span
                        className={`px-2 sm:px-3 uppercase py-1 text-xs rounded-full font-semibold
                  ${leave.status === "Approved"
                            ? "text-green-400 border border-green-500/50"
                            : leave.status === "Rejected"
                              ? "text-red-400 border border-red-500/50"
                              : "text-yellow-400 border border-yellow-500/50"
                          }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      {leave.status === "Pending" && (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleLeaveAprove(leave.id)}
                            className="text-xs sm:text-sm rounded-2xl border-2 border-green-700 hover:bg-green-400 hover:text-gray-800 transition-all font-semibold text-gray-300 py-1.5 sm:py-2 px-3"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleLeaveReject(leave.id)}
                            className="text-xs sm:text-sm rounded-2xl border-2 border-red-400 hover:bg-red-500 text-gray-300  font-semibold py-1.5 sm:py-2 px-4"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    <h2 className="text-gray-200 text-lg">
                      No leaves available
                    </h2>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>


  )
}