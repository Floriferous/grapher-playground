// @flow
import React from 'react';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import { query } from '../api/links';

type QueryProps = {};

const Query = (props: QueryProps) => {
  return (
    <div>
      <h2>This should show the name of all links + hello world at the end:</h2>
      {props.data && props.data.map(({ reducer2 }) => <p>{reducer2}</p>)}
    </div>
  );
};

export default withQuery(() => query.clone())(Query);
