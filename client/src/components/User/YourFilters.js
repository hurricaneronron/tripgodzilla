import React from "react";

const YourFilters = props =>
<div className="row">
        <p>{props.name}</p>
        <a className="waves-effect waves-light red darken-4 btn-small">HIDE</a>
        <a className="waves-effect waves-light blue darken-4 btn-small">SHOW</a>
</div>

export default YourFilters;
