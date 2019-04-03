// @flow
/* eslint-env mocha */
import { expect } from 'chai';
import { autoMigrate } from 'meteor/herteby:denormalize';
import { Meteor } from 'meteor/meteor';

const Posts = new Mongo.Collection('posts');
const Users = Meteor.users;
const Organisations = new Mongo.Collection('organisations');

Posts.addLinks({
  user: {
    collection: Users,
    field: 'userId',
    type: 'one',
    denormalize: {
      field: 'userCache',
      body: {
        referredBy: 1
      },
      bypassSchema: true
    }
  }
});

Users.addLinks({
  posts: {
    collection: Posts,
    inversedBy: 'user'
  },
  referredByOrganisation: {
    collection: Organisations,
    field: 'referredBy',
    type: 'one'
  }
});

Organisations.addLinks({
  referredUsers: {
    collection: Users,
    inversedBy: 'referredByOrganisation'
  }
});

Posts.before.remove(() => {});
Posts.after.update(() => {});

autoMigrate();

const query = Posts.createQuery('myQuery', {
  $filter({ filters, params }) {
    filters['userCache.referredBy'] = params.organisationId;
  }
});

query.expose({
  firewall: () => {}
});

describe('test suite name', () => {
  beforeEach(() => {
    Posts.remove({});
    Users.remove({});
    Organisations.remove({});
  });

  it('should find a user', () => {
    const orgId = Organisations.insert({ name: 'Google' });
    const userId = Users.insert({ referredBy: orgId });
    const postId = Posts.insert({ userId });

    const posts = query.clone({ organisationId: orgId }).fetch();
    console.log('posts:', posts);

    expect(posts.length).to.equal(1);
  });
});
