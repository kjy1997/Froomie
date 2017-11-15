import React, { Component } from 'react';
import { Col, Row, Button, FormControl, Image, Thumbnail } from 'react-bootstrap';
import '../client/css/search.css';
import { Mongo } from 'meteor/mongo';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import ReactDOM from 'react-dom';
import Navbar from './Navbar.jsx';

class Search extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		Meteor.subscribe('allUsers');
		Session.set('filters', {})
	}

	updateFilters() {
		const agefilter = ReactDOM.findDOMNode(this.refs.agefilter).value;
		const genderfilter = ReactDOM.findDOMNode(this.refs.genderfilter).value;
		const rentfilter = ReactDOM.findDOMNode(this.refs.rentfilter).value;

		if (agefilter === 'select' && genderfilter === 'select' && rentfilter === 'select') {
			Session.set('filters', {});
		} else {
			let selector = {
				$and: [],
			};
			if (agefilter === "18-25") {
				selector.$and.push({ "profile.age": { $gte: 18, $lte: 25 } });
			} else if (agefilter === "25") {
				selector.$and.push({ "profile.age": { $gte: 25 } });
			} 
			if (genderfilter === "male") {
				selector.$and.push({ "profile.gender" : "male" })
			} else if (genderfilter === "female") {
				selector.$and.push({ "profile.gender" : "female" })
			}
			if (rentfilter === 'lte400') {
				selector.$and.push({ "profile.place.rent" : { $lte: 400 } })
			} else if (rentfilter === '400-600') {
				selector.$and.push({ "profile.place.rent" : { $gt: 400, $lte: 600 } })
			} else if (rentfilter === '600-1000') {
				selector.$and.push({ "profile.place.rent" : { $gt: 600, $lte: 1000 } })
			} else if (rentfilter === 'gte1000') {
				selector.$and.push({ "profile.place.rent" : { $gt: 1000 } })
			}

			Session.set('filters', selector);
		}
	}

	renderImagePreview(userid) {
		let useravatar = Meteor.users.findOne({ _id: userid }).profile.avatar;
		if (useravatar) {
		  return useravatar;
		} else {
			return "./img/temp.jpg";
		}
	  }

	getUsers(filters) {
		let userarray = [];

		Meteor.users.find(filters).forEach(function (user) {
			if (user.profile.hasOwnProperty('place')) {
				userarray.push(
					<Col xs={6} md={4}>
							<Thumbnail className="thumbnail" src={this.renderImagePreview(user._id)} alt="242x200">
							<h3>{user.profile.firstName + ", " + user.profile.gender + ", " + user.profile.age}</h3>

							<p>{"Address: " + user.profile.place.address}</p>
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
				<Navbar plain={false} />
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
						<FormControl componentClass="select" placeholder="select" ref="rentfilter">
							<option value="select">select budget</option>
							<option value="lte400">Less than $400</option>
							<option value="400-600">$400-$600</option>
							<option value="600-1000">$600-$1000</option>
							<option value="gte1000">More than $1000</option>
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
