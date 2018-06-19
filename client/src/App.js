import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import API from "./utils/API";
import Map from "./components/Map"
import Places from "./components/Places"
import PlacesWithStandaloneSearchBox from "./components/Search"

class App extends Component {
  state = {
    center : { lat: 33.640, lng: -117.846 },
    venues: []
  };

  componentDidMount() {
    console.log('componentDidMount')

    // let map = new window.google.maps.Map(document.getElementById('map'), {
    //   center: {lat: -33.8688, lng: 151.2195},
    //   zoom: 13,
    //   mapTypeId: 'roadmap',
    // });

    // let marker = new window.google.maps.Marker({
    //   map: map,
    //   position: {lat: -33.8688, lng: 151.2195},
    // });
    
    // // initialize the autocomplete functionality using the #pac-input input box
    // let inputNode = document.getElementById('pac-input');
    // map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    // let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
    
    // autoComplete.addListener('place_changed', () => {
    //   let place = autoComplete.getPlace();
    //   let location = place.geometry.location;
      
    //   this.setState({
    //       place_formatted: place.formatted_address,
    //       place_id: place.place_id,
    //       place_location: location.toString(),
    //   });
      
    //   // bring the selected place in view on the map
    //   map.fitBounds(place.geometry.viewport);
    //   map.setCenter(location);
      
    //   marker.setPlace({
    //       placeId: place.place_id,
    //       location: location,
    //   });
    // });

    //api get code
    // const venues = response.body.response.venues
    const venues = [{location : { lat: 33.640, lng: -117.846 }}, {location : { lat: 33.651, lng: -117.840 }}]
    this.setState({venues: venues})
  }
 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getNational = () => {
    let tempArray = []
    API.getNational()
      .then(res => {
        for (var i = 0; i < 10; i++) {
          // console.log(res.data[i])
          let tempLoc = {
            lat: res.data[i].Latitude,
            lng: res.data[i].Longitude
          }
          let tempobj = {
            "id": i,
            "title": res.data[i].ResourceName,
            "location": tempLoc,
            "mongoid": res.data[i]._id
          }
          tempArray.push(tempobj)
        }
        console.log(tempArray)
        this.setState({venues: tempArray})
      }
    )
    .catch(err => console.log(err))
  };


  updateLocation = (event) => {
    event.preventDefault()
    console.log("clicked")
    this.setState({
      center: { lat: 40.757, lng: -73.988 }
  })
    console.log(this.state.center)
  }


  render() {

    const location = {
      lat: 33.640, lng: -117.846
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Map
          zoom = {14}
          center={this.state.center}
          containerElement = {<div style = {{height: `400px`}} />}
          mapElement = {<div style = {{height: `400px`}} />}
          isMarkerShown
          // position = {{ lat: 33.651, lng: -117.840 }}
          updateLocation = {this.updateLocation}
          markers = {this.state.venues}
        >
        </Map>
        <PlacesWithStandaloneSearchBox />
        <input id = "place-input"></input>
        <button className="btn btn-dark"  onClick={this.getNational}>Search</button>
        {/* <button className="btn btn-dark"  onClick={this.postNational}>Save</button> */}
        {/* <button className="btn btn-dark"  onClick={this.updateLocation}>Search</button> */}
        <Places venues = {this.state.venues} />
      </div>
    );
  }
}

export default App;
