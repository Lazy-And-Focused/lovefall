import mongoose from "mongoose";

import { userSchema, userName, User as UserType } from "@lovefall/types/dist/user.type";
export * from "@lovefall/types/dist/user.type";

export const User = mongoose.model(userName, new mongoose.Schema<UserType>(userSchema));

export default User;
