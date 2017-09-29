import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Users } from './api/users.js';

export default class Registration extends Component {

    render() {
        return (
            <form onSubmit={this.register.bind(this)} >
                <input type="text" ref="username" placeholder="Username" />
                <input type="password" ref="password" placeholder="Password" />
                <input type="text" ref="firstName" placeholder="First Name" />
                <input type="text" ref="lastName" placeholder="Last Name"/>
                <input type="number" ref="age" placeholder="Age"/>
                <input type="text" ref="gender" placeholder="Gender" />
                <input type="email" ref="email" placeholder="Email"/>
                <input type="text" ref="about" placeholder="About" />
                <button type="submit">Submit</button>
            </form>
        );
    }

    register(event) {
        event.preventDefault();

        const user = ReactDOM.findDOMNode(this.refs.username).value.trim();
        const pass = ReactDOM.findDOMNode(this.refs.password).value.trim();

        Accounts.createUser({username: user , password: pass}, (error) => {
            if (error) {
                console.log("Error: " + error.reason);
            } else {
                Users.update(Meteor.userId(), {
                    $set: {
                        "profile.firstName": ReactDOM.findDOMNode(this.refs.firstName).value.trim(),
                        "profile.lastName": ReactDOM.findDOMNode(this.refs.lastName).value.trim(),
                        "profile.age": +ReactDOM.findDOMNode(this.refs.age).value.trim(),
                        "profile.gender": ReactDOM.findDOMNode(this.refs.gender).value.trim(),
                        "profile.email": ReactDOM.findDOMNode(this.refs.email).value.trim(),
                        "profile.about": ReactDOM.findDOMNode(this.refs.about).value.trim()
                    }
                })
                console.log("Registered in user: " + Meteor.user().username);
            }
        });
    }
}