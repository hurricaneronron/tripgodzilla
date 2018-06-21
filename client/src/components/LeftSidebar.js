import React from "react";

const LeftSidebar = props =>
<div className="col s12 m2">
    <div className="container">
        <h6>Filters</h6>
        <form action="#">
            <p>
                <label>
                    <input type="checkbox" class="filled-in" />
                    <span>PROPS.FILTERS</span>
                </label>
            </p>
            <p>
                <label>
                    <input type="checkbox" class="filled-in" />
                    <span>PROPS.FILTERS</span>
                </label>
            </p>
            <p>
                <label>
                    <input type="checkbox" class="filled-in" />
                    <span>PROPS.FILTERS</span>
                </label>
            </p>
        </form>
    </div>
</div>

export default LeftSidebar;
