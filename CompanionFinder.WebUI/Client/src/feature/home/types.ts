export enum RoomSearchState {
  DEFAULT,
  NOT_CONNECTED,
  CONNECTED,
  IN_QUEUE,
  FOUNDED_ROOM,
  CONNECTING,
  IN_ROOM,
}

export type ConversationTheme = {
  title: string | null | undefined;
  id: number | null | undefined;
};
