import React from "react";
import logo from "../styles/images/logo.svg"

class Welcome extends React.Component {
    render() {
        return (
            <div className="bg">
                <div id="content" className="container">
                    <div className="row"></div>
                    <div className="row"></div>
                    <div className="row">
                        <div className="col s12 m4"><h1 id="welcome">Welcome!</h1></div>
                        <div className="col s12 m4"><a className="waves-effect waves-light btn-large green lighten-1" href="/Login"><i className="material-icons">new_releases</i> SIGN IN</a></div>
                        <div className="col s12 m4"><a className="waves-effect waves-light btn-large green lighten-1" href="/AccountCreation"><i className="material-icons">whatshot</i> SIGN UP</a></div>
                    </div>
                    <div className="row"></div>
                </div>
                <img src={logo} id="logo-img" />
            </div>
        ) 
    }
}
export default Welcome;
