import React from 'react';
import { compose } from 'recompose';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import { commentQuery, postQuery, currentUser } from '../api/queries';

const MultiQueries = props => {
  console.log('props', props);
  const { currentUser, comments } = props;
  return (
    <div>
      Hello from MultiQueries
      <p>Comments (should be one): {comments.length}</p>
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
      return commentQuery.clone({ commentId: comments[0]._id });
    },
    {
      reactive: true,
      dataProp: 'comments',
      loadingComponent: () => <h1>Loading 2</h1>
    }
  )
)(MultiQueries);
