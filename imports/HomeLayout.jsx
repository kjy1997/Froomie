import React, { Component } from 'react';
import "../client/css/home.css";
import { Col, Row, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 

export default class Home extends Component { 

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
				<a href="#">Login</a>
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