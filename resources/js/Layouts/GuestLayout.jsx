import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Guest({ children, className }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div
                className={`w-full sm:max-w-md mt-6 px-6 py-4 ${
                    className || "bg-white shadow-md overflow-hidden"
                } sm:rounded-lg`}
            >
                <div>
                    <Link
                        href="/"
                        className="text-blue1 text-4xl text-center w-full flex justify-center mb-4"
                    >
                        HatchCareers<span className="text-yellow">Admin</span>
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
