import resolvers from './request.resolvers';
import gqlLoader from '../../utils/gqlLoader';

export default {
  resolvers,
  typeDefs: gqlLoader('request/request.graphql')
};
