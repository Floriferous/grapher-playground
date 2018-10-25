import SubLinks from './subLinks';
import Links from './links';
import A from './A';
import B from './B';
import C from './C';
import D from './D';

A.addLinks({
  b: {
    inversedBy: 'a',
    collection: B
  },
  d: {
    field: 'dLinks',
    collection: D,
    type: 'many',
    metadata: true,
    autoremove: true,
    unique: true
  }
});

B.addLinks({
  a: {
    field: 'aLinks',
    collection: A,
    type: 'many',
    metadata: true
  },
  c: {
    field: 'cLinks',
    collection: C,
    type: 'many',
    unique: true,
    metadata: true,
    autoremove: true
  }
});

C.addLinks({
  b: {
    collection: B,
    inversedBy: 'c'
  },
  d: {
    field: 'dLinks',
    collection: D,
    type: 'many',
    metadata: true
  }
});

D.addLinks({
  a: {
    collection: A,
    inversedBy: 'd'
  },
  c: {
    collection: C,
    inversedBy: 'd',
    autoremove: true
  }
});

// Links.addReducers({
//   reducer: {
//     body: {
//       subLinkIds: 1
//     },
//     reduce: () => {
//       return 'hello world';
//     }
//   }
// });

// SubLinks.addLinks({
//   links: {
//     collection: Links,
//     inversedBy: 'subLinks'
//   }
// });

Meteor.startup(() => {});
