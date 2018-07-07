import React from "react";
import Navbar from "../Navbar";
import CurrentMessages from "./CurrentMessages";
import MessageBox from "./MessageBox";
import RightSidebar from "../RightSidebar";
import Footer from "../Footer";
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import socketIOClient from 'socket.io-client';

class Messages extends React.Component {
    state = {
        select: "",
        messageBoxes: [],
        selectedBox: localStorage.getItem("selectedBoxId"),
        userId: localStorage.getItem("userId"),
        name: localStorage.getItem("name"),
        friends: [],
        endpoint: "http://localhost:4001", // this is where we are connecting to the sockets
    }
    
    componentDidMount () {
        this.loadMessageBoxes()
    }

    loadMessageBoxes = () => {
     //   console.log("working")
     //   console.log(this.state.userId)
        axios.get('/chatboxes/' + this.state.userId)
            .then(r => {
            //    console.log(r)
                let i
                var boxArray = []
                for (i=0; i<r.data.length; i++){
                    boxArray.push({box: r.data[i]._id, messager:r.data[i].messager, messagee: r.data[i].messagee})
                }
                console.log(boxArray)
                this.setState({messageBoxes: boxArray})
                //should be an if clause here for when you've selected a box
                var testVariable = localStorage.getItem("selectedBoxId")
                console.log("variable",testVariable.length)
                {/*if (testVariable.length > 0) {
                
                }else {        
                    this.setState({selectedBox: this.state.messageBoxes[this.state.messageBoxes.length-1].box})
                } */}
                })
            .catch(e => {
                console.log(e)
            })
            axios.get('/users/' + this.state.userId)
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

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        this.setState({
            select: event.target.value,
        })
        const { name, value } = event.target;
        this.setState({
          [name]: value
        }); 
    };

    handleCreateChat (e, value) {
        var messagee = this.state.select
        var messager = this.state.userId
        console.log(messagee)
        axios.post('/chatboxes', {
            messager: messager,
            messagee: messagee
        })
        .then(r => {
            this.loadMessageBoxes()
            this.refs.chatCreateInput.value=""
        })
        .catch(e => {
            console.log(e)
        })
    }

    handleLoadMessages = () => {
        this._MessageBox.loadMessages()
    }

    render() {
    const socket = socketIOClient(this.state.endpoint)
    socket.on('update message', (page) => {
      if (page === localStorage.getItem("selectedBoxId")) {
     // window.location.reload()
      console.log("firing in messages.js")
      this._MessageBox.loadMessages()
      }
    })
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col s12 m9">
                        <div className="container">
                            <div className="row">
                                <h5>Start New Chat</h5>
                            </div>
                            <div className="row">
                                <div className="col s12 m5">
                                <InputLabel style={{color : "black"}} htmlFor="age-simple">Select Friend: </InputLabel>
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
                            </div>
                            <div className="row">
                                <a className="waves-effect waves-light btn yellow black-text col s3 m2 offset-s2 offset-m3" onClick={this.handleCreateChat.bind(this)}>chat</a>
                            </div>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col s12 m4 left">
                                    <h5>Your Chats</h5>
                                    {this.state.messageBoxes.map(box => {
                                    return (<CurrentMessages 
                                        key =  {box.box}
                                        box = {box.box}
                                        messager = {box.messager}
                                        messagee = {box.messagee}
                                        refresh = {this.handleLoadMessages}
                                        />)
                                    })}
                                </div>
                                <div className="col s12 m5 right">
                                <h5>Current Chat</h5>
                                <MessageBox ref={(MessageBox) => { this._MessageBox = MessageBox; }}/>
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

export default Messages;
