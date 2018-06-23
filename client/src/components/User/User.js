import React from "react";
import "../../styles/User.css";
import Navbar from "../Navbar";
import RightSidebar from "../RightSidebar";
import YourFilters from "./YourFilters";
import YourFriends from "./YourFriends";
import FriendRequests from "./FriendRequests";
import axios from 'axios'

class User extends React.Component {
    state = {
        filters: [],
        friends: []
    }
    componentDidMount () {
        this.loadElements()
        console.log("working")
    }

    loadElements = () => {
        axios.get('/users/' + localStorage.getItem("userId"))
        .then(r => {
            console.log(r)
            let i
            var filtersArray = []
            for (i=0; i<r.data[0].filters.length; i++){
                filtersArray.push({filter: r.data[0].filters[i]})
            }
            console.log(filtersArray)
            this.setState({filters: filtersArray})
        })
        .catch(e => {
            console.log(e)
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col s12 m9">
                        <div className="container">
                            <div className="col s12 m5 left">
                                <div className="row">
                                    <h5>Your Filters</h5>
                                </div> 
                                {this.state.filters.map(filter => {
                                return (<YourFilters 
                                    key =  {filter.filter}
                                    name = {filter.filter}
                                    />)
                                })}
                            </div>
                            <div className="col s12 m4 right">
                                <div className="row">
                                    <h5>Add A Friend</h5>
                                    <div className="row">
                                        <div className="input-field">
                                            <input placeholder="Enter Username" id="username" type="text" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <a className="waves-effect waves-light btn yellow black-text">add</a>
                                    </div>
                                </div>
                            </div>
                            <div className="row"></div>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col s12 m4 left">
                                    <h5>Your Friends</h5>
                                    <YourFriends />
                                    <YourFriends />
                                    <YourFriends />
                                </div>
                                <div className="col s12 m5 right">
                                    <h5>Friend Requests</h5>
                                    <FriendRequests />
                                    <FriendRequests />
                                    <FriendRequests />
                                </div>
                            </div>
                        </div>
                    </div>
                <RightSidebar />
                </div>

            </div>
        )
    }
}

export default User;
