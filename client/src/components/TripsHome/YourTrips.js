import React from "react";

const YourTrips = props =>
<div className="row">
    <div className="card">
        <div className="card-content">
            <span className="card-title">PROPS.TRIPNAME</span>
            <p>PROPS.TRIPDESCRIPTION</p>
        </div>
        <div className="card-action">
            <div className="row">
                <a className="waves-effect waves-light btn-small yellow black-text left" href={props.handleViewTrip}>View Trip</a>
                <a className="waves-effect waves-light btn-small red darken-4 right" href={props.handleDeleteTrip}>Delete Trip</a>
            </div>
        </div>
    </div>
</div>

export default YourTrips;
