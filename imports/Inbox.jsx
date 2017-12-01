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
	getMessages() {
		let messagesArray = [];
		
		Messages.find().forEach(function (message) {
			messagesArray.push(
				<Row>
				<h3> {"From: " + message.from} </h3>
				<h3> {message.date} </h3>
				<Button className="replybtn">
				 Reply
				</Button>
				</Row>
			)
		}, this);
		
		return messagesArray
		
		
	}

	render() {
		return (
		<div>
				<Navbar plain={false} />
				<Row className="content">
					<Col sm={3} className="inbox">
						<h3>Inbox</h3>	
						<Row>
						 {this.getMessages()}
						</Row>
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
