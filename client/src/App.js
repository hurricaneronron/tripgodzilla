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
import {workingFunction} from './components/Welcome'
import socketIOClient from 'socket.io-client'

class App extends Component {
  state = {
    endpoint: "http://localhost:4001", // this is where we are connecting to the sockets
  }
  
  render() {
    const socket = socketIOClient(this.state.endpoint)
    socket.on('update message', (page) => {
      if (page === localStorage.getItem("selectedBoxId")) {
      //  window.location.reload()
      }
    })
    socket.on('update friendrequest', (page) => {
      if (page === localStorage.getItem("selectedBoxId")) {
        window.location.reload()
      }
    })
    socket.on('update friendslist', (page) => {
      if (page === localStorage.getItem("selectedBoxId")) {
        window.location.reload()
      }
    })
    socket.on('update tripitem', (page) => {
      if (page === localStorage.getItem("selectedBoxId")) {
        window.location.reload()
      }
    })
    socket.on('update tripcomment', (page) => {
      if (page === localStorage.getItem("selectedBoxId")) {
        window.location.reload()
      }
    })
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
