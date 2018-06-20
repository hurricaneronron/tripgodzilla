import React from "react";
import "../styles/User.css";
import Navbar from "./Navbar";

class User extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <div>User.</div>
            </div>
        )
    }
}

export default User;
