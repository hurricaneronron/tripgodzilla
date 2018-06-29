import React from "react";

const UserChatMessage = props =>
<div className="card-panel blue darken-2 z-depth-1">
    {/* <div className="row"> */}
        {/* <span className="white-text"> */}
        <span id="id" className="yellow-text">{props.user}: </span>
        <span id="message" className="white-text">{props.message}</span>
        {/* </span> */}
    {/* </div> */}
</div>

export default UserChatMessage;
