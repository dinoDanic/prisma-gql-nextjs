import {
  enumType,
  extendType,
  floatArg,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import prisma from "../../lib/prisma";
import { Category } from "./Category";
import { CurrencyEnum } from "./Enum";
import { User } from "./User";

export const Product = objectType({
  name: "Product",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("code");
    t.float("price");
    t.string("currency");
    t.field("creator", {
      type: User,
      async resolve(root) {
        return await prisma.user.findFirst({ where: { id: root.userId } });
      },
    });
    t.int("userId");
    t.int("categoryId");
    t.field("category", {
      type: Category,
      async resolve(root) {
        return await prisma.category.findFirst({
          where: { id: root.categoryId },
        });
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

const CreateProductInput = inputObjectType({
  name: "CreateProductInput",
  definition(t) {
    t.nonNull.field("currency", {
      type: CurrencyEnum,
    });
    t.nonNull.string("name");
    t.nonNull.string("code");
    t.nonNull.int("price");
    t.nonNull.int("categoryId");
    t.nonNull.int("userId");
  },
});

export const CreateProductMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createProduct", {
      type: Product,
      args: { input: CreateProductInput },
      async resolve(root, args, ctx) {
        return await prisma.product.create({
          data: args.input,
        });
      },
    });
  },
});
