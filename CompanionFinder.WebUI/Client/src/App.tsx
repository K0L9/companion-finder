import React, { useState } from "react";
import "./App.css";

import http from "./http_common";

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

function App() {
  const [connectionId, setConnectionId] = useState<string>();
  const [userId, setUserId] = useState<number>(11);
  const [themeId, setThemeId] = useState<number>(1);

  var hubConnectionBuilder: HubConnection;

  const setConnection = () => {
    hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/rooms")
      .configureLogging(LogLevel.Information)
      .build();

    hubConnectionBuilder
      .start()
      .then(() => {
        hubConnectionBuilder.invoke("getconnectionid").then((data) => {
          setConnectionId(data);
          sendStayToQueueRequest(data);
        });
      })
      .catch((err) => console.log("Error while connect with server"));

    hubConnectionBuilder.on("FindedRoom", (result: any) => {
      console.log(result);
      sendConnectToRoomRequest(result);
    });
    hubConnectionBuilder.on("ConnectedSuccessfully", (result: any) => {
      console.log("Connected");
    });
  };

  const fetchData = () => {
    http.get("api/test");
  };

  const handleStayToQueue = () => {
    setConnection();
  };
  const sendStayToQueueRequest = (connectionId: string) => {
    http.post("api/add-to-queue", {
      userId: userId,
      themeId: themeId,
      connectionId: connectionId,
    });
  };
  const sendConnectToRoomRequest = (roomId: number) => {
    http.post("api/connect-to-room", {
      userId: userId,
      roomId: roomId,
      connectionId: connectionId,
    });
  };
  const handleUserIdChange = (userId: number) => {
    setUserId(userId);
  };
  const handleThemeChange = (value: string) => {
    setThemeId(parseInt(value));
  };

  return (
    <div>
      <button onClick={handleStayToQueue}>Stay to queue</button>

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
  );
}

export default App;
