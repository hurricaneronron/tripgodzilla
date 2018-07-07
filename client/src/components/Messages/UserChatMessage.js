import React from "react";
import axios from 'axios';

class UserChatMessage extends React.Component {
    state = {
        color: "blue darken-4"
    }
    componentDidMount () {
       // var colorgrab = []
       // colorgrab.push(document.getElementsByClassName("user-grab"))
       // console.log(colorgrab)
    }

    render () {
        return (
<div className={"card-panel " + this.props.color + " z-depth-1"}>
    {/* <div className="row"> */}
        {/* <span className="white-text"> */}
        <span id="id" className="yellow-text user-grab">{this.props.user}: </span>
        <span id="message" className="white-text">{this.props.message}</span>
        {/* </span> */}
    {/* </div> */}
</div>
        )
    }
}

export default UserChatMessage;