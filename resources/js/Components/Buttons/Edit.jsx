import { IconEdit } from "@tabler/icons";
import React from "react";

const Edit = ({ className, onClick }) => {
    return (
        <button
            className={`bg-yellow p-1 rounded-sm ${className}`}
            onClick={onClick}
        >
            <IconEdit size={16} />
        </button>
    );
};

export default Edit;
