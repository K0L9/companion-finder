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
import { ConversationTheme, RoomSearchState } from "./types";
import { getUserIdAsync } from "./service";

import { useNavigate } from "react-router-dom";
import QueuePendingBar from "./queuePendingBar";
import { toast } from "react-toastify";

const HomePage: React.FC = () => {
  const [themes, setThemes] = useState<Array<ConversationTheme>>([]);
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
      await fetchThemes();
    })();
    return () => {
      removeHubConnectionHandlers();
    };
  }, []);

  useEffect(() => {
    if (hubConnection) setHubConnectionHandlers(hubConnection);
    return () => {
      removeHubConnectionHandlers();
    };
  }, [hubConnection, userId, connectionId]);

  const fetchThemes = async () => {
    await http
      .get<Array<ConversationTheme>>("/api/theme/get-all")
      .then((result) => {
        setThemes(result.data);
      })
      .catch((error: PromiseLike<Array<ConversationTheme>>) => {
        toast.error("Error. Try again");
      });
  };

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
    if (hubConnectionBuilder)
      hubConnectionBuilder.on("FoundedRoom", foundedRoomHandler);
  };
  const removeHubConnectionHandlers = () => {
    if (hubConnection) hubConnection.off("FoundedRoom");
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
      .post("api/chat-room/add-request", {
        userId: userId,
        themeId: themeId,
        connectionId: connectionId,
      })
      .then((data) => {
        setCurrentState(RoomSearchState.IN_QUEUE);
      });
  };
  const onStopButton = async () => {
    http
      .post("api/chat-room/remove-request", {
        userId: userId,
        themeId: themeId,
        connectionId: connectionId,
      })
      .then((data) => {
        setCurrentState(RoomSearchState.IN_QUEUE);
      });
  };

  const onThemeChange = (event: any) => {
    setThemeId(event.target.value);
  };

  return (
    <>
      {currentFindState === RoomSearchState.IN_QUEUE && <QueuePendingBar />}

      <div id="main-div" className="container-shadow container-center">
        <Select
          options={themes.map((x) => ({
            value: x.id || "",
            text: x.title || "",
          }))}
          onChange={onThemeChange}
          disabled={currentFindState === RoomSearchState.IN_QUEUE}
        />
        <Button
          text={
            currentFindState === RoomSearchState.IN_QUEUE ? "STOP" : "START"
          }
          onClick={
            currentFindState === RoomSearchState.IN_QUEUE
              ? onStartButton
              : onStopButton
          }
          className="main-div-button"
        />
      </div>
    </>
  );
};

export default HomePage;
