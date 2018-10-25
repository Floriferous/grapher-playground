import C from './C';

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

export const query5 = C.createQuery('myQuery5', {
  $filter({ filters, params }) {},
  text: 1,
  d: {
    _id: 1,
    text: 1,
    a: { text: 1 }
  }
});
