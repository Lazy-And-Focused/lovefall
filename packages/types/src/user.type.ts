import mongoose from "mongoose";
import { SchemaParameters } from "./database.type";

export type User = {
  id: string;
  username: string;
  nickname: string;
  avatar_url: string;
  created_at: string;
  auth: string[];
};

export const userSchema: SchemaParameters<User> = {
  id: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },

  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  nickname: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
  
  avatar_url: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },

  created_at: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  auth: {
    type: [mongoose.SchemaTypes.String],
    required: true,
  }
};

export const userKeys = Object.keys(userSchema) as (keyof User)[];
export const userName = "user";