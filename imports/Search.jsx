/*
import React, { Component } from 'react';
import { Col, Row, Button, FormControl, Image, Thumbnail } from 'react-bootstrap';
import '../client/css/search.css';
import { Mongo } from 'meteor/mongo';

export default class Search extends Component { 
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
  }
		filterResults() {
		//Get results
		collectionPlaceholder.find({
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
	render() {
		 var userList = collectionPlaceholder.find({
                                           age: this.state.age,
                                            gender: this.state.gender,
                                            address: this.state.loc,
                                            tagName: this.state.tag,
                                            budget: this.state.budget
                                          }).fetch().map(function(firstName, index) {

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
					<Col xs={6} md={4}>
         	 			<Row>
					{userList.map(function(firstName, index){
						<Col xs={6} md={4}>
						<Thumbnail className="thumbnail" src="/img/avatar.jpg" alt="242x200">
						<h3>Thumbnail label</h3>
						<p>Description</p>
						<p>
						<Button bsStyle="primary">Button</Button>&nbsp;
						<Button bsStyle="default">Button</Button>
						</p>
						</Thumbnail>
						</Col>
					})}
					</Row>	
				</Col>
			</Row>
		</div>
		);
	}
}*/
