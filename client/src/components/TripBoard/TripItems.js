import React from "react";

const TripItems = props =>
<div className="col s12 m4">
    <div className="card yellow lighten-3">
        <div className="card-content">
            <a className="waves-effect waves-light red darken-4 btn-small right" onClick="PROPS.handleDeleteFromTrip">X</a>
            <span className="card-title">PROPS.Placename</span>
            <a href="PROPS.URL">Link</a>
            <p>Description paragraph.</p>
        </div>
    </div>
</div>

export default TripItems;
