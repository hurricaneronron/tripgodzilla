import React from "react";
import Navbar from "../Navbar";
import RightSidebar from "../RightSidebar";
import Footer from "../Footer";
import YourFilters from "./YourFilters";
import YourFriends from "./YourFriends";
import FriendRequests from "./FriendRequests";
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import socketIOClient from 'socket.io-client';

class User extends React.Component {
    state = {
        filters: [],
        friends: [],
        friendrequests: [],
        alert: "",
        alert2: "",
        alert3: "",
        endpoint: "http://localhost:4001", // this is where we are connecting to the sockets
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
        this.setState({alert: ""})
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
                        this.loadElements()
                    })
                    .catch(e => {
                        console.log(e)
                    })
                }
                else {
                    this.setState({alert: "You've already added that filter!"})
                    setTimeout(
                        function() {
                            this.setState({alert:""});
                        }
                        .bind(this),
                        2500
                    );
                }
        })
        .catch(e => {
                console.log(e)
        })
    }
    handleFaveColor = () => {
        var changeColor = this.state.color
        console.log(changeColor)
        axios.put('/users/favecolor/' + localStorage.getItem('userId'), {
            color: changeColor
            })
            .then(r => {
                console.log(r)
                this.loadElements()
                this.setState({alert2: "Your new chat color is set!"})
                this.refs.friendinput.value=""
                setTimeout(
                    function() {
                        this.setState({alert2:""});
                    }
                    .bind(this),
                    2500
                );
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
                        this.refs.friendinput.value=""
                        this.setState({alert: "You've already sent that person a friend request."})
                        setTimeout(
                            function() {
                                this.setState({alert:""});
                            }
                            .bind(this),
                            2500
                        );
                        } else {
                            axios.get(`/friendrequests/pending/${requestee}/${requester}`)
                            .then(r => {
                                if (r.data.length > 0){
                                    console.log("exists", r.data.length)
                                    this.refs.friendinput.value=""
                                    this.setState({alert: "You already have a friend request from that user!"})
                                    } else {
                                    axios.post('/friendrequests', {
                                        requester: requester,
                                        requestee: requestee,
                                        accepted: false
                                    })
                                    .then(r => {
                                        this.refs.friendinput.value=""
                                        const socket = socketIOClient(this.state.endpoint)
                                        socket.emit('update friendrequest', [requester, requestee])
                                        this.loadElements()
                                        this.setState({alert3: "Friend request sent!"})
                                        setTimeout(
                                            function() {
                                                this.setState({alert3:""});
                                            }
                                        .bind(this),
                                            2500
                                        );
                                    })
                                    .catch(e => {
                                    console.log(e)
                                    })
                                }
                            })
                        }
                    })
                } else {
                    this.setState({alert: "You're already friends with this user!"})
                    this.refs.friendinput.value=""
                    setTimeout(
                        function() {
                            this.setState({alert:""});
                        }
                        .bind(this),
                        2500
                    );
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        const socket = socketIOClient(this.state.endpoint)
        socket.on('update friendslist', (page) => {
            if (page === page) {
                this.loadElements()
                console.log(page)
            }
          })
        socket.on('update friendrequest', (page) => {
        //    if (page[0] === localStorage.getItem("userId") || page[1] === localStorage.getItem("userId")) {
              this.loadElements()
        //    }
        })
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col s12 m8 offset-m1">
                    <div className="content-container">
                        <div className="row">
                            <div className="col s12 m4 left">
                                <div className="row">
                                    <h5>Your Filters</h5>
                                </div> 
                                {this.state.filters.map(filter => {
                                return (<YourFilters 
                                    key =  {filter.filter}
                                    name = {filter.filter}
                                    refresh = {this.loadElements}
                                    />)
                                })}
                                <div className="row">
                                    <InputLabel htmlFor="age-simple" style={{color : "black"}}>Add a Filter: </InputLabel>
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
                                </div>
                                <div className="row">
                                    <div className="input-field">
                                        <input placeholder="Enter Username" id="username" type="text" ref="friendinput" name="requestee" onChange={this.handleInputChange}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <a className="waves-effect waves-light btn yellow black-text" onClick={this.handleFriendRequest.bind(this)}>add</a>
                                </div>
                                <div className="row">
                                    <div className="red-text" id="alert">
                                        {this.state.alert}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="blue-text" id="alert">
                                        {this.state.alert3}
                                    </div>
                                </div>
                                <div className="row">
                                    <h5>Chat Color</h5>
                                </div> 
                                <div className="row">
                                    <InputLabel htmlFor="age-simple" style={{color: 'black'}}>Set Your Favorite Color: </InputLabel>
                                    <Select
                                        value={this.state.color}
                                        onChange={this.handleInputChange}
                                        inputProps={{
                                        name: 'color',
                                        }}
                                    >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="red darken-4">Red</MenuItem>
                                    <MenuItem value="pink darken-1">Pink</MenuItem>
                                    <MenuItem value="orange darken-4">Orange</MenuItem>
                                    <MenuItem value="green darken-3">Green</MenuItem>
                                    <MenuItem value="cyan darken-3">Cyan</MenuItem>
                                    <MenuItem value="blue darken-4">Blue</MenuItem>
                                    <MenuItem value="purple darken-4">Purple</MenuItem>
                                    <MenuItem value="grey darken-4">Black</MenuItem>
                                    </Select>
                                </div>
                                <div className="row">
                                    <a className="waves-effect waves-light btn yellow black-text" onClick={this.handleFaveColor}>set</a>
                                </div>
                                <div className="row">
                                    <div className="blue-text" id="alert">
                                        {this.state.alert2}
                                    </div>
                                </div>
                            </div>
                            <div className="row"></div>
                            <div className="divider"></div>
                        </div>

                        <div className="row">
                            <div className="col s12 m4 left">
                                <h5>Your Friends</h5>
                                {this.state.friends.map(friend => {
                                return (<YourFriends 
                                    key =  {friend.friend}
                                    name = {friend.friend}
                                    refresh = {this.loadElements}
                                />)
                                })}
                            </div>
                            <div className="col s12 m4 right">
                                <h5>Friend Requests</h5>
                                {this.state.friendrequests.map(request => {
                                return (<FriendRequests 
                                    key =  {request.id}
                                    id = {request.id}
                                    requester = {request.requester}
                                    refresh = {this.loadElements}
                                    />)
                                })}
                            </div>
                        </div>
                    </div>
                    </div>
                <RightSidebar />
                </div>
                <Footer />
            </div>
        )
    }
}

export default User;
