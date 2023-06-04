import { HubConnection } from "@microsoft/signalr";
import { RoomAction, RoomActionTypes } from "../types/types";

export const writeHubConnectionBuilder = (connectionBuilder: HubConnection) => {
  return async (dispatch: React.Dispatch<RoomAction>) => {
    dispatch({
      type: RoomActionTypes.WRITE_HUB_CONNECTION,
      payload: connectionBuilder,
    });
  };
};

export const writeRoomId = (roomId: string) => {
  return async (dispatch: React.Dispatch<RoomAction>) => {
    dispatch({
      type: RoomActionTypes.WRITE_ROOM_ID,
      payload: roomId,
    });
  };
};
