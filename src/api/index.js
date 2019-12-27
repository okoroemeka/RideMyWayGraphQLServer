import auth from './auth';
import { merge } from 'lodash';
import models from '../db/models';

export default {
  typeDefs: [auth.typeDefs].join(' '),
  resolvers: merge({}, auth.resolvers),
  context: req => ({ ...req, models })
};
