import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col, Row, Button, FormControl, Image, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

import { Users } from './api/users.js';
import SignUpMain from './SignUpMain'

export default class SignUpWithoutPlace extends Component {

	constructor(props) {
		super(props);
		var value = new Date().toISOString();
		this.state = {
			value: value
		};

	}

	renderSignUpMain() {
		return this.getTasks().map((task) => (
			<SignUpMain key={task._id} task={task} />
		));
	}
	  

	register(event) {
		event.preventDefault();

		// const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
		// const pass = ReactDOM.findDOMNode(this.refs.password).value.trim();
		var mainInfos = this.SignUpMain.infos();
		const budget = parseInt(ReactDOM.findDOMNode(this.refs.budget).value.trim());
		const movein = this.state.value;
		console.log(this.state.value);
		const lengthofstay = ReactDOM.findDOMNode(this.refs.lengthofstay).value.trim();

		if (mainInfos.username === '' || mainInfos.password === '' || mainInfos.email === '' || mainInfos.firstName === '' ||
			mainInfos.lastName === '' || mainInfos.age === '' || mainInfos.gender === 'select' || mainInfos.social === '' 
			|| budget === '' || movein === '' || lengthofstay === ''|| mainInfos.about === '') {
			alert("You must fill in all the information!");
		} else {

			Accounts.createUser({ username: mainInfos.username, password: mainInfos.password, email: mainInfos.email }, (error) => {
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
							"profile.tags" : mainInfos.tags,
							"profile.about": mainInfos.about,
							"profile.social" : mainInfos.social,

							"profile.budget": budget,
							"profile.moveInDate": movein,
							"profile.stayLength": lengthofstay
						}
					})
					console.log("Registered in user: " + Meteor.user().username);
					alert(Meteor.user().username + " is registered!");
					window.location.replace("/login");
				}
			});
		}
	}

	//datepicker

	handleChange() {
		this.setState({
			value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
			formattedValue: formattedValue // Formatted String, ex: "11/19/2016" 
		});
	}

	componentDidUpdate() {
		var hiddenInputElement = document.getElementById("example-datepicker");
		console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z" 
		console.log(hiddenInputElement.getAttribute('data-formattedvalue')); // Formatted String, ex: "11/19/2016"
	}

	render() {
		return (
			<div>
				<form onSubmit={this.register.bind(this)}>
					<FormGroup>

						<SignUpMain onRef={ref => (this.SignUpMain = ref)} />

						<div className="container">
							<Row className="place">
								<Col sm={4} className="subtitle">
									<h2>About Your Stay</h2>
								</Col>
							</Row>
							<Row>
								<Col sm={4} className="place-item">
									<FormControl
										type="number"
										placeholder="Budget"
										ref="budget"
									/>
								</Col>
								<Col sm={4} className="place-item">
									<DatePicker
										id="example-datepicker"
										value={this.state.value}
										onChange={this.handleChange}
										type="date"
										placeholder="Move in date"
										ref="moveindate"
									/>
								</Col>
								<Col sm={4} className="place-item">
									<FormControl
										type="text"
										placeholder="Length of stay (e.g. 1 month)"
										ref="lengthofstay"
									/>
								</Col>
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
					</FormGroup>
				</form>

			</div>


		);
	}
}