import { Mongo } from 'meteor/mongo';

export default (C = new Mongo.Collection('c'));

export const query3 = C.createQuery('myQuery3', {
  $filter({ filters, params: { cId } }) {
    filters._id = cId;
  },
  text: 1,
  aReducer: 1,
  dReducer: 1,
  d: {
    _id: 1,
    text: 1,
    a: { text: 1 }
  }
});
