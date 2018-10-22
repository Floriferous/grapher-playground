// @flow
import React from 'react';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import { query2 } from '../api/links';

type QueryProps = {};

const Query = (props: QueryProps) => {
  console.log('props', props);
  return (
    <div>
      <h2>This query fails because of $options in reducer body</h2>
      {props.data && props.data.map(({ reducer2 }) => <p>{reducer2}</p>)}
    </div>
  );
};

console.log('query type', typeof query2);

export default withQuery(() => query2.clone())(Query);
