import { Mongo } from 'meteor/mongo';

export default (Links = new Mongo.Collection('links'));

export const query = Links.createQuery('myQuery', {
  reducer2: 1
});

export const query2 = Links.createQuery('myQuery2', {
  reducer3: 1
});
