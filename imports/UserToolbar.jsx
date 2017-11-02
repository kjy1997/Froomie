import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-meteor-data';

class UserToolbar extends Component {

    logout(e) {
        e.preventDefault();
        Meteor.logout();
    }

    render() {
        let user = this.props.user;

        if (user) {
            return (
                <div>
                <a href="#">Welcome {user.profile.firstName}! &#9660;</a>
                <div>
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