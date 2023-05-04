import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import http from "./http_common";

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

function App() {
  const [connectionId, setConnectionId] = useState<string>();
  const [userId, setUserId] = useState<number>(1);
  const [themeId, setThemeId] = useState<number>(1);
  const [text, setText] = useState<string>();
  const [roomId, setRoomId] = useState<string>();

  const _hubConnectionBuilder = useRef<HubConnection | null>(null);

  useEffect(() => {
    setConnection();
  }, []);

  const handleButton = async () => {
    http
      .post("api/handle-request", {
        userId: userId,
        themeId: themeId,
        connectionId: connectionId,
      })
      .then((data) => {
        console.log(data);
      });
  };

  const setConnection = () => {
    console.log("test");
    let hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/rooms")
      .configureLogging(LogLevel.Information)
      .build();

    hubConnectionBuilder
      .start()
      .then(() => {
        hubConnectionBuilder.invoke("getconnectionid").then((data) => {
          console.log("connected: ", data);
          setConnectionId(data);
        });
      })
      .catch((err) => console.log("Error while connect with server"));

    hubConnectionBuilder.on("FindedRoom", (result: any) => {
      console.log("roomId: ", result);
      setRoomId(result);
      joinRoom(result);
    });
    hubConnectionBuilder.on("ServerMessage", (result: any) => {
      console.log("Server message: ", result);
    });
    _hubConnectionBuilder.current = hubConnectionBuilder;
  };
  const handleUserIdChange = (userId: number) => {
    setUserId(userId);
  };
  const handleThemeChange = (value: string) => {
    setThemeId(parseInt(value));
  };

  const buttonSendHandle = () => {
    sendMessage(text as string);
  };
  const onInputChange = (event: any) => {
    setText(event.target.value);
  };
  const sendMessage = (message: string) => {
    var createdMessage = {
      createdBy: userId,
      message: message,
      roomId: roomId,
    };
    console.log(_hubConnectionBuilder);
    if (_hubConnectionBuilder.current)
      _hubConnectionBuilder.current.invoke("ClientMessage", createdMessage);
  };
  const joinRoom = (roomId: string) => {
    console.log("hubConnectionBuilder: ", _hubConnectionBuilder.current);
    if (_hubConnectionBuilder.current)
      _hubConnectionBuilder.current.invoke("JoinRoom", {
        userId: userId,
        connectionId: connectionId as string,
        roomId: roomId as string,
      });
  };

  return (
    <>
      <div>
        <button onClick={handleButton}>Stay to queue</button>

        <label htmlFor="speakTheme">Choose your theme: </label>
        <select
          id="speakTheme"
          onChange={(event) => handleThemeChange(event.currentTarget.value)}
        >
          <option value={1}>Politics</option>
          <option value={2}>Cars</option>
        </select>

        <input
          type="number"
          defaultValue={11}
          onChange={(event: any) => handleUserIdChange(event.target.value)}
        />
      </div>
      <div>
        <input type="text" onChange={onInputChange} />
        <button onClick={buttonSendHandle}>Send message</button>
      </div>
    </>
  );
}

export default App;
