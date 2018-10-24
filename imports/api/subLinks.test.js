// @flow
/* eslint-env mocha */
import { expect } from 'chai';

import A from './A';
import B from './B';
import C from './C';
import './grapherLinks';
import './server/reducers';

describe('metadata bug', () => {
  let subLinkId;
  let linkId;

  beforeEach(() => {
    A.remove({});
    B.remove({});
    C.remove({});

    cId = C.insert({});
    bId = B.insert({
      cLinks: [{ _id: cId, cMeta: ['one', 'two'] }]
    });
    aId = A.insert({
      bLinks: [{ _id: bId, bMeta: ['three', 'four'] }]
    });
  });

  describe.skip('queries', () => {
    it('No mongo error', () => {
      const item = C.createQuery({
        $filters: { _id: cId },
        B: {
          A: { _id: 1 },
          reducer1: true
        }
      }).fetchOne();

      console.log('C', item);
      const b = item.B;
      console.log('B', b);
      const a = b.A[0];
      console.log('A', a);
    });

    it('mongo error', () => {
      const item = C.createQuery({
        $filters: { _id: cId },
        B: {
          A: { _id: 1 },
          reducer2: true
        }
      }).fetchOne();

      console.log('C', item);
      const b = item.B;
      console.log('B', b);
      const a = b.A[0];
      console.log('A', a);
    });
  });

  describe('remove', () => {
    it('fails', () => {
      C.remove(cId);

      expect(B.findOne(bId).cLinks).to.deep.equal([]);
    });
  });
});
