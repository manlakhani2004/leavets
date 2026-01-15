
import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { User } from "@/app/types/user"
import Link from "next/link";
import Image from "next/image";

export default function Header({ employee }: { employee: User }) {
    function handleSignOut() {
        // localStorage.getItem("currentuser");
        localStorage.removeItem("currentuser");
        toast.success("Log Out Successfully");
        redirect('/auth/signin');
    }
    return (
        <div className="bg-slate-900 text-white w-full flex justify-between items-center px-6 sm:px-10 py-2 shadow-lg border-b border-slate-700">
            <div>
                <Link href="/" className="text-2xl  font-bold flex  items-center gap-3 text-indigo-500">
                    <Image src={'/leavetracker.png'} height={50} width={50} alt="Leave Tracker" />
                    <p>Leave Tracker</p>
                </Link>

            </div>

            <div className="flex items-center gap-3 sm:gap-4  px-4 py-2 rounded-lg">
                <div className="text-lg sm:text-xl  bg-slate-600 p-2 rounded-full">
                    <FaUser />
                </div>
                <div className="text-xs sm:text-sm">
                    <p className="font-medium text-white">{employee.username}</p>
                    <p className="text-slate-400">{employee.email}</p>
                </div>

                <div className="relative group">
                    <div className=" ml-4 text-3xl cursor-pointer" onClick={() => handleSignOut()}>
                        <FaSignOutAlt />
                    </div>
                    <div className="absolute  left-1/2 transform -translate-x-1/2 mt-3 ml-2 font-semibold ml hidden group-hover:block px-4  py-2 text-sm text-white bg-red-500 rounded shadow-lg whitespace-nowrap">
                        LogOut
                    </div>
                </div>
            </div>

        </div>
    );
}