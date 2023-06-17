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
import ErrorScreen from "../../components/containers/defaultLayout/errorScreen";
import { defaultServerWay } from "../../constants";

const HomePage: React.FC = () => {
  const [themes, setThemes] = useState<Array<ConversationTheme>>([]);
  const [themeId, setThemeId] = useState<number>(1);
  const [currentFindState, setCurrentState] = useState<RoomSearchState>(
    RoomSearchState.DEFAULT
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
      await fetchThemes();
      window.addEventListener("beforeunload", onStopButton);
    })();
    return () => {
      removeHubConnectionHandlers();
      window.removeEventListener("beforeunload", onStopButton);
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
        setCurrentState(RoomSearchState.CONNECTED);
      })
      .catch((error: PromiseLike<Array<ConversationTheme>>) => {
        toast.error("Error. Try again");
        setCurrentState(RoomSearchState.NOT_CONNECTED);
      });
  };

  const setConnection = () => {
    const hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl(`${defaultServerWay}rooms`)
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
    if (userId) writeUserId(userId);
    else {
      toast.error("Some error");
      setCurrentState(RoomSearchState.NOT_CONNECTED);
    }
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
      })
      .catch((data) => {
        setCurrentState(RoomSearchState.NOT_CONNECTED);
        toast.error("Some error.");
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
        setCurrentState(RoomSearchState.CONNECTED);
        toast.success("Successfully deleted");
      })
      .catch((data) => {
        setCurrentState(RoomSearchState.NOT_CONNECTED);
        toast.error("Some error.");
      });
  };

  const onThemeChange = (event: any) => {
    setThemeId(event.target.value);
  };

  return (
    <>
      {currentFindState === RoomSearchState.NOT_CONNECTED && (
        <ErrorScreen text="Error with connecting to server. Try again and ask me to fix it" />
      )}

      {currentFindState === RoomSearchState.IN_QUEUE && <QueuePendingBar />}
      {currentFindState === RoomSearchState.DEFAULT && (
        <QueuePendingBar isText={false} />
      )}

      <div id="main-div" className="container-shadow container-center">
        <Select
          options={
            themes
              ? themes.map((x) => ({
                  value: x.id || "",
                  text: x.title || "",
                }))
              : []
          }
          onChange={onThemeChange}
          disabled={
            currentFindState === RoomSearchState.IN_QUEUE ||
            currentFindState === RoomSearchState.NOT_CONNECTED ||
            currentFindState === RoomSearchState.DEFAULT
          }
        />
        <Button
          text={
            currentFindState === RoomSearchState.IN_QUEUE ? "STOP" : "START"
          }
          onClick={
            currentFindState === RoomSearchState.IN_QUEUE
              ? onStopButton
              : onStartButton
          }
          disabled={
            currentFindState === RoomSearchState.NOT_CONNECTED ||
            currentFindState === RoomSearchState.DEFAULT
          }
          className="main-div-button"
        />
      </div>
    </>
  );
};

export default HomePage;
