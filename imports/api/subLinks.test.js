// @flow
/* eslint-env mocha */
import { expect } from 'chai';

import Links from './links';
import SubLinks from './subLinks';
import './grapherLinks';

describe('remove', () => {
  beforeEach(() => {
    Links.remove({});
    SubLinks.remove({});
  });

  it('does not remove the parent object', () => {
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

    expect(link.subLinkIds).to.deep.equal([{ _id: subLinkId }]);

    SubLinks.remove(subLinkId);

    link = Links.findOne(linkId);

    expect(link.subLinkIds).to.deep.equal([]);
  });
});
