import { Meteor } from 'meteor/meteor';
import { Match } from 'meteor/check';

import Posts from '/imports/api/Posts';
import Comments from '/imports/api/Comments';
import { commentQuery, postQuery, currentUser } from '/imports/api/queries';
import '/imports/api/links';
import { Accounts } from 'meteor/accounts-base';

commentQuery.expose({
  firewall: (userId, params) => {
    params.userId = userId;
  },
  embody: {
    $filter({ filters, params }) {
      console.log('params', params);
      filters.userId = params.userId;
      filters._id = params.commentId;
      console.log('filters', filters);
    }
  },
  validateParams: {
    userId: Match.Maybe(String),
    commentId: Match.Maybe(String)
  }
});

postQuery.expose({});
currentUser.expose({
  firewall(userId, params) {
    params.userId = userId;
  },
  embody: {
    $filter({ filters, params }) {
      filters._id = params.userId;
    }
  },
  validateParams: { userId: Match.Maybe(String) }
});

Meteor.startup(() => {
  if (Meteor.users.find({}).count() === 0) {
    Accounts.createUser({ email: 'test@test.com', password: '123456' });
  }

  let { _id: userId } = Meteor.users.find({}).fetch()[0];

  Posts.remove({});
  Comments.remove({});

  // const postId = Posts.insert({ text: 'hello friends', userId });
  const commentId1 = Comments.insert({ text: 'Comment 1', userId });
  const commentId2 = Comments.insert({ text: 'Comment 2', userId });

  const link = Meteor.users.getLink(userId, 'comments');

  link.add(commentId1);
  link.add(commentId2);
  // If the Links collection is empty, add some data.
});
