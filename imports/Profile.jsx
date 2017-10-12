import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'react-meteor-data';
import PropTypes from 'prop-types';

import UserTags from './UserTags.jsx';

import { Users } from './api/users';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [
                'Adventurous',
                'Extrovert',
                'Well-Organized',
                'Friendly',
                'Athletic',
                'Dynamic',
                'Reliable'
            ],
            isModalOpen: false
        }
    }

    handleContactSubmit(e) {
        e.preventDefault();

        let message = ReactDOM.findDOMNode(this.refs.contactForm).value;

        alert(message);
    }

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
                        <UserTags tags={this.state.tags} />
                    </div>
                    <div className="line-split"></div>
                    <div className="contact">
                        <h4>Contact Me</h4>
                        <form onSubmit={this.handleContactSubmit.bind(this)}>
                            <textarea className="contact-subject" ref="contactForm"></textarea>
                            <br />
                            <input type="submit" value="Submit" />
                        </form>
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