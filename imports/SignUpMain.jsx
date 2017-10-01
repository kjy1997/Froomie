import React, { Component } from 'react';
import { Col, Row, Grid, Button, FormControl,Image } from 'react-bootstrap';
import '../client/css/signupmain.css';

export default class SignUpMain extends Component {
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
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Password"
          			/>
          		</Row>
          		<Row className="second-row">
          			 <FormControl
          			 	className="input"
            			type="text"
            			placeholder="Email"
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
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Last name"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Age"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Gender"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Number of roomates"
          			/>
       	 	</Row>
       	 	<Row>
       	 	<FormControl
          			    className="block"
            			componentClass="textarea"
            			placeholder="Tell us about yourself"
          			/>
       	 	</Row>
		</div>
	
			</div>
		);
	}
}
    );
  }
}
