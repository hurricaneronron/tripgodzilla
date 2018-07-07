import React from "react";
import Navbar from "../Navbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "../RightSidebar";
import Results from "../Home/Results";
import Footer from "../Footer";
import axios from 'axios';

class Home extends React.Component {
    state = {
        filters: [],
        friends: []
    }
    componentDidMount () {
        this.loadElements()
        console.log("working")
    }

    loadElements = () => {
        axios.get('/users/' + localStorage.getItem("userId"))
        .then(r => {
            console.log(r)
            let i
            var filtersArray = []
            for (i=0; i<r.data[0].filters.length; i++){
                filtersArray.push({filter: r.data[0].filters[i]})
            }
            console.log(filtersArray)
            this.setState({filters: filtersArray})
        })
        .catch(e => {
            console.log(e)
        })
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="row">
                <div className="col s12 m2">
                <div id="container">
                    <div className="row">
                        <h5>Filters</h5>
                    </div>
                </div>
                    <div id="filterBox" className="card deep-purple darken-1">
                        <div className="card-content">
                            {this.state.filters.map(filter => {
                                return (<LeftSidebar 
                                    key =  {filter.filter}
                                    name = {filter.filter}
                                />)
                            })}
                        </div>
                    </div>
                </div>
                    <div className="col s12 m7">
                        <div className="content-container">
                            <div className="row">
                                <h4>Search A Location</h4>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m7">
                                    <input placeholder="Enter Location" id="location" type="text" />
                                </div>
                                <a className="waves-effect waves-light btn yellow black-text col s3 m2 offset-s1 offset-m1">search</a>
                            </div>
                            <div className="row">
                                <div className="col s12 m7">
                                Map goes here.
                                </div>
                            </div>
                            <div className="row"></div>
                            <div className="row">
                                <h5>Search Results</h5>
                                <Results />
                                <Results />
                                <Results />
                            </div>
                        </div>
                    </div>
                <RightSidebar />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;