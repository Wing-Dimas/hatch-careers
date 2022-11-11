import { IconSquarePlus } from "@tabler/icons";
import React from "react";

const Add = ({ className, onClick, children }) => {
    return (
        <button
            className={`bg-green p-1 rounded-sm flex gap-1 items-center text-[#fff] ${className}`}
            onClick={onClick}
        >
            <IconSquarePlus size={28} color="rgb(40 167 69)" fill="#fff" />
            {children}
        </button>
    );
};

export default Add;
