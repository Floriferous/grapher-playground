import SubLinks from './subLinks';
import Links from './links';
import A from './A';
import B from './B';
import C from './C';
import D from './D';

A.addLinks({
  B: {
    inversedBy: 'A',
    collection: B
  },
  D: {
    field: 'dLinks',
    collection: D,
    type: 'many',
    metadata: true,
    autoremove: true,
    unique: true
  }
});

B.addLinks({
  A: {
    field: 'aLinks',
    collection: A,
    type: 'many',
    metadata: true
  },
  C: {
    field: 'cLinks',
    collection: C,
    type: 'many',
    unique: true,
    metadata: true,
    autoremove: true
  }
});

C.addLinks({
  B: {
    collection: B,
    inversedBy: 'C'
  },
  D: {
    field: 'dLinks',
    collection: D,
    type: 'many',
    metadata: true
  }
});

D.addLinks({
  A: {
    collection: A,
    inversedBy: 'D'
  },
  C: {
    collection: C,
    inversedBy: 'D',
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
