import { objectType } from "nexus";
import prisma from "../../lib/prisma";
import { Product } from "./Product";

export const Category = objectType({
  name: "Category",
  definition(t) {
    t.int("id");
    t.string("name");
    t.list.field("products", {
      type: Product,
      async resolve(root) {
        return await prisma.product.findMany({
          where: { categoryId: root.id },
        });
      },
    });
  },
});
