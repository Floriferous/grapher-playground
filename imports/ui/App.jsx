import React from 'react';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import Query from './Query.jsx';
import Query2 from './Query2.jsx';
import MultiQueries from './MultiQueries.jsx';
import { lifecycle } from 'recompose';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

const App = () => (
  <div>
    {/* <Info /> */}
    <MultiQueries />
    {/* <Query />
    <Query2 /> */}
  </div>
);

export default lifecycle({
  componentDidMount() {
    Meteor.loginWithPassword('test@test.com', '123456');
  }
})(App);
