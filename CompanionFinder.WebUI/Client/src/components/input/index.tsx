import React, { ChangeEventHandler } from "react";

interface InputProps {
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className: string;
}

const Input = ({ type, onChange, value, className }: InputProps) => {
  return (
    <>
      <input
        className={`my-input ${className}`}
        type={type}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

Input.defaultProps = {
  type: "text",
  value: "",
  onChange: () => {},
  className: "",
};

export default Input;
