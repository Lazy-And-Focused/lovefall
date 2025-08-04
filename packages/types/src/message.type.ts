import mongoose from "mongoose";
import { SchemaParameters } from "./database.type";

export type Message = {
  id: string;
  content: string;
  attachments: string[];
  sender_id: string;
};

export const messageSchema: SchemaParameters<Message> = {
  id: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true
  },

  content: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  sender_id: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
};

export const messageKeys = Object.keys(messageSchema) as (keyof Message)[];
export const messageName = "message";
