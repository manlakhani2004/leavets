import {LeaveRequest} from "@/app/types/leave"
import { Dispatch, ReactNode, SetStateAction} from "react";

export interface UpcommingLeavesProps{
  upcomingLeavesHandler:()=>LeaveRequest[],
  upcomingLeaves:LeaveRequest[],
  setUpcomingLeaves:Dispatch<SetStateAction<LeaveRequest[]>>
}

export interface ModalProps {
  isOpen:boolean,
  onClose:()=>void,
  children:ReactNode
}