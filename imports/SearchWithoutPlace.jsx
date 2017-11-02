import React, { Component } from 'react';
import { Col, Row, Button, FormControl, Image, Thumbnail } from 'react-bootstrap';
import '../client/css/search.css';
import { Mongo } from 'meteor/mongo';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';

class SearchWithoutPlace extends TrackerReact(Component) {
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
		let userarray = [];
		this.props.users.forEach(function (user) {
			if (!user.profile.hasOwnProperty('place')){
			userarray.push(
				<Col xs={6} md={4}>
				<Thumbnail className="thumbnail" src="/assets/thumbnaildiv.png" alt="242x200">
					<h3>{user.profile.firstName + ", " + user.profile.gender + ", " + user.profile.age}</h3>
					
					<h3>I'm looking for a room!</h3>
					<p>
						{user.profile.about}
					</p>
                    <Button className="searchbtn">
							Details
						</Button>
				</Thumbnail>
			</Col>
			);
		}
		}, this);
		// 
		return userarray;
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
							<option value="18-25">18-25 (College or new grad)</option>
                            <option value="25">Over 25 (Working)</option>
						</FormControl>
						<FormControl componentClass="select" placeholder="select">
							<option value="select">select gender</option>
							<option value="male">Male</option>
                            <option value="female">Female</option>
						</FormControl>
						<FormControl 
                        className="input"
                        type="text"
                        placeholder="Type your tag"
                        ref="tag"
                        />
                    <FormControl componentClass="select" placeholder="select">
                        <option value="select">select budget</option>
                        <option value="300">Less than $300</option>
                        <option value="400">$400-$600</option>
                        <option value="600">$600-$800</option>
                        <option value="800">$800-$1000</option>
                        <option value="1000">More than $1000</option>
                    </FormControl>
                    <Button className="searchbtn" type="submit" >
                        Apply filter
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
  }, SearchWithoutPlace);
