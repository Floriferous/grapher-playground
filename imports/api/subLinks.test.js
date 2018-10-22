// @flow
/* eslint-env mocha */
import { expect } from 'chai';

import Links from './links';
import SubLinks from './subLinks';
import './grapherLinks';

describe('SubLinks', () => {
  beforeEach(() => {
    Links.remove({});
    SubLinks.remove({});
  });

  describe('queries', () => {
    it('links are working', () => {
      const subLinkId = SubLinks.insert({});
      const linkId = Links.insert({ subLinkIds: [{ _id: subLinkId }] });

      const subLink = SubLinks.createQuery({
        $filters: { _id: subLinkId },
        links: { _id: 1 }
      }).fetchOne();

      expect(subLink.links[0]._id).to.equal(linkId);
    });

    it('links are working', () => {
      const subLinkId = SubLinks.insert({});
      const linkId = Links.insert({ subLinkIds: [{ _id: subLinkId }] });

      const link = Links.createQuery({
        $filters: { _id: linkId },
        subLinks: { _id: 1 }
      }).fetchOne();

      expect(link.subLinks[0]._id).to.equal(subLinkId);
    });
  });

  describe('remove', () => {
    it('does not remove the parent object when removed', () => {
      const subLinkId = SubLinks.insert({});
      const linkId = Links.insert({ subLinkIds: [{ _id: subLinkId }] });
      let link = Links.findOne(linkId);

      expect(Links.find({}).count()).to.equal(1);
      expect(SubLinks.find({}).count()).to.equal(1);

      SubLinks.remove(subLinkId);

      expect(Links.find({}).count()).to.equal(1);
      expect(SubLinks.find({}).count()).to.equal(0);
    });

    it('should delete the link id', () => {
      const subLinkId = SubLinks.insert({});
      const linkId = Links.insert({ subLinkIds: [{ _id: subLinkId }] });
      let link = Links.findOne(linkId);

      SubLinks.remove(subLinkId);

      link = Links.findOne(linkId);

      expect(link.subLinkIds).to.deep.equal([]);
    });
  });
});
