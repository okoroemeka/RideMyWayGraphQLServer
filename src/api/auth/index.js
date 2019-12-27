import resolvers from "./auth.resolver";
import gqlLoader from "../../utils/gqlLoader";
export default{resolvers, typeDefs: gqlLoader('auth/auth.graphql')};