import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/chat-input";
import Message from "./message";
import { HubConnection } from "@microsoft/signalr";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IMessage, Identificator, MessageCreatorType } from "./types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";

const ChatPage = () => {
  const { hubConnection, userId, roomId, connectionId } = useTypedSelector(
    (x) => x.room
  );

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
  const [opponentWriteStatus, setOpponentWriteStatus] =
    useState<boolean>(false);
  const refSpanStatus = useRef(null);

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
      hubConnection.on("OpponentChangeWritingStatus", (result: boolean) => {
        setOpponentWriteStatus(result);
      });
    }
  };
  const removeHubConnectionHandlers = () => {
    if (hubConnection) {
      hubConnection.off("ServerMessage");
      hubConnection.off("OpponentChangeWritingStatus");
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
  const startWriting = () => {
    if (roomId) {
      const data = {
        roomId,
        writeStatus: true,
      };
      hubConnection?.invoke("ClientChangeWritingStatus", data);
    } else {
      toast.error("You are disconnected");
      disconnect();
    }
  };
  const stopWriting = () => {
    if (connectionId && roomId) {
      const data = {
        roomId,
        writeStatus: false,
      };
      hubConnection?.invoke("ClientChangeWritingStatus", data);
    } else {
      toast.error("You are disconnected");
      disconnect();
    }
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
        <div className="opponent-write-block">
          <CSSTransition
            in={opponentWriteStatus}
            timeout={200}
            classNames="my-node"
            unmountOnExit
            nodeRef={refSpanStatus}
          >
            <span ref={refSpanStatus}>Opponent is writing...</span>
          </CSSTransition>
        </div>
        <div className="input-container">
          <Input
            onSubmit={sendMessage}
            onTypingStart={startWriting}
            onTypingStop={stopWriting}
          />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
