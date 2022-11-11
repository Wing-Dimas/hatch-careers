import { IconWorldWww } from "@tabler/icons";
import React from "react";

const Share = ({ className, onClick }) => {
    return (
        <button
            className={`bg-green p-1 rounded-sm ${className}`}
            onClick={onClick}
        >
            <IconWorldWww size={16} color="#fff" />
        </button>
    );
};

export default Share;
