import React, { Component } from 'react';
import { Col, Row, Button, FormControl, Image } from 'react-bootstrap';
import SignUpMain from './SignUpMain';
import ReactDOM from 'react-dom';
import { Users } from './api/users.js';

export default class SignUpWithPlace extends Component { 
	renderSignUpMain() {
		return this.getTasks().map((task) => (
      		<SignUpMain key={task._id} task={task} />
    	));
	}

	 register(event) {
        event.preventDefault();

        var mainInfos = this.SignUpMain.infos();
        const address = ReactDOM.findDOMNode(this.refs.address).value.trim();
        const property = ReactDOM.findDOMNode(this.refs.property).value.trim();
        const rooms = ReactDOM.findDOMNode(this.refs.rooms).value.trim();
        const bathroom = ReactDOM.findDOMNode(this.refs.bathroom).value.trim();
        const internet = ReactDOM.findDOMNode(this.refs.internet).value.trim();
        const parking = ReactDOM.findDOMNode(this.refs.parking).value.trim();
        const ac = ReactDOM.findDOMNode(this.refs.ac).value.trim();
        const rent = ReactDOM.findDOMNode(this.refs.rent).value.trim();
        const deposit = ReactDOM.findDOMNode(this.refs.deposit).value.trim();
        const roomtype = ReactDOM.findDOMNode(this.refs.roomtype).value.trim();
        const furnishing = ReactDOM.findDOMNode(this.refs.furnishing).value.trim();
        const bathroomtype = ReactDOM.findDOMNode(this.refs.bathroomtype).value.trim();
        const prefergender = ReactDOM.findDOMNode(this.refs.prefergender).value.trim();

        Accounts.createUser({username: mainInfos.username , password: mainInfos.password}, (error) => {
            if (error) {
                console.log("Error: " + error.reason);
            } else {
                Users.update(Meteor.userId(), {
                    $set: {
                      "profile.email": mainInfos.email,
                      "profile.firstName": mainInfos.firstName,
                      "profile.lastName": mainInfos.lastName,
                      "profile.age": mainInfos.age,
                      "profile.gender": mainInfos.gender,
                      "profile.roomates": mainInfos.roommates,
                      "profile.about": mainInfos.about,
                      
                      "profile.place.address": address,
                      "profile.place.property": property,
                      "profile.place.rooms": rooms,
                      "profile.place.bathroom": bathroom,
                      "profile.place.internet": internet,
                      "profile.place.parking": parking,
                      "profile.place.ac": ac,
                      "profile.place.rent": rent,
                      "profile.place.deposit": deposit,
                      "profile.place.roomtype": roomtype,
                      "profile.place.furnishing": furnishing,
                      "profile.place.bathroomType": bathroomtype,
                      "profile.place.preferGender": prefergender
                     
                    }
                })
                console.log("Registered in user: " + Meteor.user().username);
            }
        });
    }

	render() {
		return (
			<div>
				<form onSubmit={this.register.bind(this)}>
				<SignUpMain onRef={ref => (this.SignUpMain = ref)}/>
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
            			ref="address"
          			/>
       	 			</Row>
       	 			<Row>
       	 		 <FormControl
				   		className="input"
            			type="text"
            			placeholder="Type of property"
            			ref="property"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Number of rooms"
            			ref="rooms"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Number of bathrooms"
            			ref="bathroom"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Internet access"
            			ref="internet"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Parking"
            			ref="parking"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Air conditioning"
            			ref="ac"
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
            			ref="rent"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Security Deposit"
            			ref="deposit"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Room Type"
            			ref="roomtype"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Furnishing"
            			ref="furnishing"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Bathroom Type"
            			ref="bathroomtype"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Preferred Gender"
            			ref="prefergender"
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
			
        </form>
			</div>


		);
	}
}