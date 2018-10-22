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

Links.addReducers({
  reducer: {
    body: {
      subLinkIds: 1
    },
    reduce: () => {
      return 'hello world';
    }
  }
});

SubLinks.addLinks({
  links: {
    collection: Links,
    inversedBy: 'subLinks'
  }
});
