import React from "react";

const Navbar = props =>
<nav>
  <div className="nav-wrapper blue darken-4">
    <a href="" className="brand-logo left">LOGO</a>
      <ul id="nav-mobile" className="right">
      <li><a href="/Home">Home</a></li>
      <li><a href="/User">User</a></li>
      <li><a href="/Trips">Trips</a></li>
      <li><a href="/Messages">Messages</a></li>
    </ul>
  </div>
</nav>

export default Navbar;
