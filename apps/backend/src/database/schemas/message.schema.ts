import mongoose from "mongoose";

import { messageSchema, messageName, Message as MessageType } from "@lovefall/types/dist/message.type";
export * from "@lovefall/types/dist/message.type";

export const Message = mongoose.model(messageName, new mongoose.Schema<MessageType>(messageSchema));

export default Message;
