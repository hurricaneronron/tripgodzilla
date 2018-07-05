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
//import {workingFunction} from './components/Welcome'

class App extends Component {
  //state = {
  //  endpoint: "http://localhost:4001", // this is where we are connecting to the sockets
  //}
  
  render() {
    //const socket = socketIOClient(this.state.endpoint)
    //socket.on('update tripitem', (page) => {
    //  if (page === localStorage.getItem("selectedBoxId")) {
    //    window.location.reload()
    //  }
    //})
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
