import React from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";

class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div class="container">
                {/* Welcome, username! */}
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="col s10">
                                    Enter a Location:
                                    <div class="input-field inline">
                                        <input id="location_inline" type="email" />
                                    </div>
                                    <button class="btn-small waves-effect waves-light" type="submit" name="action">
                                        <i class="material-icons right">send</i>
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