import React from "react";
import "../styles/Navbar.css";
import logo from "../styles/images/logo.svg";
import {Redirect} from "react-router-dom";

class Navbar extends React.Component {
  handleLogout = () => {
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("userId")
    localStorage.removeItem("selectedBoxId")
    localStorage.removeItem("trip")
    localStorage.removeItem("tripId")
    alert("Logout successful!")
    return <Redirect to="/Welcome" />
  }

  render () {
    return (
      <nav>
        <div className="nav-wrapper blue darken-4">
          <span>
            <img src={logo} id="logo-img" />
            <a href="/" className="brand-logo left">TripGodzilla</a>
          </span>
          <ul id="nav-mobile" className="right">
            <li><a id="WelcomeMessage">Welcome, {localStorage.getItem("name")}!</a></li>
            <li><a href="/Home">Home</a></li>
            <li><a href="/User">User</a></li>
            <li><a href="/TripsHome">Trips</a></li>
            <li><a href="/Messages">Messages</a></li>
            <li><a href="/Welcome" onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}
export default Navbar;
