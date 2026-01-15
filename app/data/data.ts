export const leaveBalance = [
  {
    name: "Sick Leave",
    description: "Leave for medical emergencies",
    leaveType: "sickLeave",
    total: 8,
    used: 0
  },
  {
    name: "Casual Leave",
    description: "Leave for personal matters",
    leaveType: "casualLeave",
    total: 10,
    used: 0
  },
  {
    name: "Earned Leave",
    description: "Leave earned through work",
    leaveType: "earnedLeave",
    total: 10,
    used: 0
  },
]

export const leavePolicies = [
  {
    id: "SL",
    name: "Sick Leave Policy",
    description: "Sick leave for medical emergencies",
    daysAllowed: 10,
    paid: true,
  },
  {
    id: "CL",
    name: "Casual Leave Policy",
    description: "Casual leave for personal matters",
    daysAllowed: 12,
    paid: true,
  },
  {
    id: "AL",
    name: "Annual Leave Policy",
    description: "Annual vacation leave",
    daysAllowed: 20,
    paid: true,
  },
  {
    id: "UL",
    name: "Unpaid Leave Policy",
    description: "Unpaid leave without salary",
    daysAllowed: 999,
    paid: false,
  },
];




export const upcomingLeaves = [
  {
    id: 1,
    leaveType: "Casual Leave",
    period: "10 Mar 2025 - 11 Mar 2025",
    days: 2,
    reason: "Family function",
    status: "Approved",
  },
  {
    id: 2,
    leaveType: "Sick Leave",
    period: "18 Mar 2025 - 18 Mar 2025",
    days: 1,
    reason: "Doctor appointment",
    status: "Pending",
  }
];


export const leaveRequests = [
  {
    id: 1,
    employeeName: "Rahul Sharma",
    leaveType: "Sick Leave",
    fromDate: "2025-01-10",
    toDate: "2025-01-12",
    days: 3,
    reason: "Fever",
    status: "Pending",
  },
  {
    id: 2,
    employeeName: "Anita Verma",
    leaveType: "Casual Leave",
    fromDate: "2025-01-15",
    toDate: "2025-01-15",
    days: 1,
    reason: "Personal work",
    status: "Approved",
  },
  {
    id: 3,
    employeeName: "Suresh Kumar",
    leaveType: "Earned Leave",
    fromDate: "2025-01-20",
    toDate: "2025-01-25",
    days: 6,
    reason: "Family function",
    status: "Rejected",
  }
];


export const AdminSidebar = [
  {
    name: "Dashboard"
  },
  {
    name: "Logout"
  }
]
