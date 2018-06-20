import React, { Component } from "react";
import AccountCreation from "./components/AccountCreation";
import Home from "./components/Home";
import Login from "./components/Login";
import Messages from "./components/Messages";
import TripsHome from "./components/TripsHome";
import SignIn from "./components/SignIn";
import TripBoard from "./components/TripBoard";
import User from "./components/User";
import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route path="/Welcome" component= {Welcome} />
        <Route path="/home" component= {Home} />
        <Route path="/login" component= {Login} />
        <Route path="/messages" component= {Messages} />
        <Route path="/tripshome" component= {TripsHome} />
        <Route path="/signin" component= {SignIn} />
        <Route path="/tripboard" component= {TripBoard} />
        <Route path="/user" component= {User} />
        <Route path="/AccountCreation" component= {AccountCreation} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
