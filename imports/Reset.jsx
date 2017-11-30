import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Col, Row, Grid, Button, FormControl, Image } from 'react-bootstrap';
import Navbar from './Navbar.jsx';

export default class Reset extends Component {

    sendRPEmail(event) {
        event.preventDefault();

        // Get the email
        const email = ReactDOM.findDOMNode(this.refs.email).value.trim();

        console.log(email);
        // if email is valid
        if (email) {
            Accounts.forgotPassword({ email: email }, function (err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        console.log('This email does not exist.');
                    } else {
                        console.log('We are sorry but something went wrong.');
                    }
                } else {
                    alert('Email Sent. Check your mailbox.');
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar plain={true} />
                </div>
                <div className="container">
                    <Row className="reset-section">
                        <Col sm={4}></Col>
                        <Col sm={3}>
                            <FormControl
                                className="email"
                                type="text"
                                placeholder="Enter your email address"
                                ref="email"
                            />
                        </Col>

                    </Row>
                    <Row className="button-row">
                        <Col sm={4} className="blank">
                        </Col>
                        <Col sm={6} className="btn-content">
                            <Button className="submit" type="submit" onClick={this.sendRPEmail.bind(this)}>Submit</Button>
                        </Col>

                    </Row>
                </div>
            </div>
        );
    }

}
