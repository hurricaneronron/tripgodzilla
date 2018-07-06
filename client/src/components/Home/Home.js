import React from "react";
import "../../styles/Home.css";
import Navbar from "../Navbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "../RightSidebar";
import Results from "../Home/Results";
import MapWithASearchBox from "./Map"
import axios from "axios"
import LocationSearchInput from "../Search/Search"
let newBounds

class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            filters: [],
            friends: [],
            center : { lat: 33.640, lng: -117.846 },
            searchInput: { lat: 33.640, lng: -117.846 },
            venues: [],
            newBounds,
            passMarkers: [],
            historical: false,
            haunted: false, 
            roadside: true
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    
    componentDidMount () {
        // this.loadElements()
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

    postNational = () => {
        let tempobj = {
            "id": 1,
            "title": "test",
            "location": "spot"
        }
        axios.post('/national', tempobj)
        .then(res => {console.log(res)})
        .catch(err => console.log(err))
    }

    postRoadside = () => {
        let tempobj = {
            "id": 1,
            "title": "test",
            "location": "spot"
        }
        axios.post('/roadside', tempobj)
        .then(res => {console.log(res)})
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="row">
                <div className="col s12 m2">
                <div id="container">
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
                        <div id="container">
                            <div className="row">
                                <div className="input-field col s12 m7">
                                    <LocationSearchInput 
                                        getUserInput = {this.getInput}
                                        onPlacesChanged = {this.onPlacesChanged}
                                    >
                                    </LocationSearchInput>
                                    {/* <input placeholder="Enter Location" id="location" type="text" /> */}
                                </div>
                                <a className="waves-effect waves-light btn yellow black-text col s3 m2 offset-s1 offset-m1" onClick={this.postRoadside}>search</a>
                            </div>
                            <div className="row">
                                <div className="col s12 m12">
                                <MapWithASearchBox
                                    searchLocation = {this.state.searchInput}
                                    getNewBounds = {this.getBounds}
                                    passBounds = {this.state.newBounds}
                                    onDragEnd = {this.onDragEnd}
                                    getVenues = {this.getVenues}
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
                                        architect = {venue.architect}
                                        person = {venue.person}
                                        park = {venue.park}
                                        address = {venue.address}
                                        roadside = {this.state.roadside}
                                        haunted = {this.state.haunted}
                                        historical = {this.state.historical}
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