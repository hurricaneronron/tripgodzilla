import React from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";

class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div>Home.</div>
            </div>
        )
    }
}

export default Home;