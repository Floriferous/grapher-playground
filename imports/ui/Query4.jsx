// @flow
import React from 'react';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import { query3 } from '../api/C';

type Query3Props = {};

const Query3 = (props: Query3Props) => {
  console.log('dLinks should not appear in this tree of data');
  console.log('query3 data', props.data);
  return (
    <div>
      <h2>Reactive: true</h2>
      <h3>dLinks should not appear in this data I believe?</h3>
      <button onClick={() => Meteor.call('generate')}>Generate</button>
      {props.data && JSON.stringify(props.data)}
    </div>
  );
};

export default withQuery(() => query3.clone({ cId: 'test' }), {
  reactive: true,
  single: true
})(Query3);
