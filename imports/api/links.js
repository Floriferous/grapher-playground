import { Mongo } from 'meteor/mongo';

export default (Links = new Mongo.Collection('links'));

export const query = Links.createQuery('myQuery', {
  stuff2: 1
});
