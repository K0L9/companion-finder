import { RoomActionTypes } from "../types/types";
import { RoomState, RoomAction } from "../types/types";

const initialState: RoomState = {
  hubConnection: null,
  roomId: null,
  connectionId: null,
  userId: null,
};

export const roomReducer = (state = initialState, action: RoomAction) => {
  switch (action.type) {
    case RoomActionTypes.WRITE_HUB_CONNECTION: {
      return {
        ...state,
        hubConnection: action.payload,
      };
    }
    case RoomActionTypes.WRITE_ROOM_ID: {
      return {
        ...state,
        roomId: action.payload,
      };
    }
    case RoomActionTypes.WRITE_CONNECTION_ID: {
      return {
        ...state,
        connectionId: action.payload,
      };
    }
    case RoomActionTypes.WRITE_USER_ID: {
      return {
        ...state,
        userId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
