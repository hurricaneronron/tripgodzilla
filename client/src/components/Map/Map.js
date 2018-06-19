import React, {Component} from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'


class Map extends Component {

    constructor() {
        super()
        this.state = {
            map: null,
            place_formatted: '',
            place_id: '',
            place_location: '',
        }
    }

    

    mapMoved() {
        console.log('mapMoved: '+ JSON.stringify(this.state.map.getCenter()))
    }

    zoomChanged() {
        console.log('zoomChanged: '+ this.state.map.getZoom())
    }

    mapLoaded(map) {
        
        if (this.state.map != null)
            return

        this.setState({
            map: map
        })
    }

    

    

    render() {

        const props = this.props || []

        const markers = this.props.markers.map((venue, i) => {
            const marker = {
                lat: venue.location.lat,
                lng: venue.location.lng
                // position: {
                //     lat: venue.location.lat,
                //     lng: venue.location.lng
                // }
            }
            return <Marker key={i} {...marker} />
        })
        
        return (
            <GoogleMap
                ref={this.mapLoaded.bind(this)}
                onDragEnd={this.mapMoved.bind(this)}
                onZoomChanged={this.zoomChanged.bind(this)}
                defaultZoom={this.props.zoom}
                defaultCenter={this.props.center}
                >
                {markers}
                {/* {markers.map((marker, index) => (
                    <Marker {...marker} />
                ))} */}
                {/* {props.isMarkerShown && <Marker position={this.props.position} />} */}
            </GoogleMap>
                    )

    }
}

export default withGoogleMap(Map)


