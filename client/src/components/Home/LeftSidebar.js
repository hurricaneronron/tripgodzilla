import React from "react";

const LeftSidebar = props =>
    <div className="container">
        <form action="#">
            <p>
                <label>
                    <input type="checkbox" className="filled-in" />
                    <span className="checkbox-content">{props.name}</span>
                </label>
            </p>
        </form>
    </div>

export default LeftSidebar;
