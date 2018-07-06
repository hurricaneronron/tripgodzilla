import React from "react";
import AddToTrip from "./AddToTrip";

const Results = props => {

  if (props.historical) {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">
                {props.id}. {props.title} ({props.city}, {props.state})
              </span>
              <a href="PROPS.URL">Link</a>
              <h6>{props.description}</h6>
              <p />
            </div>
            <div className="card-action">
              <a href="PROPS.handleAddToTrip">Add to Trip</a>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (props.haunted) {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">
                {props.id}. {props.title} ({props.city}, {props.state})
              </span>
              <a href="PROPS.URL">Link</a>
              <h6>{props.description}</h6>
              <p />
            </div>
            <div className="card-action">
              <a href="PROPS.handleAddToTrip">Add to Trip</a>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (props.roadside) {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">
                {props.description}
              </span>
              <a href="PROPS.URL">Link</a>
              <h6> Significant Person: {props.person || 'NA'}</h6>
              <p> Architect: { props.architect || 'NA'}</p>
              <p> {props.address}</p>
            </div>
            <div className="card-action">
              <a href="PROPS.handleAddToTrip">Add to Trip</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  


export default Results;
