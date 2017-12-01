import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-meteor-data';
import { DropdownButton, MenuItem, Button } from 'react-bootstrap';



class UserToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = { dropdown: false };
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

                    <DropdownButton title="Welcome!" noCaret>
                        <MenuItem eventKey="1" href="/profilemain">Profile</MenuItem>
                        <MenuItem eventKey="2" href="/search">Search</MenuItem>
                        <MenuItem eventKey="3" onClick={this.logout}>Logout</MenuItem>
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