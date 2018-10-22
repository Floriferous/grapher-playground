import { Meteor } from 'meteor/meteor';
import Links, { query, query2 } from '/imports/api/links';

query.expose({
  firewall: () => undefined
});
query2.expose({
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
    body: { title: 1, $options: { sort: { createdAt: -1 } } },
    reduce: ({ title }) => title
  }
});
