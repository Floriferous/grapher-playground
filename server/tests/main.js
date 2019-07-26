import assert from 'assert';
import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';

const A = new Mongo.Collection('a');
const B = new Mongo.Collection('b');

A.addLinks({
  b: {
    field: 'bLink',
    collection: B,
    type: 'one',
    metadata: true
  },
  b2: {
    field: 'b2Links',
    collection: B,
    type: 'many',
    metadata: true
  }
});

B.addLinks({
  a: {
    inversedBy: 'b',
    collection: A
  },
  a2: {
    inversedBy: 'b',
    collection: A,
    type: 'many'
  }
});

describe('grapher-playground', function() {
  beforeEach(() => {
    A.remove({});
    B.remove({});

    const bId = B.insert({ _id: 'bId', title: 'hello', desc: 'desc' });
    const b2Id = B.insert({ _id: 'b2Id', title: 'hello2', desc: 'desc2' });
    A.insert({
      _id: 'aId',
      bLink: { _id: 'bId', meta: 'yo' },
      b2Links: [{ _id: 'b2Id', meta: 'yo2' }]
    });
  });

  it('returns the right data when fragment is in this order', () => {
    const result = A.createQuery({
      $filters: { _id: 'aId' },
      b2Links: 1,
      b2: { title: 1 },
      b: { title: 1 },
      bLinks: 1
    }).fetch();

    expect(result[0]).to.deep.equal({
      _id: 'aId',
      b: {
        $metadata: { meta: 'yo' },
        _id: 'bId',
        title: 'hello'
      }
    });
  });

  it('returns the wrong data when fragment is in other order', () => {
    const result = A.createQuery({
      $filters: { _id: 'aId' },
      b2Links: 1,
      b2: { title: 1 },
      bLinks: 1,
      b: { title: 1 }
    }).fetch();

    expect(result[0]).to.deep.equal({
      _id: 'aId',
      b: {
        $metadata: { meta: 'yo' },
        _id: 'bId',
        title: 'hello'
      }
    });
  });
});
