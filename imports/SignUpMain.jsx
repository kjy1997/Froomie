import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col, Row, Grid, Button, FormControl, Image } from 'react-bootstrap';
import '../client/css/signupmain.css';
import { Upload, Icon, message } from 'antd';

//Upload avatar function
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	const isJPG = file.type === 'image/jpeg';
	if (!isJPG) {
		message.error('You can only upload JPG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJPG && isLt2M;
}

//

//SignUp Main Class
export default class SignUpMain extends Component {
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
		const age = ReactDOM.findDOMNode(this.refs.age).value.trim();
		const gender = ReactDOM.findDOMNode(this.refs.gender).value.trim();
		const about = ReactDOM.findDOMNode(this.refs.about).value.trim();

		return {
			"username": username,
			"password": password,
			"email": email,
			"firstName": firstName,
			"lastName": lastName,
			"age": age,
			"gender": gender,
			"about": about
		};
	}

	//Upload avatar function
	state = {};

	handleChange = (info) => {
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
		}
	}

	render() {
		const imageUrl = this.state.imageUrl;
		return (
			<div>
				<div>
					<Row className="top-bar">
						<Col sm={3} className="logo">
							<h3>Froomie!</h3>
						</Col>
					</Row>
				</div>
				<div className="container">
					<Row className="user-login" >

						<Col sm={3} className="avatar">
							<Upload
								className="avatar-uploader"
								name="avatar"
								showUploadList={false}
								action="./img"
								beforeUpload={beforeUpload}
								onChange={this.handleChange}
							>
								{
									imageUrl ?
										<img src={imageUrl} alt="" className="avatar" /> :
										<Icon type="plus" className="avatar-uploader-trigger" />
								}
							</Upload>

						</Col>

						<Col sm={8} className="username">
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
							</Row>
							<Row className="second-row">
								<FormControl
									className="input"
									type="email"
									placeholder="Email"
									ref="email"
								/>
							</Row>
						</Col>
					</Row>
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

						<FormControl
							className="block"
							componentClass="textarea"
							placeholder="Tell us about yourself"
							ref="about"
						/>
					</Row>
				</div>
			</div>
		);

	}
}

