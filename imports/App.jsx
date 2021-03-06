import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import SignUpWithPlace from './SignUpWithPlace.jsx';
import SignUpWithoutPlace from './SignUpWithoutPlace.jsx';
import Search from './Search.jsx';
import SearchWithoutPlace from './SearchWithoutPlace.jsx';
import Home from './HomeLayout.jsx';
import Login from './Login.jsx';
import Registration from './Registration';
import UserProfileMain from './UserProfileMain.jsx';
import UpdateWithPlace from './UpdateWithPlace.jsx';
import UpdateWithoutPlace from './UpdateWithoutPlace.jsx';
import Inbox from './Inbox.jsx';
import Reset from './Reset.jsx';
import EmptyPage from './EmptyPage.jsx';
import Interests from './Interests.jsx';

export default class App extends Component {

  render() {
    return (
       <Router>
       <div>
       <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/signupwithplace" component={SignUpWithPlace}/>
        <Route path="/signupwithoutplace" component={SignUpWithoutPlace}/>
        <Route path="/search" component={Search}/>
        <Route path="/searchwithoutplace" component={SearchWithoutPlace}/>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/profilemain" component={UserProfileMain} />
        <Route path="/updatewithplace" component={UpdateWithPlace} />
        <Route path="/updatewithoutplace" component={UpdateWithoutPlace} />
        <Route path="/user/:username" component={UserProfileMain} />
		    <Route path="/inbox" component={Inbox} />
        <Route path="/reset" component={Reset} />
        <Route path="/interests" component={Interests} />
        <Route path="*" component={EmptyPage} />
      </Switch>
      </div>
      </Router>
    );
  }
}