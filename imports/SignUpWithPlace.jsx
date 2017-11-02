import React, { Component } from 'react';
import { Col, Row, Button, FormControl, Image, FormGroup, InputGroup } from 'react-bootstrap';
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

		if (mainInfos.username === '' || mainInfos.password === '' || mainInfos.email === '' || mainInfos.firstName === '' ||
			mainInfos.lastName === '' || mainInfos.age === '' || mainInfos.gender === 'select' || mainInfos.social === '' || address === '' || property === 'select' ||
			rooms === '' || internet === 'select' || parking === 'select' || ac === 'select' || rent === '' || deposit === '' || roomtype === 'select' ||
			furnishing === 'select' || bathroomtype === 'select' || prefergender === 'select' || mainInfos.about === '') {
			alert("You must fill in all the information!");
		} else {

			Accounts.createUser({ username: mainInfos.username, password: mainInfos.password }, (error) => {
				if (error) {
					console.log("Error: " + error.reason);
					alert("Error:" + error.reason);
				} else {
					Users.update(Meteor.userId(), {
						$set: {
							"profile.email": mainInfos.email,
							"profile.firstName": mainInfos.firstName,
							"profile.lastName": mainInfos.lastName,
							"profile.age": mainInfos.age,
							"profile.gender": mainInfos.gender,
							"profile.tags": mainInfos.tags,
							"profile.about": mainInfos.about,
							"profile.social" : mainInfos.social,

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
					alert(Meteor.user().username + " is registered!");

				}
			});
		}
	}

	//google places autocomplete api
	componentDidMount() {
		var input = document.getElementById('google-places');
		autocomplete = new google.maps.places.Autocomplete(input);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.register.bind(this)}>
					<SignUpMain onRef={ref => (this.SignUpMain = ref)} />
					<div className="container">
						<Row className="place">
							<Col sm={4} className="subtitle">
								<h2>About Your Place</h2>
							</Col>
						</Row>
						<Row className="place-input">
							<FormControl
								id="google-places"
								className="address"
								type="text"
								placeholder="Type your address..."
								ref="address"
							/>
							<div id="map-canvas"></div>
						</Row>
						<Row>
							<FormControl className="input" componentClass = "select" placeholder="Type of property" ref="property">
							<option value="select">Type of property</option>
								<option value="apartment">Apartment</option>
								<option value="coop">Co-Op</option>
								<option value="house">House</option>
								<option value="townhouse">Townhouse</option>
								</FormControl>
							<FormControl
								className="input"
								type="number"
								placeholder="Number of rooms"
								ref="rooms"
							/>
							<FormControl
								className="input"
								type="number"
								placeholder="Number of bathrooms"
								ref="bathroom"
							/>

							<FormControl className="input" componentClass="select" ref="internet">
								<option value="select">Internet access</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</FormControl>

							<FormControl className="input" componentClass="select" ref="parking">
								<option value="select">Parking</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</FormControl>

							<FormControl className="input" componentClass="select" ref="ac">
								<option value="select">Air conditioning</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</FormControl>
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

							<FormGroup className="money">
								<InputGroup>

									<FormControl type="number" placeholder="Monthly Rent" ref="rent" />
								</InputGroup>
							</FormGroup>

							<FormGroup className="money">
								<InputGroup>

									<FormControl type="number" placeholder="Security Deposit" ref="deposit" />
								</InputGroup>
							</FormGroup>

							<FormControl className="input" componentClass="select" ref="roomtype">
								<option value="unknown">Room Type</option>
								<option value="private">Private room</option>
								<option value="shared">Room shared with others</option>
							</FormControl>

							<FormControl className="input" componentClass="select" ref="furnishing">
								<option value="unknown">Furnishing</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</FormControl>
							<FormControl className="input" componentClass="select" ref="bathroomtype">
								<option value="unknown">Bathroom Type</option>
								<option value="private">Private bathroom</option>
								<option value="shared">Shared bathroom</option>
							</FormControl>
							<FormControl className="input" componentClass="select" ref="prefergender">
								<option value="unknown">Preferred Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="undecided">I don't have a preference</option>
							</FormControl>
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