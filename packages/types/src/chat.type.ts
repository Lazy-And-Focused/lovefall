import mongoose from "mongoose";
import { SchemaParameters } from "./database.type";

export type Chat = {
  id: string;
  owner_id: string;
  name: string;
  icon_url: string;
  messages: string[];
  members: string[];

  /* @type {string, bigint} */
  rights: Map<string, string>;
};

export const chatSchema: SchemaParameters<Chat> = {
  id: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },

  owner_id: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },

  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  icon_url: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: ""
  },
  
  messages: {
    type: [mongoose.SchemaTypes.String],
    required: false,
    default: [],
  },

  members: {
    type: [mongoose.SchemaTypes.String],
    required: false,
    default: [],
  },

  rights: {
    type: mongoose.SchemaTypes.Map,
    required: false,
    default: new Map<string, string>()
  }
};

export const chatKeys = Object.keys(chatSchema) as (keyof Chat)[];
export const chatName = "chat" as const;