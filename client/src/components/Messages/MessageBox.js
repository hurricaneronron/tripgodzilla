import React from "react";
// import "../../styles/MessageBox";
import UserChatMessage from "./UserChatMessage";
import FriendChatMessage from "./FriendChatMessage";
import axios from 'axios'

class MessageBox extends React.Component {
    state = {
        selectedBox : localStorage.getItem("selectedBoxId"),
        messages: []
    }

    loadMessages = () => {
        axios.get('/chatboxes/indivbox/' + this.state.selectedBox)
        .then(r => {
            var newMessageArray = []
            newMessageArray= r.data[0].messages
            this.setState({messages: newMessageArray})
        })
        .catch(e => {
            console.log(e)
        })
    }

    componentDidMount () {
        console.log(this.state.selectedBox)
        axios.get('/chatboxes/indivbox/' + this.state.selectedBox)
        .then(r => {
            this.loadMessages()
        })
        .catch(e => {
            console.log(e)
        })
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
        axios.get('/chatboxes/indivbox/' + this.state.selectedBox)
        .then(r => {
            console.log(r)
            newMessageArray= r.data[0].messages
            newMessageArray.push({user: localStorage.getItem("userId"), message: message})
            console.log(newMessageArray)
            this.setState({messages: newMessageArray})
            axios.put('/chatboxes/indivbox/' + this.state.selectedBox, {
                messages: newMessageArray
            })
            .then(r => {
                console.log(r)
                this.refs.messageInput.value=""
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
        <div className="card">
            <div className="card-content" style={{overflowY: 'scroll', height: 400}}>
            {this.state.messages.map(box => {
                return (<UserChatMessage 
                    user = {box.user}
                    message = {box.message}
                />)
            })}
            </div>
            <div className="card-action">
                <div className="input-field">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea id="icon_prefix2" className="materialize-textarea" name="message" ref="messageInput" onChange={this.handleInputChange}></textarea>
                </div>
                <a className="waves-effect waves-light btn-small blue darken-4" onClick={this.handleSend}><i className="material-icons right">send</i>SEND</a>
            </div>
        </div>
        )
    }
}

export default MessageBox;
