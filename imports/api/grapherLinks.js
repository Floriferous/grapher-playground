import SubLinks from './subLinks';
import Links from './links';
import A from './A';
import B from './B';
import C from './C';

A.addLinks({
  B: {
    field: 'bLinks',
    collection: B,
    type: 'many',
    metadata: true
  }
});

B.addLinks({
  C: {
    field: 'cLinks',
    collection: C,
    type: 'many',
    metadata: true,
    unique: true
  },
  A: {
    collection: A,
    inversedBy: 'B'
  }
});

C.addLinks({
  B: {
    collection: B,
    inversedBy: 'C'
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
