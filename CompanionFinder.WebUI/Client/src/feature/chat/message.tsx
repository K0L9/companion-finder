import React from "react";
import { Node } from "typescript";
import { IMessage, MessageCreatorType } from "./types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface MessageProps {
  message: IMessage | null;
}

const Message = ({ message }: MessageProps) => {
  const { userId } = useTypedSelector((x) => x.room);

  const getClassName = () => {
    if (message?.createdBy === "Server") return "server-message-container";
    if (message?.createdBy === userId) return "my-message-container";
    else return "opponent-message-container";
  };

  const getDate = () => {
    if (message && message.createdAt)
      return new Date(Date.parse(message?.createdAt?.toString()));
  };

  console.log(getDate());

  return (
    <div className={`message-container ${getClassName()}`}>
      <div className="message">{message?.message}</div>

      {getDate() !== null && getDate() !== undefined && (
        <span className="time-container">
          {getDate()?.getHours()}:{getDate()?.getMinutes()}
        </span>
      )}
    </div>
  );
};

Message.defaultProps = {
  message: null,
};

export default Message;
