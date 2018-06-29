import React from "react";

const Comment = props =>
<div className="card">
    <div className="card-content">
        <a className="waves-effect waves-light red darken-4 btn-small right">X</a>
        <span className="card-title">{props.user}</span>
        <p>{props.comment}</p>
        <p>{props.timestamp}</p>
    </div>
</div>

export default Comment;
