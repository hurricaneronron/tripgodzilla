import React from "react";
import "../styles/AccountCreation.css";
import axios from "axios"

class AccountCreation extends React.Component {
    state = {
        userId: "",
        username: "",
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
            axios.post('/users', {
                userId: id,
                name: name,
                filters: userFilters,
                friends: [],
                password: password
            })
            .then(r => {
                console.log(r)
                axios.get('/users')
                .then(r => {
                    console.log(r)
                })
                .catch(e => {
                    console.log(e)
                })
            })
          .catch(e => {
            console.log(e)
          })
        } else {
            alert("Oops! One of the required fields does not have sufficient quantity!")
        }
      };
    render() {
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
                            <div className="input-field col s6">
                                <input id="userid" type="text" className="validate" onChange={this.handleInputChange} name="userId"/>
                                <label htmlFor="userid" className="active">Create Your User Id</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="username" type="text" className="validate" onChange={this.handleInputChange} name="username"/>
                                <label htmlFor="username" className="active">Set Your User Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="password" type="password" className="validate" onChange={this.handleInputChange} name="password"/>
                                <label htmlFor="password" className="active">Create a Password</label>
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
                    <button className="btn waves-effect waves-light btn-large" type="submit" name="action" onClick={this.handleAccountCreation.bind(this)}>CREATE YOUR ACCOUNT!<i className="material-icons right">send</i></button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default AccountCreation;
