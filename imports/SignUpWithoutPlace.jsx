import React, { Component } from 'react';
import { Col, Row, Button, FormControl,Image } from 'react-bootstrap';
import SignUpMain from './SignUpMain'

export default class SignUpWithoutPlace extends Component { 
	renderSignUpMain() {
		return this.getTasks().map((task) => (
      		<SignUpMain key={task._id} task={task} />
    	));
	}

	render() {
		return (
			<div>
				<SignUpMain/>
				<div className="container">
					<Row className="place">
        				<Col sm={4} className="subtitle">
         	 				<h2>About Your Stay</h2>
       	 				</Col>
       	 			</Row>
       	 			<Row>
       	 		 <FormControl
				   		className="input"
            			type="text"
            			placeholder="Budget"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Move in date"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Length of stay"
          			/>
       	 	</Row>
       	 
				</div>
				

				<div className="container">
		<Row className="button-row">
		<Col sm={3} className="blank">
       	 </Col>
       	 <Col sm={6} className="btn-content">
       	 	 <Button className="submit" type="submit">
          Submit
        </Button>
       	 </Col>
       	 <Col sm={3} className="blank">
       	 </Col>
        </Row>
        </div>
			

			</div>


		);
	}
}