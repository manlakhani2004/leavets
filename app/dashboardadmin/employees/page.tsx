"use client"
import React, { useEffect, useState } from 'react'
import Modal from '../../_components/Modal';
import { toast } from 'react-toastify';
import { LeaveBalance, User } from '../../types/user';
import { leaveBalance } from '../../data/data';
import { nanoid } from "nanoid";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const employeeSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

function page() {
  const [open, setopen] = React.useState<boolean>(false);
  const defaultLeaveBalance = leaveBalance as LeaveBalance[];
  const [employees, setEmployees] = useState<User[]>([]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [allUser, setAllUser] = useState<User[]>([]);
  const [employeeToDelete, setEmployeeToDelete] = useState<User | null>(null);

  const [editInfo, setEditInfo] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const StoredAllUsers = localStorage.getItem("users");
    const users: User[] = StoredAllUsers ? JSON.parse(StoredAllUsers) : [];

    setAllUser(users);
    setEmployees(users.filter((u) => u.role === "employee"));
  }, [open, openDelete]);



  function handleCreateEmployee(data: EmployeeFormData) {
    const employeeData: User = {
      id: nanoid(),
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: "employee",
      leaveBalance: defaultLeaveBalance
    };

    const StoredAllUsers = localStorage.getItem("users");
    let users: User[] = StoredAllUsers ? JSON.parse(StoredAllUsers) : [];

    const user = users.find((user) => user.email == employeeData.email);
    if (user) {
      toast.warn("Employee Already Exits..")
      return;
    }

    users.push(employeeData);
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Employee Created Succesfully...")
    reset();
    setopen(false);
  }

  const openEditModal = (user: User) => {
    if (!user) return;

    setEditInfo({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });

    setOpenEdit(true);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault();

    if (!allUser) return;

    const userIndex = allUser.findIndex(
      (u) => u.email === editInfo.email
    );

    if (userIndex === -1) {
      toast.error("User not found");
      return;
    }

    const updatedUser: User = {
      ...allUser[userIndex],
      username: editInfo.username,
      password: editInfo.password,
    };

    const updatedUsers = [...allUser];
    updatedUsers[userIndex] = updatedUser;

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setAllUser(updatedUsers);
    toast.success("Profile updated successfully");
    setOpenEdit(false);
  };

  const openDeleteModal = (employee: User) => {
    setEmployeeToDelete(employee);
    setOpenDelete(true);
  };

  const confirmDeleteEmployee = () => {
    if (!employeeToDelete || !allUser) {
      toast.error("Employee Not Found");
      return;
    }

    const user = allUser.find((emp) => emp.email === employeeToDelete.email);
    if (!user) {
      toast.error("Something went wrong during delete employee");
      return;
    }

    const updatedUser = allUser.filter((emp) => emp.email !== employeeToDelete.email);
    localStorage.setItem("users", JSON.stringify(updatedUser));
    setAllUser(updatedUser);
    setOpenDelete(false);
    setEmployeeToDelete(null);
    toast.success("Employee deleted successfully");
  };

  return (
    <div>
      <div className='mt-4 flex justify-between items-center text-gray-200'>
        <h1 className='text-3xl font-semibold'>ManageEmployees</h1>
        <button
          className="cursor-pointer font-semibold bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-lg"
          onClick={() => setopen(true)}
        >
          Create Employee
        </button>
      </div>

      {open && (
        <Modal isOpen={open} onClose={() => setopen(false)}>
          <div className="flex justify-center items-center flex-1 w-full">
            <form
              onSubmit={handleSubmit(handleCreateEmployee)}
              className="flex flex-col items-center w-full max-w-md mx-auto gap-4 p-4 bg-slate-800 rounded-2xl "
            >
              <h2 className="text-blue-300 font-bold text-2xl sm:text-3xl mb-2">
                Create Employee Account
              </h2>

              <input
                type="text"
                placeholder="Username"
                {...register("username")}
                className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white"
              />
              {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}

              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white"
              />
              {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
              )}

              <button
                type="submit"
                className="w-full cursor-pointer py-3 px-6 bg-blue-500 rounded-lg font-semibold text-white hover:bg-blue-600 transition-colors"
              >
                Create Account
              </button>
            </form>
          </div>
        </Modal>
      )}

      {openEdit && (
        <Modal isOpen={openEdit} onClose={() => setOpenEdit(false)}>
          <form
            onSubmit={handleEditProfile}
            className="p-4 bg-slate-800 rounded-xl flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold text-blue-300">
              Edit Employee
            </h2>

            <div className="flex gap-2 items-center">
              <label htmlFor="username">Name:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={editInfo.username}
                onChange={onChangeHandler}
                className="py-3 ml-4 w-full px-4 bg-slate-700 text-white rounded-lg"
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={editInfo.email}
                disabled
                className="py-3 ml-5 px-4 w-full bg-red-500 text-white rounded-lg"
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="password">Password:</label>
              <input
                type="text"
                name="password"
                id="password"
                value={editInfo.password}
                onChange={onChangeHandler}
                className="py-3 w-full px-4 bg-slate-700 text-white rounded-lg"
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                name="role"
                id="role"
                value={editInfo.role}
                disabled
                className="py-3 ml-7 px-4 w-full bg-red-500 text-white rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
            >
              Update Employee
            </button>
          </form>
        </Modal>
      )}

      {openDelete && (
        <Modal isOpen={openDelete} onClose={() => setOpenDelete(false)}>
          <div className="p-8 bg-slate-800 rounded-xl text-center">
            <h2 className="text-2xl font-semibold text-red-400 mb-4">
              Delete Employee
            </h2>
            <p className="mb-6 text-slate-300 text-lg">
              Are you want to delete {employeeToDelete?.username}?.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setOpenDelete(false);
                  setEmployeeToDelete(null);
                }}
                className="px-6 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-white font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteEmployee}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      <h1 className='text-2xl font-semibold mt-10 text-gray-200'>All Employees</h1>
      <div className="overflow-x-auto mt-2 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="text-left px-4 py-4 font-semibold text-blue-300">Username</th>
              <th className="text-left px-4 py-4 font-semibold text-blue-300">Email</th>
              <th className="text-left px-4 py-4 font-semibold text-blue-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.email} className="border-t border-slate-700">
                  <td className="px-4 py-4 text-gray-200">{employee.username}</td>
                  <td className="px-4 py-4 text-gray-200">{employee.email}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-4">
                      <button
                        className="px-7 py-2 border-2 text-gray-200 font-semibold cursor-pointer border-amber-300 hover:bg-amber-100 hover:text-gray-800 transition-all rounded-2xl"
                        onClick={() => openEditModal(employee)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-5 py-2 border-2 text-gray-200 font-semibold cursor-pointer border-red-400 hover:bg-red-300 transition-all hover:text-gray-800 rounded-2xl"
                        onClick={() => openDeleteModal(employee)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  <h2 className="text-gray-200 text-lg">
                    No Employees available
                  </h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page;