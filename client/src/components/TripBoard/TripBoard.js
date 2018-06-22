import React from "react";
import "../../styles/TripBoard.css";
import Navbar from "../Navbar";
import RightSidebar from "../RightSidebar";

class TripBoard extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col s12 m9">
                        <div className="container">
                            <h5>PROPS.TRIPNAME</h5>
                            
                        </div>
                    </div>
                <RightSidebar />
                </div>
            </div>
        )
    }
}

export default TripBoard;
