import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-meteor-data';
import { DropdownButton, MenuItem, Button } from 'react-bootstrap';

class UserToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = { dropdown: false };
    }

    redirect(e) {
        e.preventDefault();
        window.location.replace("/profilemain");
    }

    logout(e) {
        e.preventDefault();
        Meteor.logout();
        window.location.replace("/login");
    }

    render() {
        let user = this.props.user;

        if (user) {
            return (
                <div className="welcome">

                    <DropdownButton id="navDrop" title="Welcome!" noCaret>
                        <MenuItem eventKey="1"><span onClick={this.redirect}>Profile</span></MenuItem>
                        <MenuItem eventKey="2"><span onClick={this.logout}>Logout</span></MenuItem>
                    </DropdownButton>

                </div>
            );
        } else {
            return (
                <Button className="welcome"><a href="/login">Login</a></Button>
            );
        }
    }
}

UserToolbar.propTypes = {
    user: PropTypes.object
}

export default createContainer(() => {
    return {
        user: Meteor.user()
    };
}, UserToolbar);