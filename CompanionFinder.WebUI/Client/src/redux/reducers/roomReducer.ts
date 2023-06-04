import { RoomActionTypes } from "../types/types";
import { RoomState, RoomAction } from "../types/types";

const initialState: RoomState = {
  hubConnection: null,
  roomId: null,
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
    default: {
      return state;
    }
  }
};
