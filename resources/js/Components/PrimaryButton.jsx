import React from "react";

export default function PrimaryButton({
    type = "submit",
    className = "",
    processing,
    children,
}) {
    return (
        <button
            type={type}
            className={
                `flex w-full items-center justify-center px-4 py-4 text-[#fff] bg-yellow border border-transparent rounded-full font-semibold text-xs uppercase tracking-widest hover:shadow-lg transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
