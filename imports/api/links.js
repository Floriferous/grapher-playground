import Comments from './Comments';
import Posts from './Posts';

Posts.addLinks({
  comments: {
    type: 'many',
    collection: Comments,
    field: 'commentIds'
  }
});

Comments.addLinks({
  posts: {
    type: 'one',
    collection: Posts,
    inversedBy: 'comments'
  },
  user: {
    type: 'one',
    collection: Meteor.users,
    field: 'userId'
  }
});

Meteor.users.addLinks({
  comments: {
    inversedBy: 'user',
    collection: Comments
  }
});
