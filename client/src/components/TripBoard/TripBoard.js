import React from "react";
import "../../styles/TripBoard.css";
import Navbar from "../Navbar";

class TripBoard extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div>Trip Board.</div>
            </div>
        )
    }
}

export default TripBoard;
