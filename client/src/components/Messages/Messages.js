import React from "react";
import Navbar from "../Navbar";
import CurrentMessages from "./CurrentMessages";
import MessageBox from "./MessageBox";

class Messages extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div class="row">
                    <div class="col s12 m9 19">
                        <div class="row">
                            <h5>Start New Chat</h5>
                        </div>
                        <div class="row">
                            <div class="input-field col s12 m5 13">
                                <input placeholder="Enter Username" id="username" type="text" />
                            </div>
                        </div>
                        <div class="row">
                            <a class="waves-effect waves-light btn yellow black-text col s3 m2 offset-s2 offset-m3">chat</a>
                        </div>
                        <div class="divider"></div>
                        <div class="row">
                            <div class="col s12 m4 13 left">
                                <h5>Current Messages</h5>
                                <div id="currentChats">
                                    <CurrentMessages />
                                </div>
                            </div>
                            <div class="col s12 m5 13 right">
                                <h5>Chat with PROPS.USERNAME</h5>
                                <MessageBox />
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m3 13">
                        <h6>Add to Trip</h6>
                    </div>
                </div>
            </div>
        )    
    }
}

export default Messages;
