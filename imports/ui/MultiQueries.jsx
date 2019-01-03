import React from 'react';
import { compose } from 'recompose';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import { commentQuery, postQuery, currentUser } from '../api/queries';

const MultiQueries = props => {
  console.log('props', props);
  const { currentUser, comment } = props;
  return (
    <div>
      <h3>
        There is one user (currently logged in), and 2 comments on the server.
        Both comments are linked to the user.
      </h3>
      <h3>The reactive query for the user gets all comments (2)</h3>
      <h3>
        The reactive query for the first comment should only get 1 comment, but
        it has 2
      </h3>
      <span>
        Comments (should be one): <h1>{comment.length}</h1>
      </span>
    </div>
  );
};

export default compose(
  withQuery(() => currentUser.clone(), {
    reactive: true,
    dataProp: 'currentUser',
    loadingComponent: () => <h1>Loading 1</h1>,
    single: true
  }),
  withQuery(
    ({ currentUser: { comments } }) => {
      // FIXME:  Passing one single commentId here -> Should only return this comment
      return commentQuery.clone({ commentId: comments[0]._id });
    },
    {
      reactive: true,
      dataProp: 'comment',
      loadingComponent: () => <h1>Loading 2</h1>
    }
  )
)(MultiQueries);
