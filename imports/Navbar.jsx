import React, { Component } from 'react';
import { Col, Row, Grid, Button, FormControl, Image, FormGroup } from 'react-bootstrap';
import UserToolbar from './UserToolbar.jsx';

export default class Navbar extends Component {

    redirect() {
        window.location.replace("/home");
    }

    render() {
        if (this.props.plain) {
            return (
                <div className="header">
                    <div onClick={this.redirect} className="plainNav">
                        Froomie!
                    </div> 
                </div>
            );
        } else {
            return (
                <div>
					<Row className="top-bar">
						<Col sm={9} className="logo">
							<h3 className="homeRedirect" onClick={this.redirect}>Froomie!</h3>
						</Col>
						<Col sm={3}>
							<UserToolbar></UserToolbar>
						</Col>
					</Row>
				</div>
 
            );
        }
    }
}