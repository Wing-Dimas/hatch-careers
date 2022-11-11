import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`flex flex-nowrap shrink-0 gap-3 m-2 py-2 pl-4 rounded-lg font-medium items-center text-md focus:outline-none overflow-hidden  ${
                active
                    ? "bg-blue3 text-[#fff] transition duration-150 ease-in-out"
                    : "hover:bg-[#eee] transition duration-150 ease-in-out"
            }`}
        >
            {children}
        </Link>
    );
}
