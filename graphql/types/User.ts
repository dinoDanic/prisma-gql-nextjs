import { extendInputType, extendType, objectType, queryType } from "nexus";
import prisma from "../../lib/prisma";
import { Product } from "./Product";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("email");
    t.boolean("isAdmin");
    t.list.field("products", {
      type: Product,
      async resolve(root, args, ctx) {
        return await prisma.product.findMany({ where: { userId: root.id } });
      },
    });
  },
});

export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: "User",
      async resolve() {
        return await prisma.user.findMany();
      },
    });
  },
});
