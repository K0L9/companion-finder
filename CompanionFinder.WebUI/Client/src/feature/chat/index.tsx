import React, { useEffect, useState } from "react";
import Input from "../../components/chat-input";
import Message from "./message";
import { HubConnection } from "@microsoft/signalr";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IMessage, MessageCreatorType } from "./types";

const ChatPage = () => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const { hubConnection, userId, roomId } = useTypedSelector((x) => x.room);

  useEffect(() => {
    setHubConnectionHandlers();
  });

  const setHubConnectionHandlers = () => {
    console.log("hub: ", hubConnection);
    if (hubConnection)
      hubConnection.on("ServerMessage", (result: IMessage) => {
        console.log("Server message: ", result);
        addMessage(result);
      });
  };

  const addMessage = (message: IMessage) => {
    if (messages.findIndex((x) => x.messageId === message.messageId) === -1)
      setMessages((messages) => [...messages, message]);
  };
  const sendMessage = (message: string) => {
    if (hubConnection) {
      var createdMessage = {
        createdBy: userId,
        message: message,
        roomId: roomId,
        messageId: "",
      };
      hubConnection.invoke("ClientMessage", createdMessage);
    }
  };

  return (
    <>
      <div className="chat container-center container-shadow">
        <div className="chat-container">
          {messages.map((message: IMessage) => (
            <Message
              text={message.message}
              createdBy={
                message.createdBy === userId
                  ? MessageCreatorType.me
                  : MessageCreatorType.companion
              }
            ></Message>
          ))}
        </div>
        <Input onSubmit={sendMessage} />
      </div>
    </>
  );
};

export default ChatPage;
