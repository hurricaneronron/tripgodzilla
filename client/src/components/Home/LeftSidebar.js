import React from "react";

const LeftSidebar = props =>
    <div className="container">
        <form action="#">
            <p>
                <label>
                    <input type="checkbox" className="filled-in" />
                    <span>{props.name}</span>
                </label>
            </p>
        </form>
    </div>

export default LeftSidebar;
