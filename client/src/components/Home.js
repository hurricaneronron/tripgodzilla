import React from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";

class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div class="container">
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="col s8">
                                    Enter a Location:
                                    <div class="input-field inline">
                                        <input id="location_inline" type="email" />
                                    </div>
                                </div>
                                <div class="col s4">
                                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit
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