import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/chat-input";
import Message from "./message";
import { HubConnection } from "@microsoft/signalr";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IMessage, MessageCreatorType } from "./types";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const { hubConnection, userId, roomId } = useTypedSelector((x) => x.room);

  const [messages, setMessages] = useState<Array<IMessage>>([
    {
      createdAt: null,
      createdBy: "Server",
      message: "Welcome to chat",
      roomId: "",
      messageId: "",
    },
    {
      createdAt: null,
      createdBy: "Server",
      message: "You can text now",
      roomId: "",
      messageId: "",
    },
    {
      createdAt: null,
      createdBy: "Server",
      message: "Be careful!",
      roomId: "",
      messageId: "",
    },
  ]);
  const navigator = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hubConnection) disconnect();
    setHubConnectionHandlers();
    return () => {
      removeHubConnectionHandlers();
    };
  }, []);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const setHubConnectionHandlers = () => {
    if (hubConnection) {
      hubConnection.on("ServerMessage", (result: IMessage) => {
        addMessage(result);
      });
    }
  };
  const removeHubConnectionHandlers = () => {
    if (hubConnection) {
      hubConnection.off("ServerMessage");
    }
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
        createdAt: new Date(Date.now()).toJSON(),
      };
      hubConnection.invoke("ClientMessage", createdMessage);
    } else {
      disconnect();
    }
  };

  const disconnect = () => {
    console.log("disconnect");
    navigator("/");
  };

  return (
    <>
      <div className="chat container-center container-shadow">
        <div className="chat-container">
          {messages.map((message: IMessage, index: number) => (
            <Message key={index} message={message} />
          ))}
          <div ref={divRef} />
        </div>
        <div className="input-container">
          <Input onSubmit={sendMessage} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
