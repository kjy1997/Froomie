import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Navbar from './Navbar.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Col, Row } from 'react-bootstrap';
import { Mongo } from 'meteor/mongo';
import { Messages } from './api/messages.js';
import { createContainer } from 'react-meteor-data';


class Inbox extends Component {
	
	constructor(props) {
		super(props);
	}
	

	render() {
		return (
		<div>
				<Navbar plain={false} />
				<Row className="content">
					<Col sm={3} className="inbox">
						<h3>Inbox</h3>	
					</Col>
					<Col sm={9} className="display">	
						<p> Select  a message </p>
					</Col>
				</Row>
		</div>
				
		);
	}
	
	
	
	
}

export default createContainer(() => {
	return {
		messages: Messages.find().fetch(),
		filters: {}
	};
}, Inbox);
