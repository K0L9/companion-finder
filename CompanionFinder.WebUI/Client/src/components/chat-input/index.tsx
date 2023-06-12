import React, { useCallback, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface ChatInputProps {
  className: string;
  type: React.HTMLInputTypeAttribute;
  onSubmit: (message: string) => void;
}

const ChatInput = ({ type, className, onSubmit }: ChatInputProps) => {
  const [value, setValue] = useState<string>("");

  const onHandleSubmit = (event: any) => {
    event?.preventDefault();

    setValue("");
    onSubmit(value);
  };

  const handleTextChange = useCallback(
    (e: any) => {
      setValue(e.target.value);
    },
    [value]
  );

  return (
    <form className="chat-input-form" onSubmit={onHandleSubmit}>
      <input
        type={type}
        value={value}
        onChange={handleTextChange}
        className="my-input"
      />
      <button type="submit">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
};

ChatInput.defaultProps = {
  className: "",
  type: "text",
  onSubmit: () => {},
};

export default ChatInput;
