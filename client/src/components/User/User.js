import React from "react";
import "../../styles/User.css";
import Navbar from "../Navbar";
import RightSidebar from "../RightSidebar";
import YourFilters from "./YourFilters";
import YourFriends from "./YourFriends";
import FriendRequests from "./FriendRequests";
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class User extends React.Component {
    state = {
        filters: [],
        friends: [],
        friendrequests: []
    }

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
          [name]: value
        }); 
    };
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
            var friendsArray = []
            for (i=0; i<r.data[0].friends.length; i++){
                friendsArray.push({friend: r.data[0].friends[i]})
            }
            console.log(friendsArray)
            this.setState({friends: friendsArray})
            console.log(this.state.friends)
        })
        .catch(e => {
            console.log(e)
        })
        axios.get('/friendrequests/' + localStorage.getItem("userId"))
        .then(r => {
            console.log(r)
            let i
            var requestArray = []
            for (i=0; i<r.data.length; i++){
                requestArray.push({requester: r.data[i].requester, id: r.data[i]._id})
            }
            console.log(requestArray)
            this.setState({friendrequests: requestArray})
            })
        .catch(e => {
            console.log(e)
        })
    }
    handleAddFilter = () => {
        var addFilter = this.state.select
        axios.get('/users/' + localStorage.getItem("userId"))
        .then(r => {
            console.log(r)
            var filtersArray = r.data[0].filters
            if (filtersArray.indexOf(addFilter) === -1) {
                filtersArray.push(addFilter)
                console.log(filtersArray)
                axios.put('/users/filters/' + localStorage.getItem("userId"), {
                    filters: filtersArray
                    })
                    .then(r => {
                        console.log(r)
                        window.location.reload()
                    })
                    .catch(e => {
                        console.log(e)
                    })
                }
                else {
                    alert("You've already added that filter!")
                }
        })
        .catch(e => {
                console.log(e)
        })
    }
    handleFriendRequest = () => {
        console.log("working")
        var requestee = this.state.requestee
        var requester = localStorage.getItem("userId")
        axios.get('/users/' + requester)
                .then(r => {
                var requesterFriends = r.data[0].friends
                var exists = requesterFriends.indexOf(requestee)
                if (exists  === -1) {
                    axios.get(`/friendrequests/pending/${requester}/${requestee}`)
                    .then(r => {
                        if (r.data.length > 0){
                        console.log("exists", r.data.length)
                        alert("You have already sent this person a friend request.")
                        } else {
                            axios.get(`/friendrequests/pending/${requestee}/${requester}`)
                            .then(r => {
                                if (r.data.length > 0){
                                    console.log("exists", r.data.length)
                                    alert("This person has already sent you a friend request. Check your friend requests to accept!")
                                    } else {
                                    axios.post('/friendrequests', {
                                        requester: requester,
                                        requestee: requestee,
                                        accepted: false
                                    })
                                    .then(r => {
                                        this.refs.friendinput.value=""
                                        this.loadElements()
                                    })
                                    .catch(e => {
                                    console.log(e)
                                    })
                                }
                            })
                        }
                    })
                } else {
                    alert("Good news! You're already friends with this user!")
                    this.refs.friendinput.value=""
                }
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
                                <div className="row">
                                    <InputLabel htmlFor="age-simple">Add a Filter: </InputLabel>
                                    <Select
                                        value={this.state.select}
                                        onChange={this.handleInputChange}
                                        inputProps={{
                                        name: 'select',
                                        }}
                                    >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="historical sites">Historical Sites</MenuItem>
                                    <MenuItem value="haunted sites">Haunted Sites</MenuItem>
                                    <MenuItem value="roadside attractions">Roadside Attractions</MenuItem>
                                    </Select>
                                </div>
                                <div className="row">
                                    <a className="waves-effect waves-light btn yellow black-text" onClick={this.handleAddFilter}>add</a>
                                </div>
                            </div>
                            <div className="col s12 m4 right">
                                <div className="row">
                                    <h5>Add A Friend</h5>
                                    <div className="row">
                                        <div className="input-field">
                                            <input placeholder="Enter Username" id="username" type="text" ref="friendinput" name="requestee" onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <a className="waves-effect waves-light btn yellow black-text" onClick={this.handleFriendRequest.bind(this)}>add</a>
                                    </div>
                                </div>
                            </div>
                            <div className="row"></div>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col s12 m4 left">
                                    <h5>Your Friends</h5>
                                    {this.state.friends.map(friend => {
                                    return (<YourFriends 
                                        key =  {friend.friend}
                                        name = {friend.friend}
                                    />)
                                    })}
                                </div>
                                <div className="col s12 m5 right">
                                    <h5>Friend Requests</h5>
                                    {this.state.friendrequests.map(request => {
                                    return (<FriendRequests 
                                        key =  {request.id}
                                        id = {request.id}
                                        requester = {request.requester}
                                        />)
                                    })}
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
