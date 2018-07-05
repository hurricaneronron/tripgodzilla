import React from "react";
import "../styles/Welcome.css";
import logo from "../styles/images/logo.svg"

class Welcome extends React.Component {
    render() {
        return (
            <div id="bg">
                <div id="content" className="container">
                    <div className="row">
                        <div className="col s12"><h1><img src={logo} id="logo-img" />Welcome!</h1></div>
                    </div>
                    <div className="row">
                        <div className="col s6 push-s2 pull-s2"><a className="waves-effect waves-light btn-large blue darken-4" href="/Login">SIGN IN</a></div>
                        <div className="col s6 push-s2 pull-s2"><a className="waves-effect waves-light btn-large yellow black-text" href="/AccountCreation">SIGN UP</a></div>
                    </div>
                    <div className="row"></div>
                    <div className="row"></div>
                    <div className="row"></div>
                </div>
            </div>
        ) 
    }
}
export default Welcome;
