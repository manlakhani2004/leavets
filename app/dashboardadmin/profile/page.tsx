"use client";
import React, { useEffect, useState } from "react";
import { User } from "../../types/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Modal from "../../_components/Modal";

function page() {
    const [user, setUser] = useState<User | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [editInfo, setEditInfo] = useState({
        username: "",
        email: "",
        role: "",
        password: "",
    });

    const [allUser, setAllUser] = useState<User[] | null>(null);
    const router = useRouter();


    useEffect(() => {
        const storedCurrentUser = localStorage.getItem("currentuser");
        const currentUser: User | null = storedCurrentUser ? JSON.parse(storedCurrentUser) : null;
        setUser(currentUser);

        const storedAllUser = localStorage.getItem("users");
        const users: User[] | null = storedAllUser ? JSON.parse(storedAllUser) : null;
        setAllUser(users);
    }, []);


    const handleDeleteAccount = () => {
        if (!user || !allUser) return;

        const updatedUsers = allUser.filter(
            (u) => u.email !== user.email
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.removeItem("currentuser");

        toast.success("Account deleted successfully");
        router.push("/auth/login");
    };


    const openEditModal = () => {
        if (!user) return;

        setEditInfo({
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
        });

        setOpenEdit(true);
    };


    const onChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setEditInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleEditProfile = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !allUser) return;

        const userIndex = allUser.findIndex(
            (u) => u.email === user.email
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
        localStorage.setItem("currentuser", JSON.stringify(updatedUser));

        setAllUser(updatedUsers);
        setUser(updatedUser);

        toast.success("Profile updated successfully");
        setOpenEdit(false);
    };

    if (!user) {
        return (
            <div className="text-white text-center mt-20">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10">
            <h1 className="text-3xl font-bold text-blue-300 mb-6">
                Admin Profile
            </h1>

            <div className="bg-slate-800 rounded-2xl px-6 py-10 max-w-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            {user.username}
                        </h2>
                        <p className="text-slate-400">{user.email}</p>

                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={openEditModal}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setOpenDelete(true)}
                            className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg text-white"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                        <p className="text-slate-400 text-sm">Username</p>
                        <p className="text-white font-medium">{user.username}</p>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                        <p className="text-slate-400 text-sm">Email</p>
                        <p className="text-white font-medium">{user.email}</p>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                        <p className="text-slate-400 text-sm">Role</p>
                        <p className="text-white font-medium capitalize">{user.role}</p>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                        <p className="text-slate-400 text-sm">Password</p>
                        <p className="text-white font-medium">••••••••</p>
                    </div>
                </div>
            </div>


            {openDelete && (
                <Modal isOpen={openDelete} onClose={() => setOpenDelete(false)}>
                    <div className="p-6 text-center">
                        <h2 className="text-xl font-semibold text-red-400 mb-4">
                            Delete Account
                        </h2>
                        <p className="mb-6 text-slate-300">
                            Are you sure? This action cannot be undone.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setOpenDelete(false)}
                                className="px-5 py-2 bg-slate-600 rounded-lg text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="px-5 py-2 bg-red-600 rounded-lg text-white"
                            >
                                Delete
                            </button>
                        </div>
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
                            Edit Profile
                        </h2>

                        <div className="flex gap-2 items-center">
                            <label htmlFor="username">Name:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={editInfo.username}
                                onChange={onChangeHandler}
                                className="py-3 ml-4 w-full px-4 bg-slate-700 text-white rounded-lg focus:outline-none"
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
                                className="py-3 ml-5 px-4 w-full bg-red-500 text-white rounded-lg focus:outline-none"
                            />
                        </div>

                        <div className="flex  items-center">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                value={editInfo.password}
                                onChange={onChangeHandler}

                                className="py-3 w-full px-4 bg-slate-700 text-white rounded-lg focus:outline-none"
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
                                className="py-3 ml-7 px-4 w-full bg-red-500 text-white rounded-lg focus:outline-none"
                            />
                            </div>

                            <button
                                type="submit"
                                className="py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white "
                            >
                                Update Profile
                            </button>
                    </form>
                </Modal>
            )}
        </div>
    );
}

export default page;
