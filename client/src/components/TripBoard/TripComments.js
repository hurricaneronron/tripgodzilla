import React from "react";
import Comment from "./Comment"

const TripComments = props =>
<div>
    <h5>Comments</h5>
    <form>
        <div className="row">
            <div className="input-field">
                <textarea placeholder="Type your shared comment here" id="trip_comment" className="materialize-textarea"></textarea>
            </div>
        </div>
        <div className="row">
            <a className="waves-effect waves-light btn-small blue darken-4">ADD</a>
        </div>
    </form>
    <Comment />
</div>

export default TripComments;
