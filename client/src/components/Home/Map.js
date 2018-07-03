/* eslint-disable no-undef */

import React from 'react'
import axios from 'axios'
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
        const resultsArray = []
        const markerArray = []
        
        if (nextProps.passBounds !== this.props.passBounds) {
            axios.get('/users', {params: 
                {
                bounds: bounds
                }
                })
                .then(r => {
                    if (!r.data) {
                        console.log("Sorry no results, try another area")
                    } else {
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



