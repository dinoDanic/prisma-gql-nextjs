import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

export const typeDefs = `#graphql
 type Link {
    id: String
    title: String
    description: String
    url: String
    category: String
    imageUrl: String
    users: [String]
  }
  type Query {
    links: [Link]!
  }
`;
