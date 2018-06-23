import React from "react";

const UserChatMessage = props =>
<div className="card-panel blue darken-2 z-depth-1">
    <div className="row valign-wrapper">
        <span className="white-text">
        <span id="id">{props.user}: </span>
        <span id="message">{props.message}</span>
        </span>
    </div>
</div>

export default UserChatMessage;
