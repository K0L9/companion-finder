import React, { useState, useEffect, useCallback } from "react";
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
import { RoomSearchState } from "./types";
import { getUserIdAsync } from "./service";

import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const options = [
    { text: "Politics", value: 1 },
    { text: "Haha", value: 2 },
  ];
  const [themeId, setThemeId] = useState<number>(1);
  const [currentFindState, setCurrentState] = useState<RoomSearchState>(
    RoomSearchState.NOT_CONNECTED
  );

  const {
    writeHubConnectionBuilder,
    writeRoomId,
    writeConnectionId,
    writeUserId,
  } = useActions();

  const { hubConnection, connectionId, userId } = useTypedSelector(
    (x) => x.room
  );

  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      await setUserId();
      setConnection();
      setCurrentState(RoomSearchState.CONNECTED);
    })();
  }, []);

  useEffect(() => {
    if (hubConnection) setHubConnectionHandlers(hubConnection);
  }, [hubConnection, userId, connectionId]);

  const setConnection = () => {
    const hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/rooms")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setHubConnectionHandlers(hubConnectionBuilder);

    hubConnectionBuilder
      .start()
      .then(() => {
        hubConnectionBuilder.invoke("getconnectionid").then((data) => {
          writeConnectionId(data);
        });
      })
      .catch((err) => console.log("Error while connect with server"));

    writeHubConnectionBuilder(hubConnectionBuilder);
  };

  const setHubConnectionHandlers = (hubConnectionBuilder: HubConnection) => {
    hubConnectionBuilder.on("FoundedRoom", foundedRoomHandler);
  };

  const setUserId = async () => {
    let userId = await getUserIdAsync();
    writeUserId(userId);
  };

  const joinRoom = async (roomId: string) => {
    if (hubConnection) {
      await hubConnection.invoke("JoinRoom", {
        userId: userId,
        connectionId: connectionId as string,
        roomId: roomId as string,
      });

      writeHubConnectionBuilder(hubConnection);
    } else {
      setCurrentState(RoomSearchState.NOT_CONNECTED);
    }
  };

  const foundedRoomHandler = async (roomId: any) => {
    setCurrentState(RoomSearchState.FOUNDED_ROOM);
    writeRoomId(roomId);
    setCurrentState(RoomSearchState.CONNECTING);

    await joinRoom(roomId);
    setCurrentState(RoomSearchState.IN_ROOM);

    navigator("/chat");
  };

  const onStartButton = async () => {
    http
      .post("api/chat-room/handle-request", {
        userId: userId,
        themeId: themeId,
        connectionId: connectionId,
      })
      .then((data) => {
        console.log(data);
        setCurrentState(RoomSearchState.IN_QUEUE);
      });
  };

  const onThemeChange = (event: any) => {
    setThemeId(event.target.value);
  };

  return (
    <>
      <div id="main-div" className="container-shadow container-center">
        {currentFindState.toString()}
        <Select options={options} onChange={onThemeChange}></Select>
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
