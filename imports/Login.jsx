import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Login extends Component {

    render() {
        return (
            <form onSubmit={this.login.bind(this)}>
                <input ref="username" type="username" name="username" placeholder="username" />
                <input ref="password" type="password" name="password" placeholder="password" />
                <button type="submit">Submit</button>
            </form>
        );
    }

    login(event) {
        event.preventDefault();

        const user = ReactDOM.findDOMNode(this.refs.username).value.trim();
        const pass = ReactDOM.findDOMNode(this.refs.password).value.trim();

        Meteor.loginWithPassword(user, pass, (error) => {
            if (error) {
                alert("Error: " + error.reason);
                console.log("Error: " + error.reason);
            } else {
                console.log("Logged in user: " + Meteor.user().username);
            }
        });
    }
}

