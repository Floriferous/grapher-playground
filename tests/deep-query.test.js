// @flow
/* eslint-env mocha */
import { expect } from 'chai';

const A = new Mongo.Collection('a');
const B = new Mongo.Collection('b');

A.addReducers({
  reducer: {
    body: {
      field: {
        main: { min: { a: 1, b: 2 }, max: { a: 1, b: 2 } },
        second: { min: { a: 1, b: 2 }, max: { a: 1, b: 2 } }
      }
    },
    reduce: () => {
      return 'hello';
    }
  }
});

describe('deep-query', () => {
  beforeEach(() => {
    A.remove({});
  });

  it('does not work with the reducer', () => {
    A.insert({
      field: {
        main: { min: { a: 1, b: 2 }, max: { a: 1, b: 2 } },
        second: { min: { a: 1, b: 2 }, max: { a: 1, b: 2 } }
      }
    });

    const result = A.createQuery({
      field: { main: { min: { a: 1 }, max: 1 } },
      reducer: 1
    }).fetch();

    console.log('result with reducer', JSON.stringify(result[0], null, 2));

    expect(result[0].field.main.min).to.not.equal(undefined);
    expect(result[0].field.main.max).to.not.equal(undefined); // fails!
  });

  it('does work without the reducer', () => {
    A.insert({
      field: {
        main: { min: { a: 1, b: 2 }, max: { a: 1, b: 2 } },
        second: { min: { a: 1, b: 2 }, max: { a: 1, b: 2 } }
      }
    });

    const result = A.createQuery({
      field: { main: { min: { a: 1 }, max: 1 } },
      reducer: false
    }).fetch();

    console.log('result without reducer', JSON.stringify(result[0], null, 2));

    expect(result[0].field.main.min).to.not.equal(undefined);
    expect(result[0].field.main.max).to.not.equal(undefined);
  });
});
