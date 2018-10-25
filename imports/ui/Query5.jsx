// @flow
import React from 'react';

import { withQuery } from 'meteor/cultofcoders:grapher-react';
import { query5 } from '../api/queries';

type Query5Props = {};

const Query5 = (props: Query5Props) => {
  if (props.data) {
    return (
      <div>
        <button onClick={() => Meteor.call('generate')}>Generate</button>
        <button onClick={() => Meteor.call('addC')}>Add a C</button>
        {props.data.map(c => (
          <span key={c._id}>
            <h4>{c.text}</h4>
            {JSON.stringify(c.d[0].text)}
          </span>
        ))}
        ;
      </div>
    );
  }
  return <div>Hello from Query5</div>;
};

export default withQuery(() => query5.clone(), {
  reactive: true
})(Query5);
