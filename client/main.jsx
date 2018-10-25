import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import '/imports/api/A';
import '/imports/api/B';
import '/imports/api/C';
import '/imports/api/D';
import '/imports/api/clientReducers';
import '/imports/api/grapherLinks';

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});
