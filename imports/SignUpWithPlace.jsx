import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import SignUpMain from './SignUpMain'

export default class SignUpWithPlace extends Component { 
	renderSignUpMain() {
		return this.getTasks().map((task) => (
      		<SignUpMain key={task._id} task={task} />
    	));
	}

	render() {
		return (
			<div>
				<SignUpMain/>
			</div>
		);
	}
}