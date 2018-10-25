import { Meteor } from 'meteor/meteor';
import Links, { query, query2 } from '/imports/api/links';
import C from '/imports/api/C';
import { query3, query5 } from '/imports/api/queries';
import A from '/imports/api/A';
import B from '/imports/api/B';
import D from '/imports/api/D';
import '/imports/api/grapherLinks';
import '/imports/api/clientReducers';

query.expose({
  firewall: () => undefined
});
query2.expose({
  firewall: () => undefined
});
query3.expose({
  firewall: () => undefined
});
query5.expose({
  firewall: () => undefined
});

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );

    insertLink('Follow the Guide', 'http://guide.meteor.com');

    insertLink('Read the Docs', 'https://docs.meteor.com');

    insertLink('Discussions', 'https://forums.meteor.com');
  }
});

Links.addReducers({
  reducer: {
    body: { title: 1 },
    reduce: ({ title }) => title + ' hello'
  },
  reducer2: {
    body: { reducer: 1 },
    reduce: ({ reducer }) => reducer + ' world'
  },
  reducer3: {
    body: { title: 1 },
    reduce: ({ title }) => title
  }
});

let dId;

Meteor.methods({
  generate: () => {
    A.remove({});
    B.remove({});
    C.remove({});
    D.remove({});

    dId = D.insert({ text: 'I am d' });
    const cId = C.insert({
      _id: 'test',
      text: 'I am c',
      dLinks: [{ _id: dId, array: ['yo', 'dude'] }]
    });
    const aId = A.insert({
      text: 'I am a',
      dLinks: [{ _id: dId, array: ['yo', 'dude'] }]
    });
    const bId = B.insert({
      text: 'I am b',
      aLinks: [{ _id: aId, array: ['yo', 'dude'] }],
      cLinks: [{ _id: cId, array: ['yo', 'dude'] }]
    });
  },
  addC: () => {
    const cId = C.insert({
      _id: 'test',
      text: 'I am c',
      dLinks: [{ _id: dId, array: ['yo', 'dude'] }]
    });
  }
});
