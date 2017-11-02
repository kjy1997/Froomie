import React, { Component } from 'react';
import { Col, Row, Button, FormControl, Image, Thumbnail } from 'react-bootstrap';
import '../client/css/search.css';
import { Mongo } from 'meteor/mongo';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import ReactDOM from 'react-dom';

class Search extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		Meteor.subscribe('allUsers');
		Session.set('filters', {})
	}

	updateFilters() {
		const agefilter = ReactDOM.findDOMNode(this.refs.agefilter).value;
		const genderfilter = ReactDOM.findDOMNode(this.refs.genderfilter).value;
		const tagfilter = ReactDOM.findDOMNode(this.refs.tagfilter).value;
		const budgetfilter = ReactDOM.findDOMNode(this.refs.budgetfilter).value;

		if (agefilter === 'select' && genderfilter === 'select' && tagfilter === '' && budgetfilter === 'select') {
			Session.set('filters', {});
		}
		let selector = {
			$and: [],
		};
		if (agefilter === "18-25") {
			selector.$and.push({ "profile.age": { $gte: 18, $lte: 25 } });
		} else if (agefilter === "25") {
			selector.$and.push({ "profile.age": { $gte: 25 } });
		}
		
		Session.set('filters', selector);
	}

	getUsers(filters) {
		let userarray = [];

		Meteor.users.find(filters).forEach(function (user) {
			if (user.profile.hasOwnProperty('place')) {
				userarray.push(
					<Col xs={6} md={4}>
						<Thumbnail className="thumbnail" src="/assets/thumbnaildiv.png" alt="242x200">
							<h3>{user.profile.firstName + ", " + user.profile.gender + ", " + user.profile.age}</h3>

							<h3>{"Address: " + user.profile.place.address}</h3>
							<p>
								{user.profile.about}
							</p>
							<Button className="searchbtn" href={"/user/" + user.username}>
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
						<FormControl componentClass="select" placeholder="select" ref="agefilter">
							<option value="select">select age</option>
							<option value="18-25">18-25 (College or new grad)</option>
							<option value="25">Over 25 (Working)</option>
						</FormControl>
						<FormControl componentClass="select" placeholder="select" ref="genderfilter">
							<option value="select">select gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</FormControl>
						<FormControl
							className="input"
							type="text"
							placeholder="Type your tag"
							ref="tagfilter"
						/>
						<FormControl componentClass="select" placeholder="select" ref="budgetfilter">
							<option value="select">select budget</option>
							<option value="300">Less than $300</option>
							<option value="400">$400-$600</option>
							<option value="600">$600-$800</option>
							<option value="800">$800-$1000</option>
							<option value="1000">More than $1000</option>
						</FormControl>
						<Button className="searchbtn" type="submit" onClick={this.updateFilters.bind(this)} >
							Apply filter
						</Button>
					</Col>

					<Col sm={9} className="display">
						<Row>
							{this.getUsers(Session.get('filters'))}
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export default createContainer(() => {
	return {
		users: Meteor.users.find().fetch(),
		filters: {}
	};
}, Search);
