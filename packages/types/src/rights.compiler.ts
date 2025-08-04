import Compiler from "fbit-field/compiler";
import { Rights } from "./rights.type";
import { join } from "path";

const rights = Object.fromEntries(
  Object.keys(Rights.CONSTANTS.object.available).map((key) => [
    key,
    Object.keys(Rights.CONSTANTS.object.available[key]),
  ]),
);

if (process.env.NODE_ENV === "rights_compile") {
  console.log("Compiling...");
  new Compiler(
    rights,
    join(__dirname, "rights.type.ts"),
    {},
    {
      writeInCompiler: true,
      defaultExportOn: false,
      name: "raw",
    },
  ).execute();
}