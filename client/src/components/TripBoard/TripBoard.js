import React from "react";
import "../../styles/TripBoard.css";
import Navbar from "../Navbar";
import RightSidebar from "../RightSidebar";
import TripItems from "./TripItems";
import TripComments from "./TripComments";
import TripNotes from "./TripNotes";

class TripBoard extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col s0 m1"></div>
                    <div className="col s12 m8">
                        <div className="row">
                            <h5>PROPS.TRIPNAME</h5>
                        </div>
                        <div className="row">
                            <div id="pinboard">
                                <TripItems />
                                <TripItems />
                                <TripItems />
                                <TripItems />
                                <TripItems />
                                <TripItems />
                            </div>
                        </div>
                        <TripComments />
                        <div className="divider"></div>
                        <TripNotes />
                    </div>
                <RightSidebar />
                </div>
            </div>
        )
    }
}

export default TripBoard;
