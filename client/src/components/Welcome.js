import React from "react";
import "../styles/Welcome.css";

class Welcome extends React.Component {
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col s12"><h1>Welcome!</h1></div>
                </div>
                <div class="row">
                    <div class="col s2 push-s2 pull-s2"><a class="waves-effect waves-light btn-large">SIGN IN</a></div>
                    <div class="col s2 push-s2 pull-s2"><a class="waves-effect waves-light btn-large">SIGN UP</a></div>
                </div>
            </div>
        ) 
    }
}

export default Welcome;