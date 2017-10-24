import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col, Row, Button, FormControl, Image, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import { Users } from './api/users.js';
import SignUpMain from './SignUpMain'

export default class SignUpWithoutPlace extends Component {
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
		const budget = ReactDOM.findDOMNode(this.refs.budget).value.trim();
		const movein = ReactDOM.findDOMNode(this.refs.movein).value.trim();
		const lengthofstay = ReactDOM.findDOMNode(this.refs.lengthofstay).value.trim();

		Accounts.createUser({ username: mainInfos.username, password: mainInfos.password }, (error) => {
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
						"profile.about": mainInfos.about,

						"profile.budget": budget,
						"profile.moveindate": movein,
						"profile.lengthofstay": lengthofstay
					}
				})
				console.log("Registered in user: " + Meteor.user().username);
			}
		});
	}

	//datepicker
	state = {
		date: new Date(2017,1,20),
	  }
	 
	  onChange = date => this.setState({ date })

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
								<FormControl
									className="input"
									type="number"
									placeholder="Budget"
									ref="budget"
								/>
								<DatePicker
								onChange={this.onChange}
								className="input"
									type="date"
									placeholder="Move in date"
									ref="moveindate"
							  />

								<FormControl
									className="input"
									type="text"
									placeholder="Length of stay (e.g. 1 month)"
									ref="lengthofstay"
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
					</FormGroup>
				</form>

			</div>


		);
	}
}