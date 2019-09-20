import assert from 'assert';
import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

describe.only('filters in body bug', function() {
  beforeEach(() => {
    Meteor.users.remove({});
  });

  it('returns the token from the server', () => {
    const userId = Accounts.createUser({ email: 'test@test.com' });

    const token = 'token';
    Meteor.users.update(userId, {
      $set: {
        services: { password: { reset: { token } } }
      }
    });

    const result = Meteor.users
      .createQuery({
        $filters: { 'services.password.reset.token': token },
        emails: 1
      })
      .fetchOne();

    expect(result.services).to.equal(undefined);

    console.log('result:', result);
  });
});
