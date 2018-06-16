import React, { Component } from "react";
import AccountCreation from "./components/AccountCreation";
import Home from "./components/Home";
import Login from "./components/Login";
import MessageBox from "./components/MessageBox";
import Pinboard from "./components/Pinboard";
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
        <Route path="/welcome" component= {Welcome} />
        <Route path="/home" component= {Home} />
        <Route path="/login" component= {Login} />
        <Route path="/messagebox" component= {MessageBox} />
        <Route path="/pinboard" component= {Pinboard} />
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
