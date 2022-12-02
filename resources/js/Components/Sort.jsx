import React from "react";

const Sort = ({ options, onChange, className, placeHolder, value }) => {
  return (
    <select
      className={`w-full rounded-sm border-[#dedede] border-2 outline-none p-1 h-8 text-sm ${className}`}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      {placeHolder && <option value={""}>{placeHolder}</option>}
      {options.map((opt, ind) => {
        return (
          <option value={opt.value} key={ind + 1}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
};

export default Sort;
