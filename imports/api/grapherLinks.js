import SubLinks from './subLinks';
import Links from './links';

Links.addLinks({
  subLinks: {
    field: 'subLinkIds',
    collection: SubLinks,
    type: 'many',
    metadata: true
  }
});

SubLinks.addLinks({
  links: {
    collection: Links,
    inversedBy: 'subLinks'
  }
});
