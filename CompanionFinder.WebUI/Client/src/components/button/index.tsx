import React from "react";

interface ButtonProps {
  text: string;
  onClick: (any: any) => void;
  className: string;
}

const Button = ({ text = "", onClick, className }: ButtonProps) => {
  return (
    <button className={`my-button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = { text: "", className: "" };

export default Button;
