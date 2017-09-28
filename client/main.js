import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Bootstrap from '../client/css/bootstrap/bootstrap.css';

import App from '../imports/App.jsx';
 
Meteor.startup(() => {
  render(
  	<App />, document.getElementById('main-app')
  );
});
