import React from "react";
import axios from 'axios';
import {Redirect} from "react-router-dom";

class Login extends React.Component {
state = {
    userId: "",
    password: "",
    toHome: false,
    alert: ""
}
handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
};
handleSignIn (e, value) {
    e.preventDefault()
    var userId = this.state.userId
    var password = this.state.password
    axios.get('/users/'+userId)
        .then(r => {
            console.log(r)
            if (r.data.length === 0) {
                this.setState({alert: "Sorry, we don't recognize your User Id."})
            }
            if(r.data[0].password === password) {
              //  alert(`Successful login, ${r.data[0].name}!`)
                localStorage.setItem("id", r.data[0]._id)
                localStorage.setItem("name", r.data[0].name)
                localStorage.setItem("userId", r.data[0].userId)
                localStorage.removeItem("selectedBoxId")
                localStorage.removeItem("trip")
                localStorage.removeItem("tripId")
                /// HERE: there needs to be a redirection to the home page after
                //localStorage is set - will figure out - might have to do with 
                //setting validation?
                this.refs.userIdInput.value=""
                this.refs.passwordInput.value=""
                this.setState({
                    toHome: true
                })
            }
            else{
                this.setState({alert: "Sorry, some of your information is incorrect."})
            }
        })
        .catch(e => {
            console.log(e)
        })
}
    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/Home' />
          }
        return(
            <div className="bg">
                <div className="logCont container">
                    <div className="row">
                        <h1 className="col s12">Sign In</h1>
                    </div>
                    <div className="row">
                        <form className="col s6">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input placeholder="Enter Your Username" id="username" type="text" className="validate" ref="userIdInput" name="userId" onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input placeholder="Enter Your Password" id="password" type="text" className="validate" ref="passwordInput" name="password" onChange={this.handleInputChange}/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <button className="btn waves-effect waves-light btn-large yellow black-text" type="submit" name="action"  onClick={this.handleSignIn.bind(this)}>SIGN IN</button>
                        </div>
                    </div>
                    <div className="row red-text" id="alert">
                        {this.state.alert}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
