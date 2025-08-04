import mongoose from "mongoose";
import { SchemaParameters } from "./database.type";

export const AUTH_TYPES = [ "google", "github", "discord", "gitlab", "bitbucket" ] as const;
export type AuthTypes = (typeof AUTH_TYPES)[number];

export type Auth = {
  id: string;
  
  profile_id: string;
  service_id: string;
  
  access_token: string;
  refresh_token: string;
  
  created_at: string;
  type: AuthTypes;
};

export const authSchema: SchemaParameters<Auth> = {
  id: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: false,
  },
  
  profile_id: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  service_id: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  
  access_token: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },

  refresh_token: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },

  created_at: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  type: {
    type: mongoose.SchemaTypes.String,
    required: true,
  }
};

export const authKeys = Object.keys(authSchema) as (keyof Auth)[];
export const authName = "auth";