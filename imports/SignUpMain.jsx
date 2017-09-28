import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import '../client/css/signupmain.css'

export default class SignUpMain extends Component { 
	render() {
		return (
			<div>
			<Row className="top-bar">
			<Col sm={3} className="logo">
				<h3>Froomie!</h3>
			</Col>
			</Row>
			</div>
		);
	}
}