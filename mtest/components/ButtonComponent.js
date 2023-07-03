import React, { useState } from "react";
const ButtonComponent = ({ className, onClick, label }) => {
  const buttonClassName = `shadow bg-green-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" ${className}`;
  return (
    <button type="button" className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonComponent;
