/* eslint-disable no-undef */

import React from 'react'
import axios from 'axios'
import Geocode from "react-geocode";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const labels =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
let labelIndex = 0

const MapWithASearchBox = compose(   
  
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%`, width: '100%' }} />,
    containerElement: <div style={{ height: `400px`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%`, width: '100%' }} />,
    
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624,
        },
        markers: [],
        historical: false,
        haunted: false, 
        roadside: true,
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: (props, ref) => {
            this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
            })

            this.props.getNewBounds(this.state.bounds)
            let { onBoundsChange } = this.props
            if (onBoundsChange) {
            onBoundsChange(refs.map)
        }
        },
        onDragEnd: props => {
            this.setState({
                bounds: refs.map.getBounds(),
                center: refs.map.getCenter()
                })
        }
      })
    },
    componentWillReceiveProps(nextProps) {
        let bounds = nextProps.passBounds
        console.log(bounds)
        console.log(this.state.haunted)
        const resultsArray = []
        const markerArray = []
        
        if (nextProps.passBounds !== this.props.passBounds) {

            if (this.state.historical) {
                axios.get('/national', {params: 
                    {
                    bounds: bounds
                    }
                    })
                    .then(r => {
                        if (!r.data) {
                            console.log("Sorry no results, try another area")
                        } else {
                            console.log(r.data)
                            for (let i = 0; i < r.data.length; i++) {
                                let newObj = {
                                    id: i + 1,
                                    _id: r.data[i]._id, 
                                    description: r.data[i].Title,
                                    location: {
                                        lat: parseFloat(r.data[i].Lat.$numberDecimal),
                                        lng: parseFloat(r.data[i].Lng.$numberDecimal)
                                    }
                                }
                                resultsArray.push(newObj)
                                markerArray.push(newObj.location)
                            }
                            this.setState({
                                venues: resultsArray,
                                passMarkers: markerArray
                            })
                        }
                        const places = this.state.venues
                        console.log(places)
                        nextProps.getVenues(places)
                        
                        const nextMarkers = places.map(place => ({
                            position: place.location,
                          }));
                        
                        this.setState({
                            markers: nextMarkers,
                            venues: places
                        });
                    })
                    .catch(e => {
                        console.log(e)
                    })    
            } else if (this.state.haunted) {
                
            axios.get('/haunted', {params: 
                {
                bounds: bounds
                }
                })
                .then(r => {
                    if (!r.data) {
                        console.log("Sorry no results, try another area")
                    } else {
                        console.log(r.data)
                        for (let i = 0; i < r.data.length; i++) {
                            let newObj = {
                                id: i + 1,
                                _id: r.data[i]._id, 
                                description: r.data[i].description,
                                location: {
                                    lat: parseFloat(r.data[i].latitude.$numberDecimal),
                                    lng: parseFloat(r.data[i].longitude.$numberDecimal)
                                },
                                address: r.data[i].location,
                                city: r.data[i].city,
                                state: r.data[i].state_abbrev,
                            }
                            resultsArray.push(newObj)
                            markerArray.push(newObj.location)
                        }
                        this.setState({
                            venues: resultsArray,
                            passMarkers: markerArray
                        })
                    }
                    const places = this.state.venues
                    console.log(places)
                    nextProps.getVenues(places)
                    
                    const nextMarkers = places.map(place => ({
                        position: place.location,
                      }));
                    
                    this.setState({
                        markers: nextMarkers,
                        venues: places
                    });
                })
                .catch(e => {
                    console.log(e)
                })

            } else if (this.state.roadside) {
                axios.get('/roadside', {params: 
                    {
                    bounds: bounds
                    }
                    })
                    .then(r => {
                        
                        if (!r.data) {
                            console.log("Sorry no results, try another area")
                        } else {
                            // console.log(r.data)
                            for (let i = 0; i < r.data.length; i++) {
                                let newObj = {
                                    id: i + 1,
                                    _id: r.data[i]._id, 
                                    description: r.data[i].Name,
                                    address: `${r.data[i].Address} ${r.data[i].City}, ${r.data[i].State}` ,
                                    city: r.data[i].City,
                                    state: r.data[i].State,
                                    architect: r.data[i].Architect,
                                    park: r.data[i].National_Park,
                                    person: r.data[i].Significant_Person,
                                    location: {
                                        lat: parseFloat(r.data[i].latitude),
                                        lng: parseFloat(r.data[i].longitude)
                                    }
                                }
                                // Geocode.fromAddress(newObj.address).then(
                                    //     response => {
                                        //       const location = response.results[0].geometry.location;
                                        //     //   console.log(lat, lng);
                                        //     //   newObj.location = {
                                            //     //       lat: lat,
                                            //     //       lng: lng
                                            //     //   }
                                            //     //   console.log(newObj.location)
                                            //     console.log(newObj.location)
                                            //     axios.put(`/roadside/${newObj._id}`, location)
                                            //     .then(r => {
                                                //         console.log(r)
                                                //     })
                                                //     .catch(e => {
                                                    //         console.log(e)
                                                    //     })
                                                    // },
                                                    // error => {
                                                        //     console.error(error);
                                                        // }
                                                        // );
                                                        
                                                        resultsArray.push(newObj)
                                                        markerArray.push(newObj.location)
                                                    }
                                                    // console.log(resultsArray)
                                                    this.setState({
                                                        venues: resultsArray,
                                                        passMarkers: markerArray
                                                    })
                                                }
                                                const places = this.state.venues
                        // console.log(places)
                        nextProps.getVenues(places)
                        
                        const nextMarkers = places.map(place => ({
                            position: place.location,
                          }));
                        
                        this.setState({
                            markers: nextMarkers,
                            venues: places
                        });
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }  
        } else {
            //console.log("equal")
        }
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => 
 
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={12}
    venues={props.venues}
    passBounds={props.passBounds}
    center={props.searchLocation}
    onBoundsChanged={props.onBoundsChanged}
    onCenterChanged={props.onCenterChanged}
    onPlacesChanged={props.onPlacesChanged}
    onDragEnd={props.onDragEnd}
  >
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} label={labels[labelIndex++ % labels.length]} />
    )}
  </GoogleMap>
);

export default MapWithASearchBox



