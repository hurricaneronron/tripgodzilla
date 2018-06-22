import React from "react";
import "../styles/Login.css";
import axios from 'axios'

class Login extends React.Component {
state = {
    userId: "",
    password: ""
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
            if (r.data.length == 0) {
                alert("Sorry, we don't recognize your User Id.")
            }
            if(r.data[0].password == password) {
                alert(`Successful login, ${r.data[0].name}!`)
                localStorage.setItem("id", r.data[0]._id)
                localStorage.setItem("name", r.data[0].name)
                localStorage.setItem("userId", r.data[0].userId)
                /// HERE: there needs to be a redirection to the home page after
                //localStorage is set - will figure out - might have to do with 
                //setting validation?
            }
            else{
                alert("Sorry, some of your information is incorrect.")
            }
        })
        .catch(e => {
            console.log(e)
        })
}
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
                                <input id="username" type="text" className="validate" name="userId" onChange={this.handleInputChange}/>
                                <label htmlFor="username" className="active">Enter Your Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="password" type="password" className="validate" name="password" onChange={this.handleInputChange}/>
                                <label htmlFor="password" className="active">Enter Your Password</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col s6">
                    <button className="btn waves-effect waves-light btn-large" type="submit" name="action"  onClick={this.handleSignIn.bind(this)}>SIGN IN</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
