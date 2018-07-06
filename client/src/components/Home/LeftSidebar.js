import React from "react";

const LeftSidebar = props =>
    <div className="container">
        <form action="#">
            <p>
                <label>
                    <input type="checkbox" value = {props.name} className="filled-in" onClick={props.filterUpdate} />
                    <span>{props.name}</span>
                </label>
            </p>
        </form>
    </div>

export default LeftSidebar;
