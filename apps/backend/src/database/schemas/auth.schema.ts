import mongoose from "mongoose";

import { authSchema, authName, Auth as AuthType } from "@lovefall/types/dist/auth.type";
export * from "@lovefall/types/dist/auth.type";

export const Auth = mongoose.model(authName, new mongoose.Schema<AuthType>(authSchema));

export default Auth;
