import { GraphQLServer } from "graphql-yoga";
import graphQlServer from "./api";

const createServer = ()=>{
  return new GraphQLServer(graphQlServer)
}

export default createServer;