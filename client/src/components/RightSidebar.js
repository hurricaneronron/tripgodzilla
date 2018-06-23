import React from "react";
import RecentMessages from "./RecentMessages";

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('select');
//     var instances = M.FormSelect.init(elems, options);
//   });

class RightSidebar extends React.Component {
    render() {
        return (
            <div className="col s12 m3 l3">
                <div className="container">
                    <div className="row">
                        <h6>Add to Trip</h6>
                    </div>
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
                        <div className="row">
                            <a className="waves-effect waves-light btn-small blue darken-4">ADD</a>
                        </div>
                    </form>
                    <div className="divider"></div>
                    <div className="row">
                        <h6>Recent Messages</h6>
                    </div>
                    <RecentMessages />
                </div>
            </div>
        )
    }
}

export default RightSidebar;
