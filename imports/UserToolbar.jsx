import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-meteor-data';

const btnStyle = {
    backgroundColor: '#0b8966',
    color: '#fff',
    border: '0px solid black',
    borderRadius: '3px',
    padding: '10px 20px'
}

const dropdownStyle = {
    backgroundColor: '#fff',
    border: '1px solid black'
}
class UserToolbar extends Component {

    logout() {

    }


    render() {
        let user = this.props.user;

        if (user) {
            return (
                <div>
                <button style={btnStyle}>Welcome {user.profile.firstName}! &#9660;</button>
                <div style={dropdownStyle}>
                    <p><a href="/profilemain">Profile</a></p>
                    <p>Logout</p>
                </div>
                </div> 
            );
        } else {
            return (
                <button style={btnStyle}>Login</button>
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