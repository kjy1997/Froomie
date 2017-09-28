import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Registration extends Component {

    register(event) {
        event.preventDefault();

        const user = ReactDOM.findDOMNode(this.refs.username).value.trim();
        const pass = ReactDOM.findDOMNode(this.refs.password).value.trim();

        Accounts.createUser({username: user , password: pass}, (error) => {
            if (error) {
                console.log("error: " + error.reason);
            } else {
                // TODO: update the user to have the addition fields that we want
                console.log("Registered in user: " + Meteor.user().username);
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.register.bind(this)} >
                <input ref="username" type="username" name="username" placeholder="username" />
                <input ref="password" type="password" name="password" placeholder="password" />
                <button type="submit">Submit</button>
            </form>
        );
    }
}