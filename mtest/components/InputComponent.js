import React, { useState } from "react";

const InputComponent = ({ type, className, value, onChange }) => {
  const inputClassName = `bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${className}`;
  return (
    <input
      type={type}
      className={inputClassName}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputComponent;
