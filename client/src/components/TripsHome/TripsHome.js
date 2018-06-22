import React from "react";
import "../../styles/TripsHome.css";
import Navbar from "../Navbar";
import RightSidebar from "../RightSidebar";
import YourTrips from "./YourTrips";

class TripsHome extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col s12 m9">
                        <div className="container">
                            <h5>Create New Trip</h5>
                            <form>
                                <div className="row">
                                    <div className="input-field">
                                        <input placeholder="Trip Name" id="trip_name" type="text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field">
                                        <textarea placeholder="Description" id="trip_description" className="materialize-textarea"></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <a className="waves-effect waves-light btn-small blue darken-4 right">CREATE</a>
                                </div>
                            </form>
                            <div className="divider"></div>
                            <YourTrips />
                            <YourTrips />
                            <YourTrips />
                        </div>
                    </div>
                <RightSidebar />
                </div>
            </div>
        )
    }
}

export default TripsHome;
