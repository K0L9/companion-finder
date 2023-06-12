import React from "react";
import Button from "../../button";

interface ErrorScreenProps {
  text: string;
}

const ErrorScreen = ({ text }: ErrorScreenProps) => {
  const handleButtonClick = () => {
    window.location.reload();
  };

  return (
    <div id="error-screen">
      <h1>{text}</h1>
      <Button
        text="Update page"
        className="error-screen-update-button"
        onClick={handleButtonClick}
      />
    </div>
  );
};

ErrorScreen.defaultProps = { text: "" };

export default ErrorScreen;
