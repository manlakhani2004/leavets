
export type LeaveType = "sickLeave" | "casualLeave" | "earnedLeave";

export interface LeaveRequest{
      id: number,
      employeeName: string,
      leaveType: LeaveType,
      fromDate: Date,
      toDate: Date,
      days: number,
      reason: string,
      status: LeaveStatus
}

export type LeaveStatus = "Approved" | "Pending" | "Rejected";