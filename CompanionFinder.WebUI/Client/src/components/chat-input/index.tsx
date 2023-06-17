import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface ChatInputProps {
  className: string;
  type: React.HTMLInputTypeAttribute;
  onSubmit: (message: string) => void;
  onTypingStart: () => void;
  onTypingStop: () => void;
}

const ChatInput = ({
  type,
  className,
  onSubmit,
  onTypingStop,
  onTypingStart,
}: ChatInputProps) => {
  const [value, setValue] = useState<string>("");
  // const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

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

  const handleInput = () => {
    if (!typingTimerRef.current) {
      onHandleTypingStart();
    }

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    const timeoutTime = 2000;

    typingTimerRef.current = setTimeout(onHandleTypingStop, timeoutTime);
  };

  const handleBlur = () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    onHandleTypingStop();
  };

  const onHandleTypingStop = () => {
    typingTimerRef.current = null;
    onTypingStop();
  };
  const onHandleTypingStart = () => {
    onTypingStart();
  };

  return (
    <form className="chat-input-form" onSubmit={onHandleSubmit}>
      <input
        type={type}
        value={value}
        onChange={handleTextChange}
        className="my-input"
        onInput={handleInput}
        onBlur={handleBlur}
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
  onTypingStart: () => {},
  onTypingStop: () => {},
};

export default ChatInput;
