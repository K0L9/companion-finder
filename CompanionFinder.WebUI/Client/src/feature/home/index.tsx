import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/button";
import Select from "../../components/select";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

import http from "../../http_common";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const HomePage: React.FC = () => {
  const options = [
    { text: "Politics", value: 1 },
    { text: "Haha", value: 2 },
  ];
  const [connectionId, setConnectionId] = useState<string>();
  const [userId, setUserId] = useState<number>(1);
  const [themeId, setThemeId] = useState<number>(1);

  const { writeHubConnectionBuilder, writeRoomId } = useActions();
  const { hubConnection } = useTypedSelector((x) => x.room);

  useEffect(() => {
    setConnection();
  }, []);

  const setConnection = () => {
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
      writeRoomId(result);
      joinRoom(result);
    });
    hubConnectionBuilder.on("ServerMessage", (result: any) => {
      console.log("Server message: ", result);
    });

    writeHubConnectionBuilder(hubConnectionBuilder);
  };

  const onStartButton = async () => {
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

  const joinRoom = (roomId: string) => {
    if (hubConnection)
      hubConnection.invoke("JoinRoom", {
        userId: userId,
        connectionId: connectionId as string,
        roomId: roomId as string,
      });
  };

  return (
    <>
      <div id="main-div" className="container-shadow container-center">
        <Select options={options}></Select>
        <Button
          text="START"
          onClick={onStartButton}
          className="main-div-button"
        />
      </div>
    </>
  );
};

export default HomePage;
