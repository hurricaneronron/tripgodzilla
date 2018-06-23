import React from "react";
import road from "../styles/images/road.svg";
import sign from "../styles/images/sign.svg";
import panel from "../styles/images/panel.svg";
import "../styles/Navbar.css";

const Navbar = props =>
<nav>
  <div className="nav-wrapper blue darken-4">
    <a href="" className="brand-logo left"><img id="logo" src={panel} />Brand Name</a>
      <ul id="nav-mobile" className="right">
      <li><a href="/Home">Home</a></li>
      <li><a href="/User">User</a></li>
      <li><a href="/TripsHome">Trips</a></li>
      <li><a href="/Messages">Messages</a></li>
      <li><a href="/Welcome">Logout</a></li>
    </ul>
  </div>
</nav>

export default Navbar;
