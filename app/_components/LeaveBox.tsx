import { FcLeave } from "react-icons/fc";
import { LeaveBalance} from "@/app/types/user"
import { TbSunset2 } from "react-icons/tb";

export default function LeaveBox({ leaveBalance }:{leaveBalance:LeaveBalance[]}) {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-6">
      {leaveBalance.map((leave) => {
        
        return (
          <div
            key={leave.leaveType}
            className="flex-1 min-w-[200px] bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 flex flex-col items-center justify-center gap-3 shadow-lg  transition-colors"
          >
            <p className="text-blue-300 font-semibold text-lg capitalize">
              {leave.leaveType.replace(/([A-Z])/g, ' $1').trim()}
            </p>
            <p className=" text-3xl rounded-xl text-rose-300 p-2 bg-rose-500/10 border border-rose-400/30 backdrop-blur-sm">
             <TbSunset2 />
            </p>
            <p className="text-white font-medium">
              {leave.total} days available
            </p>
            <p className="text-slate-400 text-sm">
              {leave.used} days taken
            </p>
          </div>
        );
      })}
    </div>
  );
}
