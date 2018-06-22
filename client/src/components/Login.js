import React from "react";
import "../styles/Login.css";

class Login extends React.Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <h1 className="col s12">Sign In</h1>
                </div>
                <div className="row">
                    <form className="col s6">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="username" type="text" className="validate" />
                                <label htmlFor="username" className="active">Enter Your Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="password" type="password" className="validate" />
                                <label htmlFor="password" className="active">Enter Your Password</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col s6">
                    <button className="btn waves-effect waves-light btn-large" type="submit" name="action">SIGN IN</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
