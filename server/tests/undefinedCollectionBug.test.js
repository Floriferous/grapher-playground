import assert from 'assert';
import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';

const A = new Mongo.Collection('a2');
const B = new Mongo.Collection('b2');
const C = new Mongo.Collection('c2');

A.addLinks({
  bs: {
    field: 'bLinks',
    collection: B,
    type: 'many',
    metadata: true
  }
});

C.addLinks({
  bs: {
    collection: B,
    field: 'bLinks',
    type: 'many',
    metadata: true,
    autoremove: true,
    unique: true
  }
});

B.addLinks({
  c: {
    collection: C,
    inversedBy: 'bs',
    denormalize: {
      field: 'cCache',
      body: { _id: 1, name: 1 }
    }
  },
  as: {
    collection: A,
    inversedBy: 'bs',
    autoremove: true
  }
});

A.addReducers({
  category: {
    body: { bs: { c: { category: 1 } } },
    reduce: ({ bs = [] }) => (bs.length > 0 ? bs[0].c.category : undefined)
  }
});

describe.only('undefined collection bug', function() {
  beforeEach(() => {
    A.remove({});
    B.remove({});
    C.remove({});

    const bId = B.insert({ name: 'B1' });

    const aId1 = A.insert({
      _id: 'aId1',
      bLinks: [{ _id: bId }]
    });

    const cId = C.insert({
      _id: 'cId',
      name: 'C1',
      category: 'category1',
      bLinks: [{ _id: bId }]
    });
  });

  it('fails with the wrong bug', () => {
    // Throws "TypeError: Cannot read property 'collection' of undefined"
    const result = A.createQuery({
      category: 1,
      bs: { name: 1, c: { name: 1 } }
    }).fetchOne();

    expect(result.category).to.equal('category1');
  });
});
