import Comments from './Comments';
import Posts from './Posts';

export const commentQuery = Comments.createQuery('singleComment', {
  text: 1
});

export const postQuery = Posts.createQuery('post', {
  text: 1,
  comments: { text: 1 }
});

export const currentUser = Meteor.users.createQuery('currentUser', {
  emails: 1,
  comments: { text: 1 }
});
