import React from "react";
// import "../../styles/MessageBox";
import UserChatMessage from "./UserChatMessage";
import FriendChatMessage from "./FriendChatMessage";

const MessageBox = props =>
        <div class="card">
            <div class="card-content">
            <UserChatMessage />
            <FriendChatMessage />
            <UserChatMessage />
            <FriendChatMessage />
            <UserChatMessage />
            </div>
            <div class="card-action">
                <div class="input-field">
                    <i class="material-icons prefix">mode_edit</i>
                    <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                </div>
                <a class="waves-effect waves-light btn-small blue darken-4"><i class="material-icons right">send</i>SEND</a>
            </div>
        </div>

export default MessageBox;
