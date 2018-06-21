import React from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";

class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                {/* Welcome, username! */}
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="col s10">
                                    Enter a Location:
                                    <div className="input-field inline">
                                        <input id="location_inline" type="email" />
                                    </div>
                                    <button className="btn-small waves-effect waves-light" type="submit" name="action">
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;