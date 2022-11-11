import { IconEye } from "@tabler/icons";
import React from "react";

const Show = ({ className, onClick }) => {
    return (
        <button
            className={`bg-blue2 p-1 rounded-sm ${className}`}
            onClick={onClick}
        >
            <IconEye size={16} color="#fff" />
        </button>
    );
};

export default Show;
