import React from "react";
import "../../styles/Home.css";
import Navbar from "../Navbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "../RightSidebar";
import Results from "../Home/Results";
import axios from 'axios'

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
                <div className="container">
                    <div className="row">
                        <h6>Filters</h6>
                    </div>
                </div>
                {this.state.filters.map(filter => {
                    return (<LeftSidebar 
                        key =  {filter.filter}
                        name = {filter.filter}
                    />)
                })}
                </div>
                    <div className="col s12 m7">
                        <div className="container">
                            <div className="row">
                                <h5>Search A Location</h5>
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
                            <div className="row">
                                <h5>Search Results</h5>
                                <Results />
                                <Results />
                            </div>
                        </div>
                    </div>
                <RightSidebar />
                </div>
            </div>
        )
    }
}

export default Home;