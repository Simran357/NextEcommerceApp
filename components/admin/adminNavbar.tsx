"use client";

import { useAuth } from "../context/authContext";
import { FaUserCircle } from "react-icons/fa";

export default function AdminNavbar() {

    const { logout } = useAuth();

    return (

        <header className="bg-white h-20 shadow flex justify-between items-center px-8">
            <div>
                <h2 className="text-3xl font-bold">
                    Dashboard
                </h2>
            </div>
            <div className="flex items-center gap-4">
                <FaUserCircle size={35} />
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-5 py-2 rounded-xl"
                >
                    Logout
                </button>
            </div>
        </header>

    );

}