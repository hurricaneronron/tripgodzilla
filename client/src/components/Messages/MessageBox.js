import React from "react";
// import "../../styles/MessageBox";
import UserChatMessage from "./UserChatMessage";
import FriendChatMessage from "./FriendChatMessage";

const MessageBox = props =>
        <div className="card">
            <div className="card-content">
            <UserChatMessage />
            <FriendChatMessage />
            <UserChatMessage />
            <FriendChatMessage />
            <UserChatMessage />
            </div>
            <div className="card-action">
                <div className="input-field">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                </div>
                <a className="waves-effect waves-light btn-small blue darken-4"><i className="material-icons right">send</i>SEND</a>
            </div>
        </div>

export default MessageBox;
