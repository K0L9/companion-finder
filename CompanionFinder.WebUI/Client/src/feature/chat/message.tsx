import React from "react";
import { Node } from "typescript";

interface MessageProps {
  text: string;
  isMyMessage: boolean;
}

const Message = ({ text, isMyMessage }: MessageProps) => {
  return (
    <div
      className={`message-container ${
        isMyMessage ? "" : "my-message-container"
      }`}
    >
      <div className="message">{text}</div>
    </div>
  );
};

Message.defaultProps = {
  text: "",
  isMyMessage: true,
};

export default Message;
