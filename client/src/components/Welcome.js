import React from "react";
import "../styles/Welcome.css";

class Welcome extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12"><h1>Welcome!</h1></div>
                </div>
                <div className="row">
                    <div className="col s2 push-s2 pull-s2"><a className="waves-effect waves-light btn-large" href="/Login">SIGN IN</a></div>
                    <div className="col s2 push-s2 pull-s2"><a className="waves-effect waves-light btn-large" href="/SignUp">SIGN UP</a></div>
                </div>
            </div>
        ) 
    }
}

export default Welcome;
