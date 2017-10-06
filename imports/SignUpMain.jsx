import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col, Row, Grid, Button, FormControl,Image } from 'react-bootstrap';
import '../client/css/signupmain.css';

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
	render() {
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
				<Col sm={5} className="avatar">
				 <form onSubmit={this._handleSubmit}>
          			<input type="file" onChange={this._handleImageChange} />
        		 	<button type="submit" onClick={this._handleSubmit}>Upload Image</button>
       			 </form>
				</Col>

				<Col sm={7} className="username">
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
            			type="text"
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
            			type="text"
            			placeholder="Age"
            			ref="age"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Gender"
            			ref="gender"
          			/>
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
 