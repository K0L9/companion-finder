import React from "react";
import Input from "../../components/chat-input";
import Message from "./message";

const ChatPage = () => {
  // const sendMessage = (message: string) => {
  //   var createdMessage = {
  //     createdBy: userId,
  //     message: message,
  //     roomId: roomId,
  //   };
  //   console.log(_hubConnectionBuilder);
  //   if (_hubConnectionBuilder.current)
  //     _hubConnectionBuilder.current.invoke("ClientMessage", createdMessage);
  // };

  return (
    <>
      <div className="chat container-center container-shadow">
        <div className="chat-container">
          <Message text="asdasdadas" isMyMessage={false} />
          <Message text="asdasdadas" isMyMessage={true} />
          <Message text="asdasdadas" isMyMessage={false} />
        </div>

        <Input />
      </div>
    </>
  );
};

export default ChatPage;
