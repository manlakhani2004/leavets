export interface User {
    id?:string,
    username: string,
    email: string,
    password: string,
    role: "admin" | "employee",
    leaveBalance?: LeaveBalance[],
    confirmPassword?:string
}
export interface LeaveBalance {
    name: string,
    description: string,
    leaveType: string;
    total: number,
    used: number
}

