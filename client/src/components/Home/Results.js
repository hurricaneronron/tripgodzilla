import React from "react";
import AddToTrip from "./AddToTrip";

const Results = props =>
<div className="row">
    <div className="col s12">
      <div className="card">
        <div className="card-content">
          <span className="card-title">PROPS.PLACENAME</span>
          <a href="PROPS.URL">Link</a>
          <h6>Description</h6>
          <p>Description paragraph.</p>
        </div>
        <div className="card-action">
          <a href="PROPS.handleAddToTrip">Add to Trip</a>
        </div>
      </div>
    </div>
</div>

export default Results;
