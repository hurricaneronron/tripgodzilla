import React from "react";

const AddToTrip = props =>
<div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
            <span class="card-title">Add to Trip</span>
            <form>
                <div className="row">
                    <div className="input-field">
                        <input placeholder="Item Name" id="item_name" type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <input placeholder="Link" id="item_link" type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <textarea placeholder="Description" id="item_description" className="materialize-textarea"></textarea>
                    </div>
                </div>
                <div className="row">
                    {/* <div className="input-field">
                        <select multiple>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                        <label>Select Your Trip(s)</label>
                    </div> */}
                </div>
            </form>
        </div>
            <div className="card-action">
                <a className="waves-effect waves-light btn-small blue darken-4">ADD</a>
            </div>
      </div>
    </div>
</div>

export default AddToTrip;
