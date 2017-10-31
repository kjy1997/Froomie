import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Bootstrap from '../client/css/bootstrap/bootstrap.css';
import '../imports/uploadpic/upload.js';

import App from '../imports/App.jsx';
 
Meteor.startup(() => {
    //console.log(process.env)
    render(
    	<App />, document.getElementById('main-app')
    );
});
