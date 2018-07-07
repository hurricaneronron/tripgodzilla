import React from "react";
import AddToTrip from "./AddToTrip";


const Results = props => {

  if (props.roadside) {
    return (
      <div className="row">
        <div className="col s12">
          <div id="resultsCard" className="card indigo lighten-4">
            <div className="card-content">
              <span className="card-title">
                {props.id}. {props.title} ({props.city}, {props.state})
              </span>
              <a className="truncate" href="PROPS.URL">Link</a>
              <h6>{props.description}</h6>
              <p />
            </div>
            <div className="card-action">
              <a className="waves-effect waves-light btn-small yellow black-text" href="PROPS.handleAddToTrip">Add to Trip</a>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (props.haunted) {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card horizontal small blue-grey darken-1">
            <div className = "card-image">
              <img src = {props.src} alt = "image"/>
            </div>
            <div className = "card-stacked">
              <div className="card-content">
                <span className="card-title">
                {props.id}. {props.title} 
                </span>
                <h6>{props.city}, {props.state}</h6>
                <a href={props.link}>Link</a>
                <p> {props.description}</p>
              </div>
            </div>
            <div className="card-action">
              <a className="waves-effect waves-light btn-small yellow black-text" href="PROPS.handleAddToTrip">Add to Trip</a>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (props.historical) {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card horizontal small blue-grey darken-1">
            <div className = "card-image">
              <img src = {props.src} alt = "image"/>
            </div>
            <div className = "card-stacked">
              <div className="card-content">
                <span className="card-title">
                {props.id}. {props.description}
                </span>
                <a href={props.link}>Link</a>
                <h6> Significant Person: {props.person || 'NA'}</h6>
                <p> Architect: { props.architect || 'NA'}</p>
                <p> {props.address}</p>
              </div>
            </div>
            <div className="card-action">
              <a className="waves-effect waves-light btn-small yellow black-text" href="PROPS.handleAddToTrip">Add to Trip</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  


export default Results;
