import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Col, Row, Grid, Button, FormControl, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createContainer } from 'react-meteor-data';
import UserProfileMain from './UserProfileMain.jsx';
import Navbar from './Navbar.jsx';

class Login extends Component {

    componentDidUpdate() {
        if (this.props.user) {
            window.location.replace("/profilemain");
        }
    }
    
    render() {
        return (
            <div>
                <div>
                <Navbar plain={true} />
                </div>
                <div className="container">
                    <Row className="login">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                        <FormControl
                            className="input"
                            type="text"
                            placeholder="Username"
                            ref="username"
                        />
                        </Col>
                        <Col sm={3}>
                        <FormControl
                            className="input"
                            type="password"
                            placeholder="Password"
                            ref="password"
                        />
                        </Col>
                    </Row>
                    <Row className="button-row">
                        <Col sm={3} className="blank">
                        </Col>
                        <Col sm={6} className="btn-content">
                            <Button className="submit" type="submit" onClick={this.login.bind(this)}>Submit</Button>
                        </Col>
                        <Col sm={3} className="blank">
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    login(event) {
        event.preventDefault();

        const user = ReactDOM.findDOMNode(this.refs.username).value.trim();
        const pass = ReactDOM.findDOMNode(this.refs.password).value.trim();
		// Meteor.loginWithFacebook({
		// 		requestPermissions: ['public_profile','first_name', 'last_name','gender','picture','age_range']
		// 		//access via user.services.facebook.*(e.g name)
		// 		}, (error) => {
		// 		if (error) {
		// 		Session.set('errorMessage', error.reason || 'Unknown error');
		// 		}
        // });
        
        Meteor.loginWithPassword(user, pass, (error) => {
            if (error) {
                alert("Error: " + error.reason);
                console.log("Error: " + error.reason);
            } else {
                alert("Logged in user: " + Meteor.user().username);
                window.location.replace("/profilemain");
            }
        });

    }
}

Login.propTypes = {
    user: PropTypes.object
}

export default createContainer(() => {
    return {
        user: Meteor.user()
    };
}, Login)