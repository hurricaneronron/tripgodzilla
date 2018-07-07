import React from "react";
import UserChatMessage from "./UserChatMessage";
import axios from 'axios'
import socketIOClient from 'socket.io-client'

class MessageBox extends React.Component {
    state = {
        selectedBox : localStorage.getItem("selectedBoxId"),
        messages: [],
        endpoint: "http://localhost:4001", // this is where we are connecting to the sockets
    }

    loadMessages = () => {
        axios.get('/chatboxes/indivbox/' + this.state.selectedBox)
        .then(r => {
            var newMessageArray = []
            newMessageArray= r.data[0].messages
            this.setState({messages: newMessageArray})
            var x = document.getElementById("chatbox")
            x.scrollTop = x.scrollHeight
        //    console.log("x", x.scrollTop)
        })
        .catch(e => {
            console.log(e)
        })
    }

    componentDidMount () {
        //console.log(this.state.selectedBox)
        //axios.get('/chatboxes/indivbox/' + this.state.selectedBox)
        //.then(r => {
        this.loadMessages()
        //})
        //.catch(e => {
        //    console.log(e)
        //})
    }

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSend = () => {
        console.log(this.state.selectedBox)
        var message = this.state.message
        var newMessageArray = []
        var color = ""
        axios.get('/users/' + localStorage.getItem("userId"))
            .then(r => {
                color = r.data[0].color
                axios.get('/chatboxes/indivbox/' + this.state.selectedBox)
                .then(r => {
                    console.log(r)
                    newMessageArray= r.data[0].messages
                    newMessageArray.push({user: localStorage.getItem("userId"), message: message, color: color})
                    console.log(newMessageArray)
                    this.setState({messages: newMessageArray})
                    axios.put('/chatboxes/indivbox/' + this.state.selectedBox, {
                        messages: newMessageArray
                    })
                    .then(r => {
                        console.log(r)
                        this.refs.messageInput.value=""
                        const socket = socketIOClient(this.state.endpoint)
                        socket.emit('update message', this.state.selectedBox)
                    })
                    .catch(e => {
                        console.log(e)
                    })
                })
                .catch(e => {
                    console.log(e)
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        return(
        <div id="msg-box" className="card indigo lighten-2">
            <div className="card-content" id="chatbox" style={{overflowY: 'scroll', height: 300}}>
            {this.state.messages.map(box => {
                return (<UserChatMessage 
                    user = {box.user}
                    message = {box.message}
                    color = {box.color}
                />)
            })}
            </div>
            <div className="card-action">
                <div className="input-field">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea id="icon_prefix2" className="materialize-textarea" name="message" ref="messageInput" onChange={this.handleInputChange}></textarea>
                </div>
                <a className="waves-effect waves-light btn-small yellow black-text" onClick={this.handleSend}><i className="material-icons right">send</i>SEND</a>
            </div>
        </div>
        )
    }
}

export default MessageBox;
