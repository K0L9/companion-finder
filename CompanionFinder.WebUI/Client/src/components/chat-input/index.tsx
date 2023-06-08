import React, { useRef } from "react";

interface ChatInputProps {
  className: string;
  type: React.HTMLInputTypeAttribute;
  onSubmit: (message: string) => void;
}

const ChatInput = ({ type, className, onSubmit }: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onHandleSubmit = (event: any) => {
    event?.preventDefault();
    if (inputRef.current?.value) onSubmit(inputRef.current?.value);
  };

  return (
    <form className="" onSubmit={onHandleSubmit}>
      <input type={type} ref={inputRef} className="my-input" />
      <input type="submit" value={"SEND"} />
    </form>
  );
};

ChatInput.defaultProps = {
  className: "",
  type: "text",
  onSubmit: () => {},
};

export default ChatInput;
