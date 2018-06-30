import React, { Component } from "react";
import AccountCreation from "./components/AccountCreation";
import Home from "./components/Home/Home";
import Login from "./components/Login";
import Messages from "./components/Messages/Messages";
import TripsHome from "./components/TripsHome/TripsHome";
import TripBoard from "./components/TripBoard/TripBoard";
import User from "./components/User/User";
import Welcome from "./components/Welcome";
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route exact path="/" component= {Welcome} />
        <Route exact path="/Welcome" component= {Welcome} />
        <Route path="/AccountCreation" component= {AccountCreation} />
        <Route path="/Login" component= {Login} />
        <Route path="/Home" component= {Home} />
        <Route path="/User" component= {User} />
        <Route path="/TripsHome" component= {TripsHome} />
        <Route path="/Tripboard" component= {TripBoard} />
        <Route path="/Messages" component= {Messages} />
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
