import React from "react";
import AddToTrip from "./AddToTrip";

const Results = props =>
<div className="row">
    <div className="col s12">
      <div id="resultsCard" className="card indigo lighten-4">
        <div className="card-content">
          <span className="card-title truncate">PROPS.PLACENAME</span>
          <a className="truncate" href="PROPS.URL">Link</a>
          <h6>Description</h6>
          <p>Description paragraph.</p>
        </div>
        <div className="card-action">
          <a className="waves-effect waves-light btn-small yellow black-text" href="PROPS.handleAddToTrip">Add to Trip</a>
        </div>
      </div>
    </div>
</div>

export default Results;
