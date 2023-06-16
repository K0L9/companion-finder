import React from "react";

interface ButtonProps {
  text: string;
  onClick: (any: any) => void;
  className: string;
  disabled: boolean;
}

const Button = ({ text = "", onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      className={`my-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.defaultProps = { text: "", className: "", disabled: false };

export default Button;
