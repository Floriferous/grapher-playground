// @flow
import React from 'react';

import { withQuery } from 'meteor/cultofcoders:grapher-react';
import { query5 } from '../api/queries';

type Query5Props = {};

const Query5 = (props: Query5Props) => {
  if (props.data) {
    console.log('data', props.data);
    return (
      <div>
        <h1>Instructions</h1>
        <ul>
          <li>Click on "Add a D" ~20 times</li>
          <li>Click on "Add a C" ~10 times</li>
          <li>
            Each C should have red and blue text, because the link obviously
            exists
          </li>
          <li>
            Change Query5.jsx from reactive:true, to reactive:false to see the
            real data
          </li>
        </ul>
        <button onClick={() => Meteor.call('generate')}>Generate</button>
        <button onClick={() => Meteor.call('addC')}>Add a C</button>
        <button onClick={() => Meteor.call('addD')}>Add a D</button>
        {props.data.d.map(
          d =>
            d && (
              <span key={d._id}>
                <h4>{d.text}</h4>
                {d.c.length > 0 &&
                  d.c.map(c => (
                    <div key={c._id}>
                      <span style={{ color: 'red' }}>{c.text}</span>
                      &nbsp;
                      <span style={{ color: 'blue' }}>{c.dReducer}</span>
                      &nbsp;
                      <span style={{ color: 'green' }}>
                        {c.$metadata.array}
                      </span>
                    </div>
                  ))}
              </span>
            )
        )}
      </div>
    );
  }
  return <div>Hello from Query5</div>;
};

export default withQuery(() => query5.clone(), {
  reactive: true,
  single: true
})(Query5);
