import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Col, Row, Grid, Button, FormControl, Image } from 'react-bootstrap';

export default class Login extends Component {

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
                            <Button className="submit" type="submit">Submit</Button>
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

        Meteor.loginWithPassword(user, pass, (error) => {
            if (error) {
                alert("Error: " + error.reason);
                console.log("Error: " + error.reason);
            } else {
                console.log("Logged in user: " + Meteor.user().username);
            }
        });
    }
}

