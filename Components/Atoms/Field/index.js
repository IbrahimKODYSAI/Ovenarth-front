import React, { useContext } from "react";
import classNames from "classnames";
import { AuthContext } from "../../../contexts/AuthContext";

/* eslint-disable jsx-a11y/label-has-for */
const Field = ({ placeholder, name, value, type }) => {
  const cssClassnames = classNames(" my-[1rem] relative field", {
    "field--has-content": value.length > 0,
  });

  const { handleChange } = useContext(AuthContext);
  return (
    <div className={cssClassnames}>
      <input
        value={value}
        onChange={handleChange}
        id={`field-id-${name}`}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full p-4 text-lg h-14 border border-black rounded-[5px] focus:outline-[#82d2dc]`}
      />
      <label
        htmlFor={`field-id-${name}`}
        className="text-[#51483f] absolute top-1 left-3 text-sm hidden field-label"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Field;
