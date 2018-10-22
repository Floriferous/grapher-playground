// @flow
/* eslint-env mocha */
import { expect } from 'chai';

import Links from './links';
import SubLinks from './subLinks';
import './grapherLinks';

describe('SubLinks', () => {
  let subLinkId;
  let linkId;

  beforeEach(() => {
    Links.remove({});
    SubLinks.remove({});

    subLinkId = SubLinks.insert({});
    linkId = Links.insert({
      subLinkIds: [{ _id: subLinkId, array: ['id1', 'id2'] }]
    });
  });

  describe('queries', () => {
    it('metadata works without the reducer', () => {
      const subLink = SubLinks.createQuery({
        $filters: { _id: subLinkId },
        links: {
          _id: 1,
          reducer: false,
          subLinks: { _id: 1, links: { _id: 1 } }
        }
      }).fetchOne();

      expect(subLink.links[0].$metadata.array).to.deep.equal(['id1', 'id2']);
    });

    it('metadata fails with the reducer', () => {
      const subLink = SubLinks.createQuery({
        $filters: { _id: subLinkId },
        links: {
          _id: 1,
          reducer: true,
          subLinks: { _id: 1 }
        }
      }).fetchOne();

      expect(subLink.links[0].$metadata.array).to.deep.equal(['id1', 'id2']);
    });
  });
});
