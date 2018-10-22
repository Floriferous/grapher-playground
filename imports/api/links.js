import { Mongo } from 'meteor/mongo';

export default (Links = new Mongo.Collection('links'));

export const query = Links.createQuery('myQuery', {
  reducer2: 1
});
