import resolvers from "./ride.resolvers";
import gqlLoader from "../../utils/gqlLoader";

export default {resolvers, typeDefs: gqlLoader('ride/ride.graphql')}