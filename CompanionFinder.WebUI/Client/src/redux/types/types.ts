import { HubConnection } from "@microsoft/signalr";

export enum RoomActionTypes {
  WRITE_HUB_CONNECTION = "WRITE_HUB_CONNECTION",
  WRITE_ROOM_ID = "WRITE_ROOM_ID",
}

export interface RoomState {
  hubConnection: HubConnection | null;
  roomId: string | null;
}

export interface writeHubConnectionAction {
  type: RoomActionTypes.WRITE_HUB_CONNECTION;
  payload: HubConnection;
}
export interface writeRoomId {
  type: RoomActionTypes.WRITE_ROOM_ID;
  payload: string;
}

export type RoomAction = writeHubConnectionAction | writeRoomId;
