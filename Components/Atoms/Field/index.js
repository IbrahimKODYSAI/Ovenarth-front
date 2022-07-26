import React, { useContext } from "react";
import classNames from "classnames";
import { AuthContext } from "../../../contexts/AuthContext";

/* eslint-disable jsx-a11y/label-has-for */
const Field = ({ placeholder, name, value, type, errorMsg }) => {
  const cssClassnames = classNames(" my-[1rem] relative field", {
    "field--has-content": value ? value.length > 0 : null,
  });

  const { handleChange, handleErrorMsg } = useContext(AuthContext);

  const onchangeHandler = (event) => {
    handleChange(event);
    handleErrorMsg();
  };

  return (
    <div className={cssClassnames}>
      <input
        value={value}
        onChange={(event) => onchangeHandler(event)}
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
      <p className=" text-red-700">{errorMsg}</p>
    </div>
  );
};

export default Field;
