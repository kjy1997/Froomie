import React, { Component } from 'react';
import { Col, Row, Button, FormControl,Image } from 'react-bootstrap';
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
				<div className="container">
					<Row className="place">
        				<Col sm={4} className="subtitle">
         	 				<h2>About Your Place</h2>
       	 				</Col>
       	 			</Row>
       	 			<Row className="place-input">
       	 				 <FormControl
				   		className="address"
            			type="text"
            			placeholder="Type your address..."
          			/>
       	 			</Row>
       	 			<Row>
       	 		 <FormControl
				   		className="input"
            			type="text"
            			placeholder="Type of property"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Number of rooms"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Number of bathrooms"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Internet access"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Parking"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Air conditioning"
          			/>
       	 	</Row>
       	 
				</div>
					{/* About your room */}
					<div className="container">
					<Row className="place">
        				<Col sm={4} className="subtitle">
         	 				<h2>About Your Room</h2>
       	 				</Col>
       	 			</Row>
       	
       	 			<Row>
       	 		 <FormControl
				   		className="input"
            			type="text"
            			placeholder="Monthly Rent"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Security Deposit"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Room Type"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Furnishing"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Bathroom Type"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Preferred Gender"
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