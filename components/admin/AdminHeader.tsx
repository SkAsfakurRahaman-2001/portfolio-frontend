"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FiChevronDown,
    FiLogOut,
} from "react-icons/fi";

export default function AdminHeader() {
    const router = useRouter();

    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Change this if your token key is different
        router.push("/admin/login");
    };

    return (
        <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 h-16 sm:h-20 px-3 sm:px-6 md:px-8 flex items-center justify-between shadow-md">
            {/* Left */}
            <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                <h1 className="ml-12 text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                    Dashboard
                </h1>
            </div>
        </header>
    );
}