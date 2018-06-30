import React from "react";
import "../styles/AccountCreation.css";
import axios from "axios";
import {Redirect} from "react-router-dom";

class AccountCreation extends React.Component {
    state = {
        userId: "",
        username: "",
        password: "",
        toLogin: false
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
        if(this.refs.other1.checked) {
            userFilters.push("other1")
        }
        if(this.refs.other2.checked) {
            userFilters.push("other2")
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
                        password: password
                    })
                    .then(r => {
                        alert(`Successful Account Creation, ${name}! Please Login.`)
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
                    alert("Sorry! That userId already exists. Please try another.")
                    this.refs.userIdInput.value=""
                    this.refs.userNameInput.value=""
                    this.refs.passwordInput.value=""
                }
            })
            .catch(e => {
                console.log(e)
            })
        } else {
            alert("Oops! One of the required fields does not have sufficient quantity!")
        }
      };
    render() {
        if (this.state.toLogin === true) {
            return <Redirect to='/Login' />
          }
        return(
            <div className="container">
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
                                <input id="userid" type="text" className="validate" ref="userIdInput" onChange={this.handleInputChange} name="userId"/>
                                <label htmlFor="userid" className="active">UserID</label>
                            </div>
                        </div>
                        <div className="row">
                            <h6>Choose A Display Name</h6>
                            <p>(This is the name that will be displayed throughout the site)</p>
                            <div className="input-field col s6">
                                <input id="username" type="text" className="validate" ref="userNameInput" onChange={this.handleInputChange} name="username"/>
                                <label htmlFor="username" className="active">Display Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <h6>Choose A Password</h6>
                                <input id="password" type="password" className="validate" ref="passwordInput" onChange={this.handleInputChange} name="password"/>
                                <label htmlFor="password" className="active">Password</label>
                            </div>
                        </div>
                    </form>
                <form action="#">
                        <p>
                            <label>
                                <input type="checkbox" ref="historical"/>
                                <span>Historical Sites</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" ref="haunted" />
                                <span>Haunted Sites</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" ref="roadside" />
                                <span>Roadside Attractions</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" ref="other1" />
                                <span>Other Option</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" ref="other2" />
                                <span>Other Option</span>
                            </label>
                        </p>
                </form>
                <div className="row">
                    <div className="col s6"></div>
                    <div className="col s6">
                    <button className="btn waves-effect waves-light btn-large yellow black-text" type="submit" name="action" onClick={this.handleAccountCreation.bind(this)}>CREATE YOUR ACCOUNT!<i className="material-icons right">send</i></button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default AccountCreation;
