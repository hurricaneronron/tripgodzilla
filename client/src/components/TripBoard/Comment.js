import React from "react";

const Comment = props =>
<div className="card">
    <div className="card-content">
        <a className="waves-effect waves-light red darken-4 btn-small right" onClick="PROPS.handleDeleteComment">X</a>
        <span class="card-title">PROPS.USERNAME</span>
        <p>PROPS.DATE</p>
        <p>PROPS.TRIPCOMMENT</p>
    </div>
</div>

export default Comment;
