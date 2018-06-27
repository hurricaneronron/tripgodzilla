import React from "react";
import Navbar from "../Navbar";
import CurrentMessages from "./CurrentMessages";
import MessageBox from "./MessageBox";
import RightSidebar from "../RightSidebar";
import axios from 'axios'

class Messages extends React.Component {
    state = {
        messageBoxes: [],
        selectedBox: localStorage.getItem("selectedBoxId"),
        userId: localStorage.getItem("userId"),
        name: localStorage.getItem("name")
    }
    
    componentDidMount () {
        this.loadMessageBoxes()
    }

    loadMessageBoxes = () => {
        console.log("working")
        console.log(this.state.userId)
        axios.get('/chatboxes/' + this.state.userId)
            .then(r => {
                console.log(r)
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
    }

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
          [name]: value
        }); 
    };

    handleCreateChat (e, value) {
        var messagee = this.state.messagee
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

    render() {
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
                                <div className="input-field col s12 m5">
                                    <input placeholder="Enter Username" id="username" type="text" ref="chatCreateInput" onChange={this.handleInputChange} name="messagee"/>
                                </div>
                            </div>
                            <div className="row">
                                <a className="waves-effect waves-light btn yellow black-text col s3 m2 offset-s2 offset-m3" onClick={this.handleCreateChat.bind(this)}>chat</a>
                            </div>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col s12 m4 left">
                                    <h5>Current Messages</h5>
                                    {this.state.messageBoxes.map(box => {
                                    return (<CurrentMessages 
                                        key =  {box.box}
                                        box = {box.box}
                                        messager = {box.messager}
                                        messagee = {box.messagee}
                                        />)
                                    })}
                                </div>
                                <div className="col s12 m5 right">
                                <h5>Chat ID={this.state.selectedBox}</h5>
                                <MessageBox />
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

export default Messages;
