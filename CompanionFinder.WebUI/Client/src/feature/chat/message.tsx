import React from "react";
import { Node } from "typescript";
import { MessageCreatorType } from "./types";

interface MessageProps {
  text: string;
  createdBy: MessageCreatorType;
}

const Message = ({ text, createdBy }: MessageProps) => {
  return (
    <div
      className={`message-container ${
        (createdBy ? MessageCreatorType.me : "my-message-container",
        createdBy ? MessageCreatorType.server : "server-message-container")
      }`}
    >
      <div className="message">{text}</div>
    </div>
  );
};

Message.defaultProps = {
  text: "",
  createdBy: MessageCreatorType.companion,
};

export default Message;
