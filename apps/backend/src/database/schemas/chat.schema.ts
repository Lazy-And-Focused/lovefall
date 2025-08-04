import mongoose from "mongoose";

import { chatSchema, chatName, Chat as ChatType } from "@lovefall/types/dist/chat.type";
export * from "@lovefall/types/dist/chat.type";

export const Chat = mongoose.model(chatName, new mongoose.Schema<ChatType>(chatSchema));

export default Chat;
