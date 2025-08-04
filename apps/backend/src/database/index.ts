import mongoose from "mongoose";

import "./schemas/index";

export * from "./schemas";
export * from "./functions";

export default async (url: string) => {
  mongoose
    .connect(url)
    .catch((err) => console.error(err))
    .then(async () => {
      console.log("Connected to MongoDB");
    });
};
