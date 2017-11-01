import React, { Component } from 'react';
import "../client/css/home.css";
import { Col, Row, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class Home extends TrackerReact(Component) { 

	isUser() {
		if (Meteor.user()){
			return <a href="/profilemain">{Meteor.user().username}</a>
		}else if (!Meteor.loggingIn()){
			return <a href="/login">Login</a>
		}
	}

	render() {
		return (	
			<div className="upper-container">
			<Row className="nav-bar">
			<Col sm={3} className="left-bar">
				<a href="#">About</a>
				<a href="#">Service</a>
				<a href="#">Contact</a>
			</Col>
			<Col sm={8} className="mid-bar">
				<h3> Froomie! </h3>
			</Col>
			<Col sm={1} className="right-bar">	
				{this.isUser()}
			</Col>
			</Row>

			<h3 className="Caption">Find The Perfect Roommate For You</h3>
			
			<Row sm={6} className="buttons">
			<Col sm={3}>
			<Link to="/signupwithplace" style={{ textDecoration: 'none' }}>
			<Button bsStyle="primary" bsSize="large" className="WithPlace" block>I have a place</Button>
			</Link>
			</Col>
			<Col sm={3}>
			<Link to="/signupwithoutplace" style={{ textDecoration: 'none' }}>
			<Button bsStyle="primary" bsSize="large" className="WithoutPlace" block>I do not have a place</Button>
			</Link>
			</Col>
			</Row>
			</div>
		);
	}
}