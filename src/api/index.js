import auth from './auth';
import ride from "./ride";
import merge  from 'lodash/merge';
import models from '../db/models';

export default {
  typeDefs: [auth.typeDefs,ride.typeDefs].join(' '),
  resolvers: merge({}, auth.resolvers, ride.resolvers),
  context: req => ({ ...req, models })
};
