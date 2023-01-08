import { extendType, objectType } from "nexus";
import prisma from "../../lib/prisma";
import { User } from "./User";

export const Product = objectType({
  name: "Product",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("code");
    t.float("price");
    t.string("currency");
    t.int("userId");
    t.field("user", {
      type: User,
      async resolve(root) {
        return await prisma.user.findFirst({ where: { id: root.userId } });
      },
    });
  },
});

export const ProductsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("products", {
      type: "Product",
      async resolve(root, args, ctx) {
        return await prisma.product.findMany();
      },
    });
  },
});
