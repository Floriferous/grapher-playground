// @flow
/* eslint-env mocha */
import { expect } from 'chai';

import { Mongo } from 'meteor/mongo';

const A = new Mongo.Collection('a');
const B = new Mongo.Collection('b');
const C = new Mongo.Collection('c');

A.addLinks({
  b: {
    field: 'bLinks',
    collection: B,
    type: 'many',
    metadata: true
  }
});

B.addLinks({
  a: {
    collection: A,
    inversedBy: 'b'
  },
  c: {
    collection: C,
    inversedBy: 'b'
  }
});

C.addLinks({
  b: {
    field: 'bLinks',
    collection: B,
    type: 'many',
    metadata: true
  }
});

describe('links', () => {
  it('should not throw when an unknown id is set as a link', () => {
    const bId = B.insert({});
    const cId = C.insert({ bLinks: [{ _id: 'unknownId' }, { _id: bId }] });

    const result = C.createQuery({
      b: {
        a: {
          _id: 1
        }
      }
    }).fetchOne();

    expect(result).to.not.equal(undefined);
  });
});
