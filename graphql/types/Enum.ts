import { enumType } from "nexus";
import { schema } from "../schema";

export const CurrencyEnum = enumType({
  name: "Currency",
  members: ["EUR", "HRK"],
});
