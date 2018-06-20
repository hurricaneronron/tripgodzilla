import React from "react";
import "../styles/AccountCreation.css";
class AccountCreation extends React.Component {

    render() {
        return(
            <div class="container">
                <div class="row">
                    <h1 class="col s12">Create An Account</h1>
                </div>
                <div class="row">
                    <form class="col s6">
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="username" type="text" class="validate" />
                                <label for="username" class="active">Choose Your Username</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="password" type="password" class="validate" />
                                <label for="password" class="active">Create A Password</label>
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
                <div class="row">
                    <div class="col s6"></div>
                    <div class="col s6">
                    <button class="btn waves-effect waves-light btn-large" type="submit" name="action">CREATE YOUR ACCOUNT!<i class="material-icons right">send</i></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountCreation;