// @flow
import React from 'react';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import { query } from '../api/links';

type QueryProps = {};

const Query = (props: QueryProps) => {
  console.log('props', props);
  return <div>Hello from Query</div>;
};

export default withQuery(() => query.clone())(Query);
