"use client";
import { IoCloseSharp } from "react-icons/io5";
import {ModalProps} from "@/app/types/props"

export default function Modal({ isOpen, onClose, children }:ModalProps) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0  bg-black/70 flex items-center justify-center z-50 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-slate-800 rounded-xl p-8 relative w-full max-w-md shadow-2xl border border-slate-700">
        
        <button
          onClick={onClose}
          className=" absolute top-4 right-3
          cursor-pointer font-semibold
    flex items-center justify-center
    w-9 h-9
    rounded-lg
    bg-slate-700/70
    text-slate-300
    hover:bg-red-500
    hover:text-white
    transition-all duration-200"
        >
         <IoCloseSharp />
        </button>

        {children}
      </div>
    </div>
  );
}