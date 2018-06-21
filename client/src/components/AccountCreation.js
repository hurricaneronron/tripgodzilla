import React from "react";
import "../styles/AccountCreation.css";

class AccountCreation extends React.Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <h1 className="col s12">Create An Account</h1>
                </div>
                {/* First name
                Last name
                (this is how other users will search for you) */}
                <div className="row">
                    <form className="col s6">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="username" type="text" className="validate" />
                                <label for="username" className="active">Choose Your Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="password" type="password" className="validate" />
                                <label for="password" className="active">Create A Password</label>
                            </div>
                        </div>
                    </form>
                    <form action="#">
                        <p>
                            <label>
                                <input type="checkbox" />
                                <span>Historical Sites</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" />
                                <span>Haunted Sites</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" />
                                <span>Roadside Attractions</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" />
                                <span>Other Option</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" />
                                <span>Other Option</span>
                            </label>
                        </p>
                    </form>
                </div>
                <div className="row">
                    <div className="col s6"></div>
                    <div className="col s6">
                    <button className="btn waves-effect waves-light btn-large" type="submit" name="action">CREATE YOUR ACCOUNT!<i className="material-icons right">send</i></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountCreation;
