import React from "react";
import "../styles/Navbar.css";

class Navbar extends React.Component {
  handleLogout = () => {
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("userId")
    localStorage.removeItem("selectedBoxId")
    localStorage.removeItem("trip")
    localStorage.removeItem("tripId")
    alert("Logout successful!")
  }

  render () {
    return (
<nav>
  <div className="nav-wrapper blue darken-4">
    <a href="" className="brand-logo left">LOGO</a>
    <p id="WelcomeMessage">Welcome, {localStorage.getItem("name")}!</p>
      <ul id="nav-mobile" className="right">
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
