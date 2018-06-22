import React from "react";
import Note from "./Note"

const TripNotes = props =>
<div>
    <h5>Notes</h5>
    <form>
        <div className="row">
            <div className="input-field">
                <textarea placeholder="Type your personal note here" id="trip_note" className="materialize-textarea"></textarea>
            </div>
        </div>
        <div className="row">
            <a className="waves-effect waves-light btn-small blue darken-4">ADD</a>
        </div>
    </form>
    <Note />
</div>

export default TripNotes;
