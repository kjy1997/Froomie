import React, { Component } from 'react';
import { Col, Row, Button, FormControl, Image, Thumbnail } from 'react-bootstrap';
import '../client/css/search.css';
import { Mongo } from 'meteor/mongo';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';

class Search extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.state = {
			//Filter values
			age: 0,
			gender: '',
			loc: '',
			tag: '',
			budget: 0
		};
		Meteor.subscribe('allUsers');
	}
	filterResults() {
		//Get results
		dbPlaceholder.collection.find({
			age: this.state.age,
			gender: this.state.gender,
			address: this.state.loc,
			tagName: this.state.tag,
			budget: this.state.budget
		}).fetch();
	}
	updateFilter() {
		//Update on submit click
		events.subscribe('update-filter', this.updateStates)
	}
	updateStates() {
		this.setState({});
	}

	getUsers() {
		
		this.props.users.forEach(function (user) {
			if (user.profile.firstName){
				console.log(user.profile.firstName);
			}
		}, this);
	}
	render() {
		return (
			<div>
				<Row className="top-bar">
					<Col sm={3} className="logo">
						<h3>Froomie!</h3>
					</Col>
				</Row>

				<Row className="content">
					<Col sm={3} className="filter">
						<h3>Filters</h3>
						<FormControl componentClass="select" placeholder="select">
							<option value="select">select age</option>
							<option value="other">...</option>
						</FormControl>
						<FormControl componentClass="select" placeholder="select">
							<option value="select">select gender</option>
							<option value="other">...</option>
						</FormControl>
						<FormControl componentClass="select" placeholder="select">
							<option value="select">select location</option>
							<option value="other">...</option>
						</FormControl>
						<FormControl componentClass="select" placeholder="select">
							<option value="select">select tag</option>
							<option value="other">...</option>
						</FormControl>
						<FormControl componentClass="select" placeholder="select">
							<option value="select">select budget</option>
							<option value="other">...</option>
						</FormControl>
						<Button className="submit" type="submit" >
							Submit
						</Button>
					</Col>
					
					<Col sm={9} className="display">
						<Row>
						{this.getUsers()}
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export default createContainer(() => {
	return {
		users : Meteor.users.find().fetch()
	};
  }, Search);
