export enum MessageCreatorType {
  me,
  companion,
  server,
}

export interface IMessage {
  createdBy: string;
  message: string;
  roomId: string;
  messageId: string;
  createdAt: Date | null | undefined;
}
