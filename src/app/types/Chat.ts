export interface IMessage {
  content: string, 
  createdAt?: Date, 
  id: string,
  role: "function" | "user" | "system" | "assistant" | "data" | "tool"
}

export interface IChatList {
  name: string,
  messages: IMessage[],
  id:string
}

export interface IChat {
  input: string,
  messages: IMessage[] | undefined,
}