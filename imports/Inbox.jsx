import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../client/css/inbox.css";
import Navbar from './Navbar.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Col, Row, Button } from 'react-bootstrap';
import { Mongo } from 'meteor/mongo';
import { Messages } from './api/messages.js';
import { createContainer } from 'react-meteor-data';


class Inbox extends Component {
	
	constructor(props) {
		super(props);
		Meteor.subscribe('allMessages');
	}
	getMessages() {
		let messagesArray = [];
		
		Messages.find().fetch().forEach(function (message) {
			if(message.to == Meteor.user().username) {
				messagesArray.push(
					<Row className="messageRow">
					<h3>{"From: " + message.sender}</h3>
					<Col sm={10}>
						<p> {message.body} </p>
					</Col>
					</Row>
				)
			}
		}, this);
		
		return messagesArray
		
		
	}

	render() {
		return (
		<div>
				<Navbar plain={false} />
				<Row className="content">
					<Col sm={9} className="inbox">
						<h3>Inbox</h3>
						<div>
						{this.getMessages()}
						</div>
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
