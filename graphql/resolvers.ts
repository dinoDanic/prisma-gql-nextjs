import { links } from "../data/links";
import prisma from "../lib/prisma";

export const resolvers = {
  Query: {
    links: async (_parent, args, context) => {
      console.log("parent", _parent);
      console.log("args", args);
      console.log("context", context);
      return await prisma.link.findMany();
    },
  },
};
