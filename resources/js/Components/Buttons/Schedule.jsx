import { IconClockHour5 } from "@tabler/icons";
import React from "react";

const Schedule = ({ className, onClick }) => {
  return (
    <button
      className={`bg-green p-1 rounded-sm ${className}`}
      onClick={onClick}
    >
      <IconClockHour5 size={16} color="#fff" />
    </button>
  );
};

export default Schedule;
