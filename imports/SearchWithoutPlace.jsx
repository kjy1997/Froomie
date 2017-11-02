import React, { Component } from 'react';
import { Col, Row, Button, FormControl, Image, Thumbnail } from 'react-bootstrap';
import '../client/css/search.css';
import { Mongo } from 'meteor/mongo';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';

class SearchWithoutPlace extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		Meteor.subscribe('allUsers');
	}
	updateFilters() {
		const agefilter = ReactDOM.findDOMNode(this.refs.agefilter).value;
		const genderfilter = ReactDOM.findDOMNode(this.refs.genderfilter).value;
		const budgettfilter = ReactDOM.findDOMNode(this.refs.budgetfilter).value;

		if (agefilter === 'select' && genderfilter === 'select' && budgetfilter === 'select') {
			Session.set('filters', {});
		} else {
			let selector = {
				$and: [],
			};
			if (agefilter === "18-25") {
				selector.$and.push({ "profile.age": { $gte: 18, $lte: 25 } });
			} else if (agefilter === "25") {
				selector.$and.push({ "profile.age": { $gte: 25 } });
			} else if (genderfilter === "male") {
				selector.$and.push({ "profile.gender" : "male" })
			} else if (genderfilter === "female") {
				selector.$and.push({ "profile.gender" : "female" })
			} else if (budgetfilter === 'lte400') {
				selector.$and.push({ "profile.budget" : { $lte: 400 } })
			} else if (budgetfilter === '400-600') {
				selector.$and.push({ "profile.budget" : { $gt: 400, $lte: 600 } })
			} else if (budgetfilter === '600-1000') {
				selector.$and.push({ "profile.budget" : { $gt: 600, $lte: 1000 } })
			} else if (budgetfilter === 'gte1000') {
				selector.$and.push({ "profile.budget" : { $gt: 1000 } })
			}

			Session.set('filters', selector);
		}
	}

	renderImagePreview(userid) {
		let useravatar = avatar.findOne({ "metadata.owner": userid }, { sort: { uploadDate: -1 } });
		if (useravatar) {
		  return avatar.baseURL + "/md5/" + useravatar.md5;
		} else {
			return "./img/temp.jpg";
		}
	  }

	getUsers(filters) {
		let userarray = [];

		Meteor.users.find(filters).forEach(function (user) {
			if (!user.profile.hasOwnProperty('place')) {
				userarray.push(
					<Col xs={6} md={4}>
							<Thumbnail className="thumbnail" src={this.renderImagePreview(user._id)} alt="242x200">
							<h3>{user.profile.firstName + ", " + user.profile.gender + ", " + user.profile.age}</h3>
							
							<h3>I'm looking for a room!</h3>
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
				
                    <FormControl componentClass="select" placeholder="select" ref="budgetfilter">
					<option value="select">select budget</option>
					<option value="lte400">Less than $400</option>
					<option value="400-600">$400-$600</option>
					<option value="600-1000">$600-$1000</option>
					<option value="gte1000">More than $1000</option>
                    </FormControl>
                    <Button className="searchbtn" type="submit" >
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
		users : Meteor.users.find().fetch()
	};
  }, SearchWithoutPlace);
