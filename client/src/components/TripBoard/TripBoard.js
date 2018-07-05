import React from "react";
import "../../styles/TripBoard.css";
import Navbar from "../Navbar";
import RightSidebar from "../RightSidebar";
import TripItems from "./TripItems";
import TripComments from "./TripComments";
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import socketIOClient from 'socket.io-client';

class TripBoard extends React.Component {
    state = {
        select: "",
        friends: [],
        userArray: [],
        name: "",
        description: "",
        tripItems: [],
        endpoint: "http://localhost:4001", // this is where we are connecting to the sockets
    }
    componentDidMount (){
        this.loadContent()
    }
    handleInputChange = event => {
        this.setState({
            select: event.target.value,
        })
    }
    loadContent = () => {
        axios.get('/pinboards/indivboard/' + localStorage.getItem("tripId"))
        .then(r => {
            console.log("important", r)
            this.setState({name: r.data[0].name})
            this.setState({description: r.data[0].description})
            let i
            var boardArray = []
            if(r.data[0].contentArray.length > 0) {
                for (i=0; i<r.data[0].contentArray.length; i++){
                    boardArray.push({id: r.data[0]._id, item: r.data[0].contentArray[i], admin: r.data[0].admin})
                }
            }
            console.log("look here", boardArray)
            this.setState({tripItems: boardArray})
        })
        .catch(e => {
            console.log(e)
        })
        axios.get('/users/' + localStorage.getItem("userId"))
            .then(r => {
                console.log(r)
                let i
                var friends = []
                for (i=0; i<r.data[0].friends.length; i++){
                    friends.push({friend: r.data[0].friends[i]})
                }
                console.log(friends)
                this.setState({friends: friends})
                })
            .catch(e => {
                console.log(e)
            })
    }

    handleAddFriend = e => {
        axios.get('/pinboards/indivboard/' + localStorage.getItem("tripId"), {
        })
        .then(r => {
            console.log(r)
            var userArray = this.state.userArray
            let i
            for (i=0; i<r.data[0].userArray.length; i++){
                userArray.push(r.data[0].userArray[i])
            }
            console.log(userArray)
            if (this.state.select.length > 0) {
                if (userArray.indexOf(this.state.select) === -1) {
                    var newFriend = this.state.select
                    userArray.push(newFriend)
                    console.log("check here", userArray)
                    this.setState({userArray: userArray})
                    axios.put('/pinboards/indiv/userupdate/' + localStorage.getItem("tripId"), {
                        userArray: this.state.userArray
                    })
                    .then(r => {
                        console.log(r)
                    })
                    .catch(e => {
                        console.log(e)
                    })
                }
                else {
                    alert("Your friend is already in this trip!")
                }
            } 
            else {
                alert("Please select a friend to add!")
            }
        })
        .catch(e => {
            console.log(e)
        })
    }
    render() {
    const socket = socketIOClient(this.state.endpoint)
    socket.on('update tripitem', (page) => {
        if (page === localStorage.getItem("tripId")) {
            this.loadContent()
        }
    })
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col s0 m1"></div>
                    <div className="col s12 m8">
                        <div className="row">
                            <div className="col s12 m4">
                            <h5>{this.state.name}</h5>
                            <h6>"{this.state.description}"</h6>
                            </div>
                            <div className="col s12 m4 right">
                            <div className="row">
                            <InputLabel htmlFor="age-simple">Add a Friend to this Trip: </InputLabel>
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
                                {this.state.friends.map(friend => {
                                return (<MenuItem 
                                    key = {friend.friend}
                                    value =  {friend.friend}
                                    name = {friend.friend}
                                    >{friend.friend}</MenuItem>)
                                })}
                                </Select>
                                </div>
                                <div className="row">
                                    <a className="waves-effect waves-light btn yellow black-text col s3 m3" onClick={this.handleAddFriend.bind(this)}>add</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div id="pinboard">
                                {this.state.tripItems.map(item => {
                                    return (<TripItems 
                                        key =  {item.id}
                                        id = {item.id}
                                        item = {item.item.name}
                                        link = {item.item.link}
                                        admin = {item.admin}
                                        description = {item.item.description}
                                        refresh = {this.loadContent}
                                        />)
                                })}
                            </div>
                        </div>
                        <TripComments />
                        <div className="divider"></div>
                    </div>
                <RightSidebar />
                </div>
            </div>
        )
    }
}

export default TripBoard;
