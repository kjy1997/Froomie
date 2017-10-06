import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import PropTypes from 'prop-types';

import { Users } from './api/users';

class Profile extends Component {

    render() {
        let user = this.props.user;
        return (
            <div>
                <div className="header">Froomie!</div>
                <div className="profile-container">
                    <div className="user-back">
                        <div className="user-pic"></div>
                    </div>
                    <div className="user-info">
                        <h2>{user ? user.profile.firstName + ' ' + user.profile.lastName : 'Loading..'}</h2>
                        <div className="about">
                            <h4>About me</h4>
                            <p>{user ? user.profile.about : 'Loading..'}</p> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.object
}

export default createContainer(() => {
    return {
        user: Meteor.user()
    };
}, Profile);