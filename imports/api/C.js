import { Mongo } from 'meteor/mongo';

export default (C = new Mongo.Collection('c'));

export const query3 = C.createQuery('myQuery3', {
  $filter({ filters, params: { cId } }) {
    console.log('cId', cId);
    filters._id = cId;
  },
  text: 1,
  D: {
    _id: 1,
    text: 1,
    A: { text: 1 }
  }
});
