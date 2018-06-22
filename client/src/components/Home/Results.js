import React from "react";
import AddToTrip from "./AddToTrip";

const Results = props =>
<div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span class="card-title">PROPS.PLACENAME</span>
          <a href="PROPS.URL">Link</a>
          <h6>Description</h6>
          <p>Description paragraph.</p>
        </div>
        <div class="card-action">
          <a href="PROPS.handleAddToTrip">Add to Trip</a>
        </div>
      </div>
    </div>
</div>

export default Results;
