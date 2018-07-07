import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

class AccountCreation extends React.Component {
    state = {
        userId: "",
        username: "",
        password: "",
        toLogin: false,
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
      handleAccountCreation (e, value) {
        e.preventDefault()
        var userFilters = []
        if(this.refs.historical.checked) {
            userFilters.push("historical")
        }
        if(this.refs.haunted.checked) {
            userFilters.push("haunted")
        }
        if(this.refs.roadside.checked) {
            userFilters.push("roadside")
        }
        console.log(userFilters)
        console.log(this.state)
        var id = this.state.userId
        var name = this.state.username
        var password = this.state.password 
        if(id.length > 1 && name.length > 1 && password.length > 1) {
            axios.get('/users')
                .then(r => {
                    var existingIds = []
                    let i
                    //console.log(r.data)
                    for (i=0; i<r.data.length; i++) {
                        existingIds.push(r.data[i].userId)
                    }
                var exists = existingIds.indexOf(id)
                if (exists  === -1) {
                    axios.post('/users', {
                        userId: id,
                        name: name,
                        filters: userFilters,
                        friends: [],
                        password: password, 
                        color: "blue darken-4"
                    })
                    .then(r => {
                        console.log(r)
                    axios.get('/users')
                    .then(r => {
                        console.log(r)
                        this.refs.userIdInput.value=""
                        this.refs.userNameInput.value=""
                        this.refs.passwordInput.value=""
                        this.setState({
                            toLogin: true
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
                })
                .catch(e => {
                    console.log(e)
                })
                } else {
                    this.setState({alert: "Sorry! That User Id already exists. Please try another."})
                    this.refs.userIdInput.value=""
                    this.refs.userNameInput.value=""
                    this.refs.passwordInput.value=""
                }
            })
            .catch(e => {
                console.log(e)
            })
        } else {
            this.setState({alert: "Oops! One of the required fields does not have sufficient quantity!"})
        }
      };
    render() {
        if (this.state.toLogin === true) {
            return <Redirect to='/Login' />
          }
        return(
            <div className="bg">
                <div className="logCont container">
                    <div className="row">
                        <h1 className="col s12" onClick={this.handleAccountCreation.bind(this)}>Create An Account</h1>
                    </div>
                    {/* First name
                    Last name
                    (this is how other users will search for you) */}
                    <div className="row">
                        <form className="col s6">
                            <div className="row">
                                <h6>Choose A UserID</h6>
                                <p>(This must be unique and is how other users will search for you)</p>
                                <div className="input-field col s6">
                                    <input placeholder="UserID" id="userid" type="text" className="validate" ref="userIdInput" onChange={this.handleInputChange} name="userId"/>
                                </div>
                            </div>
                            <div className="row">
                                <h6>Choose A Display Name</h6>
                                <p>(This is the name that will be displayed throughout the site)</p>
                                <div className="input-field col s6">
                                    <input placeholder="Display Name" id="username" type="text" className="validate" ref="userNameInput" onChange={this.handleInputChange} name="username"/>
                                </div>
                            </div>
                            <div className="row">
                                <h6>Choose A Password</h6>
                                <div className="input-field col s6">
                                    <input placeholder="Password" id="password" type="text" className="validate" ref="passwordInput" onChange={this.handleInputChange} name="password"/>
                                </div>
                            </div>
                        </form>
                    <form action="#">
                            <p>
                                <label>
                                    <input type="checkbox" ref="historical"/>
                                    <span className="checkbox-content">Historical Sites</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" ref="haunted" />
                                    <span className="checkbox-content">Haunted Sites</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" ref="roadside" />
                                    <span className="checkbox-content">Roadside Attractions</span>
                                </label>
                            </p>
                    </form>
                    <div className="row">
                        <div className="col s6"></div>
                        <div className="col s6">
                        <button className="btn waves-effect waves-light btn-large yellow black-text" type="submit" name="action" onClick={this.handleAccountCreation.bind(this)}>CREATE YOUR ACCOUNT!<i className="material-icons right">send</i></button>
                        </div>
                    <div className="row red-text text-darken-3" id="alert">
                        {this.state.alert}
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountCreation;
