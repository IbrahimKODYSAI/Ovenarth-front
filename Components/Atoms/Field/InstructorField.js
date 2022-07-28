import React, { useContext } from "react";
import classNames from "classnames";
import { InstructorContext } from "../../../contexts/InstructorContext";

const InstructorField = ({ placeholder, name, value, type }) => {
  const cssClassnames = classNames(" my-[1rem] relative field", {
    "field--has-content": value ? value.length > 0 : null,
  });

  const { handleChange } = useContext(InstructorContext);

  const onchangeHandler = (event) => {
    handleChange(event);
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
        className={`w-full p-4 text-lg h-14 rounded-[5px] focus:outline-[#82d2dc]`}
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

export default InstructorField;
