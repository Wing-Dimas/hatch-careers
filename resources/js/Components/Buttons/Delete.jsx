import { IconTrash } from "@tabler/icons";
import React from "react";

const Delete = ({ className, onClick }) => {
    return (
        <button
            className={`bg-red p-1 rounded-sm ${className}`}
            onClick={onClick}
        >
            <IconTrash size={16} color="#fff" />
        </button>
    );
};

export default Delete;
