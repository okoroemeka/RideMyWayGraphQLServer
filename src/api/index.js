import merge from 'lodash/merge';
import auth from './auth';
import ride from './ride';
import request from './request';
import models from '../db/models';

export default {
  typeDefs: [auth.typeDefs, ride.typeDefs, request.typeDefs].join(' '),
  resolvers: merge({}, auth.resolvers, ride.resolvers, request.resolvers),
  context: req => ({ ...req, models })
};
