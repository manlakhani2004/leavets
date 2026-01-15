
export type LeaveType = string;

export interface LeaveRequest{
      id: number,
      employeeName: string,
      employeeEmail:string,
      leaveType: LeaveType,
      fromDate: Date,
      toDate: Date,
      days: number,
      reason: string,
      status: LeaveStatus
}

export type LeaveStatus = "Approved" | "Pending" | "Rejected";