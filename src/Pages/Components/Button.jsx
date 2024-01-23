import React from "react";

const Button = ({ text, type, classNames, onClick }) => {
  return (
    <button className={classNames} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
