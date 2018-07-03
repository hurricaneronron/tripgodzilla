import React from "react";
import "../../styles/Home.css";
import Navbar from "../Navbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "../RightSidebar";
import Results from "../Home/Results";
import AddToTrip from "./AddToTrip";
import MapWithASearchBox from "./Map"
import axios from "axios"
import LocationSearchInput from "../Search/Search"
let newBounds

class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            center : { lat: 33.640, lng: -117.846 },
            searchInput: { lat: 33.640, lng: -117.846 },
            venues: [],
            newBounds,
            passMarkers: []
        }
    }
    
    

    getInput = (input) => {
        this.setState({searchInput: input})
    }

    getBounds = (bounds) => {
        this.setState({newBounds: bounds})
    }

    getVenues = (newVenue) => {
        if (newVenue !== this.state.venues) {
            this.setVenues(newVenue)
            this.setState({passMarkers: newVenue})
        } else {
            //console.log("equal arg")
        }
    }

    setVenues = (updated) => {
        this.setState({venues: updated})
    }

    getNational = () => {
        // searchInput = document.getElementById("location").value
        // console.log(searchInput)
        axios.get('/national', function(req, res) {
            console.log(req.body)
        })
            .then(r => {
                console.log(r)
            })
            .catch(e => {
                console.log(e)
            })
    };

    postNational = () => {
        let tempobj = {
            "id": 1,
            "title": "test",
            "location": "spot"
        }
        axios.post('/national', tempobj)
        .then(res => {console.log(res.json(res))})
        .catch(err => console.log(err))
    }

    postHaunted = () => {
        let tempobj = {
          "id": 1,
          "title": "test",
          "location": "spot"
        }
        axios.post('/haunted', tempobj)
            .then(r => {
                console.log(r)
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
                <LeftSidebar />
                    <div className="col s12 m7">
                        <div className="container">
                            <div className="row">
                                <h5>Search A Location</h5>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m7">
                                    <LocationSearchInput 
                                        getUserInput = {this.getInput}
                                        onPlacesChanged = {this.onPlacesChanged}
                                    >
                                    </LocationSearchInput>
                                    {/* <input placeholder="Enter Location" id="location" type="text" /> */}
                                </div>
                                <a className="waves-effect waves-light btn yellow black-text col s3 m2 offset-s1 offset-m1" onClick={this.getHaunted}>search</a>
                            </div>
                            <div className="row">
                                <div className="col s12 m12">
                                <MapWithASearchBox
                                    searchLocation = {this.state.searchInput}
                                    getNewBounds = {this.getBounds}
                                    passBounds = {this.state.newBounds}
                                    onDragEnd = {this.onDragEnd}
                                    getVenues = {this.getVenues}
                                    getLabels = {this.getLabels.bind(this)}
                                >
                                </MapWithASearchBox>
                                </div>
                            </div>
                            <div className="row">
                                <h5>Search Results</h5>
                                {this.state.venues.map(venue => {
                                    return (
                                    <Results
                                        key={venue.id}
                                        id={venue.id}
                                        title={venue.address}
                                        description={venue.description}
                                        city={venue.city}
                                        state={venue.state}
                                    />
                                    );
                                })}
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