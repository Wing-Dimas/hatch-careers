import React from "react";
import Logo from "./Logo";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center px-4 sm:px-8 md:px-32 py-4">
            <Logo />
            <div className="text-stone-600 font-medium flex items-center gap-10">
                <a href="/#contact">Contact Us</a>
                <a href="/job-list">Job List</a>
            </div>
        </div>
    );
};

export default Navbar;
