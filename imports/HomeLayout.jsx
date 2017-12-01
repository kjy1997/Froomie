import React, { Component } from 'react';
import "../client/css/home.css";
import { Col, Row, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class Home extends TrackerReact(Component) { 

	isUser() {
		if (Meteor.user()){
			return <a href="/profilemain">{Meteor.user().username}</a>
		}
		else if (!Meteor.loggingIn()){
			return <a href="/login">Login</a>
		}
	}

	render() {
		return (	
			<div className="upper-container">
				<div className="nav-bar">
					<span className="left-bar">
						<a href="#">About</a>
						<a href="#">Service</a>
						<a href="#">Contact</a>
					</span>
					<span className="mid-bar">
						<h3> Froomie! </h3>
					</span>
					<span className="right-bar">	
						{this.isUser()}
					</span>
				</div>

				<h3 className="caption">Find The Perfect Roommate For You</h3>
				
				<div sm={6} className="buttons">
					<button className="homeButton withPlace">
						<a href="/signupwithplace">I have a place</a>
					</button>
					<button className="homeButton withoutPlace">
						<a href="/signupwithoutplace">I do not have a place</a>
					</button>
				</div>
			</div>
		);
	}
}