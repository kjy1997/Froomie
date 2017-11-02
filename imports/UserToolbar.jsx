import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-meteor-data';

const hidden = {
    display: 'none'
}

const dropdownStyle = {
    border: '1px solid black',
    backgroundColor: 'white',
    display: 'block'
}

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

    toggleDropdown(e) {
        e.preventDefault();
        this.setState({ dropdown: !this.state.dropdown});
    }

    render() {
        let user = this.props.user;

        if (user) {
            return (
                <div>
                <a href="#" onClick={this.toggleDropdown.bind(this)}>Welcome {user.profile.firstName}! &#9660;</a>
                <div style={this.state.dropdown ? dropdownStyle : hidden}>
                    <p><a href="/profilemain">Profile</a></p>
                    <p><a href="#" onClick={this.logout}>Logout</a></p>
                </div>
                </div> 
            );
        } else {
            return (
                <a href="/login">Login</a>
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