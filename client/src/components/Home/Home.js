import React from "react";
import "../../styles/Home.css";
import Navbar from "../Navbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "../RightSidebar";
import Results from "../Home/Results";
import Footer from "../Footer";
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
            roadside: false,
            checked1: false,
        }

    this.filterUpdate = this.filterUpdate.bind(this);
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    componentDidMount () {
        this.loadElements()
    }

    loadElements = () => {
        axios.get('/users/' + localStorage.getItem("userId"))
        .then(r => {
            let i
            var filtersArray = []
            for (i=0; i<r.data[0].filters.length; i++){
                filtersArray.push({filter: r.data[0].filters[i]})
            }
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
        if (!this.state.haunted && !this.state.historical && !this.state.roadside) {
            //do nothing!
        } else {
            if (newVenue !== this.state.venues) {
                this.setVenues(newVenue)
                this.setState({passMarkers: newVenue})
            } else {
                this.setState({venues: null})
                //console.log("equal arg")
            }
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

    postHistorical = () => {
        let tempobj = {
            'id': 1,
            'city': 'test',
            'description': 'test',
            'location': 'test',
            'state': 'test',
            'state_abbrev': 'test',
            'longitude': -111.2222222,
            'latitude': 35.111111111,
            'link': 'www.google.com',
            'src': 'www.google.com'
        }
        axios.post('/historical', tempobj)
        .then(res => {console.log(res)})
        .catch(err => console.log(err))
    }

    filterUpdate = (e) => {
        let currentFilter = e.target.attributes.id.value
        if (currentFilter === 'haunted') {
            this.setState({haunted: !this.state.haunted})
        } else if (currentFilter === 'historical') {
            this.setState({historical: !this.state.historical})
        } else if (currentFilter === 'roadside') {
            this.setState({roadside: !this.state.roadside})
        }
    }

    // postRoadside = () => {
    //     let tempobj = {
    //         "id": 1,
    //         "title": "test",
    //         "location": "spot"
    //     }
    //     axios.post('/roadside', tempobj)
    //     .then(res => {console.log(res)})
    //     .catch(err => console.log(err))
    // }


    render() {
        return (
            <div id="background" className="deep purple darken-1">
                <Navbar />
                <div className="row">
                <div className="col s12 m2">
                <div id="container">
                    <div className="row">
                        <h5>Filters</h5>
                    </div>
                </div>
                <div id="filterBox">
                {this.state.filters.map(filter => {
                    return (<LeftSidebar 
                        key =  {filter.filter}
                        name = {filter.filter}
                        filterUpdate = {this.filterUpdate}
                        checked1 = {this.state.checked1}
                        checked= {this.state.isChecked}
                        
                    />)
                })}
                </div>
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
                                </div>
                                {/* <a className="waves-effect waves-light btn yellow black-text col s3 m2 offset-s1 offset-m1" onClick={this.postHaunted}>search</a> */}
                            </div>
                            <div className="row">
                                <div className="col s12 m12">
                                <MapWithASearchBox
                                    searchLocation = {this.state.searchInput}
                                    getNewBounds = {this.getBounds}
                                    passBounds = {this.state.newBounds}
                                    onDragEnd = {this.onDragEnd}
                                    getVenues = {this.getVenues}
                                    roadside = {this.state.roadside}
                                    haunted = {this.state.haunted}
                                    historical = {this.state.historical}
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
                                        link = {venue.link}
                                        src = {venue.src}
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
                <Footer />
            </div>
        )
    }
}

export default Home;