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

const dIds = ['id1', 'id2'];

Meteor.methods({
  generate: () => {
    A.remove({});
    B.remove({});
    C.remove({});
    D.remove({});

    const cId = C.insert({
      text: 'I am c',
      dLinks: []
    });
    const aId = A.insert({
      text: 'I am a',
      dLinks: []
    });
    const bId = B.insert({
      text: 'I am b',
      aLinks: [{ _id: aId, array: ['yo', 'dude'] }],
      cLinks: [{ _id: cId, array: ['yo', 'dude'] }]
    });
  },
  addC: nb => {
    const count = C.find({}).count();
    const dCount = D.find({}).count();

    const random = () => Math.floor(dCount * Math.random());
    let links = [];

    for (let index = 0; index < random(); index++) {
      const dId = random();
      links.push({ _id: 'id' + dId, array: ['yo' + dId, 'dude' + dId] });
    }

    const cId = C.insert({
      text: 'I am c ' + count,
      dLinks: links
    });
  },
  addD: () => {
    const count = D.find({}).count();
    const newId = D.insert({ _id: 'id' + count, text: 'I am d ' + count });
    console.log('newId', newId);

    A.update({}, { $push: { dLinks: { _id: newId, array: ['yo', 'dude'] } } });
    D.update({}, { $push: { dLinks: { _id: newId, array: ['yo', 'dude'] } } });
  }
});
