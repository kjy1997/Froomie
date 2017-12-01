import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import Navbar from './Navbar.jsx';
import { Col, Row } from 'react-bootstrap';
import { createContainer } from 'react-meteor-data';

class Interests extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
        if (Meteor.loggingIn()) {
            return null;
        }

        let user = this.props.user;
        
        user.interests = [];

        if (user) {
            return (
                <div>
                    <Navbar plain={false} />
                    <Row>
                        <Col sm={12}>
                            <h3>Interests</h3>
                        </Col>
                    </Row>
                    {
                        user.interests.map((username) => {
                            return
                            <Row>
                                <Col sm={9}>	
                                    <a href={'/user/' + username}>{username}</a>
                                </Col>
                            </Row>
                        })
                    }
                </div>
            );
        } else {
            alert("Not logged in");
            window.location.replace("/login");
        }
	}
}

Interests.propTypes = {
    user: PropTypes.object
}

export default createContainer(() => {
	 return {
        user: Meteor.user()
    };
}, Interests);
