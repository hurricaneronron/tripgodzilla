import React, { Component } from "react";
import AccountCreation from "./components/AccountCreation";
import Home from "./components/Home/Home";
import Login from "./components/Login";
import Messages from "./components/Messages/Messages";
import TripsHome from "./components/TripsHome/TripsHome";
import TripBoard from "./components/TripBoard/TripBoard";
import User from "./components/User/User";
import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route path="/Welcome" component= {Welcome} />
        <Route path="/AccountCreation" component= {AccountCreation} />
        <Route path="/login" component= {Login} />
        <Route path="/home" component= {Home} />
        <Route path="/user" component= {User} />
        <Route path="/tripshome" component= {TripsHome} />
        <Route path="/tripboard" component= {TripBoard} />
        <Route path="/messages" component= {Messages} />
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
