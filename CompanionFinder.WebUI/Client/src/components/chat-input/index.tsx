import React from "react";

interface ChatInputProps {
  onChange: (any: any) => void;
  className: string;
  type: React.HTMLInputTypeAttribute;
  onSubmit: () => void;
}

const ChatInput = ({ type, className, onSubmit }: ChatInputProps) => {
  return (
    <form className="" onSubmit={onSubmit}>
      <input type={type} className="my-input" />
      <input type="submit" value={"SEND"} />
    </form>
  );
};

ChatInput.defaultProps = {
  onChange: () => {},
  className: "",
  type: "text",
  onSubmit: () => {},
};

export default ChatInput;
