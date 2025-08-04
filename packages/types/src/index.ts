export * from "./chat.type";
export * from "./database.type";
export * from "./message.type";
export * from "./user.type";
export * from "./rights.type";
export * from "./response.type";
export * from "./auth.type";

export * as auth from "./auth.type";
export * as chat from "./chat.type";
export * as database from "./database.type";
export * as message from "./message.type";
export * as user from "./user.type";

import * as auth from "./auth.type";
import * as chat from "./chat.type";
import * as database from "./database.type";
import * as message from "./message.type";
import * as user from "./user.type";

export default {
  chat,
  database,
  message,
  user,
  auth
};