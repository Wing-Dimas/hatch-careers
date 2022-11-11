import { Link } from "@inertiajs/inertia-react";
import {
    IconCircle,
    IconDashboard,
    IconNews,
    IconRocket,
    IconUser,
    IconUsers,
} from "@tabler/icons";
import React from "react";
import ApplicationLogo from "./ApplicationLogo";
import NavLink from "./NavLink";

const Sidebar = ({ auth, hideSidebar }) => {
    return (
        <div
            className={`${
                hideSidebar ? "w-[63px]" : "w-[250px]"
            } fixed min-h-screen bg-[#fff] whitespace-none overflow-hidden drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] transition-all duration-500 ease-in-out`}
        >
            <Link
                href="/dashboard"
                className="flex justify-center items-center h-16"
            >
                <ApplicationLogo />
            </Link>
            <hr className="border-[#ddd]" />
            <NavLink href={route("dev")} active={route().current("dev")}>
                <div className="w-[18px]">
                    <IconUser size={18} />
                </div>
                <div className="flex items-center gap-1 min-w-full overflow-hidden">
                    {auth.user.name}
                    <IconCircle size={13} color="#28a745" fill="#28a745" />
                </div>
            </NavLink>
            <hr className="border-[#ddd] mx-2" />
            <NavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
            >
                <div className="w-[18px]">
                    <IconDashboard size={18} />
                </div>
                <div className="min-w-full overflow-hidden">Dashboard</div>
            </NavLink>
            <NavLink href={route("jobs")} active={route().current("jobs")}>
                <div className="w-[18px]">
                    <IconNews size={18} />
                </div>
                <div className="min-w-full overflow-hidden">Jobs</div>
            </NavLink>
            <NavLink
                href={route("applicants")}
                active={route().current("applicants")}
            >
                <div className="w-[18px]">
                    <IconUsers size={18} />
                </div>
                <div className="min-w-full overflow-hidden">Applicants</div>
            </NavLink>

            <h2
                className={`transition-all duration-500 ease-in-out ${
                    hideSidebar ? "-ml-36" : "ml-4"
                }`}
            >
                MANAGEMENT
            </h2>

            <NavLink href={route("users")} active={route().current("users")}>
                <div className="w-[18px]">
                    <IconUsers size={18} />
                </div>
                <div className="min-w-full overflow-hidden">Users</div>
            </NavLink>

            <h2
                className={`transition-all duration-500 ease-in-out ${
                    hideSidebar ? "-ml-36" : "ml-4"
                }`}
            >
                CONFIGURATIONS
            </h2>

            <NavLink href={route("roles")} active={route().current("roles")}>
                <div className="w-[18px]">
                    <IconRocket size={18} />
                </div>
                <div className="min-w-full overflow-hidden">Roles</div>
            </NavLink>
        </div>
    );
};

export default Sidebar;
