import { expect } from 'chai';
import { Mongo } from 'meteor/mongo';

const Posts = new Mongo.Collection('posts');
const Comments = new Mongo.Collection('comments');

Posts.addLinks({
  comments: {
    field: 'commentIds',
    collection: Comments,
    type: 'many'
  }
});

Comments.addLinks({
  posts: {
    collection: Posts,
    inversedBy: 'comments'
  }
});

describe('links', () => {
  beforeEach(() => {
    Posts.remove({});
    Comments.remove({});
  });

  it('can be removed', () => {
    const commentId = Comments.insert({ text: 'hello' });
    const commentId2 = Comments.insert({ text: 'hello' });
    const postId = Posts.insert({ commentIds: [commentId2, commentId] });

    let post = Posts.findOne(postId);
    expect(post.commentIds).to.deep.equal([commentId2, commentId]);

    const inversedLink = Comments.getLink(commentId, 'posts');
    inversedLink.remove(postId);

    post = Posts.findOne(postId);
    expect(post.commentIds).to.deep.equal([commentId2]);
  });

  it('fails when calling remove with undefined', () => {
    const commentId = Comments.insert({ text: 'hello' });
    const commentId2 = Comments.insert({ text: 'hello' });
    const postId = Posts.insert({ commentIds: [commentId2, commentId] });

    let post = Posts.findOne(postId);
    expect(post.commentIds).to.deep.equal([commentId2, commentId]);

    const inversedLink = Comments.getLink(commentId, 'posts');
    inversedLink.remove(undefined);
  });
});
