import React from "react";

export default function ApplicationLogo({ className }) {
    return (
        <span
            href="/"
            className={`text-blue1 font-normal text-xl ${className}`}
        >
            HatchCareers<span className="text-yellow">Admin</span>
        </span>
    );
}
