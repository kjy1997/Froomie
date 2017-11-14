import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col, Row, Grid, Button, FormControl, Image, FormGroup } from 'react-bootstrap';
import '../client/css/signupmain.css';
import UserTags from './UserTags.jsx';

import UserToolbar from './UserToolbar.jsx';
import Navbar from './Navbar.jsx';


//SignUp Main Class
export default class SignUpMain extends Component {

	constructor(props) {
		super(props);
		this.state.tags = [];
	}

	componentDidMount() {
		this.props.onRef(this);
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	infos() {
		const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
		const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
		const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
		const firstName = ReactDOM.findDOMNode(this.refs.firstName).value.trim();
		const lastName = ReactDOM.findDOMNode(this.refs.lastName).value.trim();
		const age = parseInt(ReactDOM.findDOMNode(this.refs.age).value.trim());
		const gender = ReactDOM.findDOMNode(this.refs.gender).value.trim();
		const tags = this.state.tags;
		const about = ReactDOM.findDOMNode(this.refs.about).value.trim();
		const social = ReactDOM.findDOMNode(this.refs.social).value.trim();

		return {
			"username": username,
			"password": password,
			"email": email,
			"firstName": firstName,
			"lastName": lastName,
			"age": age,
			"gender": gender,
			"tags": tags,
			"about": about,
			"social": social
		};
	}

	//Upload avatar function
	state = {};


	//tags

	renderTags() {
		return this.state.tags.map((tag) => (
			<span onClick={this.handleRemoveTag.bind(this)} key={tag}>{tag}</span>
		));
	}

	handleAddTag(e) {
		e.preventDefault();

		const tagField = ReactDOM.findDOMNode(this.refs.tagField).value.trim();

		// check if input is empty or if tag already exists in the list
		let tempArr = this.state.tags.map(tag => tag.toLowerCase());
		// if (!tagField || tempArr.indexOf(tagField.toLowerCase()) != -1)
		// 	return

		this.state.tags.push(tagField);
		this.forceUpdate();

		ReactDOM.findDOMNode(this.refs.tagField).value = "";
		ReactDOM.findDOMNode(this.refs.tagField).focus();
	}

	handleRemoveTag(e) {
		e.preventDefault();

		const tagValue = $(e.target).text();
		const tagIndex = this.state.tags.indexOf(tagValue);

		// do nothing if tag doesn't exist or if there is only one tag left ???
		// if (tagIndex === -1 || this.state.tags.length === 1)
		//   return;

		this.state.tags.splice(tagIndex, 1);
		this.forceUpdate();
	}

	render() {


		return (
			<div>

				<Navbar plain={true} />

				<div className="container">
					<div className="user-login" >
						<Row className="about">
							<Col sm={3} className="subtitle">
								<h2>Basic Info</h2>
							</Col>
						</Row>

						<Row className="first-row">
							<FormControl
								className="input"
								type="text"
								placeholder="Username"
								ref="username"
							/>
							<FormControl
								className="input"
								type="password"
								placeholder="Password"
								ref="password"
							/>
							<FormControl
								className="input"
								type="email"
								placeholder="Email"
								ref="email"
							/>
						</Row>
					</div>
				</div>

				<div className="container">
					<Row className="about">
						<Col sm={3} className="subtitle">
							<h2>About You</h2>
						</Col>
					</Row>
					<Row>
						<FormControl
							className="input"
							type="text"
							placeholder="First name"
							ref="firstName"
						/>
						<FormControl
							className="input"
							type="text"
							placeholder="Last name"
							ref="lastName"
						/>
						<FormControl
							className="input"
							type="number"
							placeholder="Age"
							ref="age"
						/>
						<FormControl className="input" componentClass="select" placeholder="Gender" ref="gender">
							<option value="select">Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="undecided">I prefer not to answer</option>
						</FormControl>

					</Row>
					<Row>
						<Col sm={9} className="subtitle">
							<h5>Add a few tags about you! (You can click to remove tags)</h5>
						</Col>
					</Row>
					<Row>
						<div className="modalTagsContainer">
							{this.renderTags()}
						</div>
						<FormControl className="input" id="tag-input" type="text" placeholder="Enter tags here" ref="tagField" />
						<Button className="addtag" onClick={this.handleAddTag.bind(this)}>
							Add tag
						</Button>
						<br />
						<FormControl
							className="block"
							componentClass="textarea"
							placeholder="Tell us about yourself"
							ref="about"
						/>
						<FormControl
							className="social"
							type="text"
							placeholder="Social media link"
							ref="social"
						/>
					</Row>
				</div>
			</div>
		);

	}
}

