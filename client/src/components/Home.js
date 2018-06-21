import React from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="row">
                <LeftSidebar />
                    <div className="col s12 m7">
                        <div className="container">
                            <div className="row">
                                <h5>Enter A Location</h5>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m7">
                                    <input placeholder="Enter Location" id="location" type="text" />
                                </div>
                                <a className="waves-effect waves-light btn yellow black-text col s3 m2 offset-s1 offset-m1">search</a>
                            </div>
                            <div className="row">
                                <div className="col s12 m7">
                                </div>
                            </div>
                            {/* <Results /> */}
                        </div>
                    </div>
                <RightSidebar />
                </div>
            </div>
        )
    }
}

export default Home;