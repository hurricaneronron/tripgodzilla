import React from "react";
import axios from 'axios';

class YourTrips extends React.Component {
    state = {
        userArray: []
    }
    handleViewTrip = e => {
        console.log(e.target.name)
        localStorage.setItem("tripId", e.target.name) 
    }

    handleRemove = e => {
        var removeTrip = e.target.name
        console.log(removeTrip)
        axios.get('/pinboards/indivboard/' + removeTrip)
        .then(r => {
            var userArray = r.data[0].userArray
            console.log(userArray)
            var userid = localStorage.getItem("userId")
            var yourIndex = userArray.indexOf(userid)
            console.log(yourIndex)
            userArray.splice(yourIndex, 1)
                console.log(userArray)
                axios.put('/pinboards/indiv/userupdate/' + removeTrip, {
                    userArray: userArray
                })
                .then(r => {
                    console.log(r)
                    window.location.reload()
                })
                .catch(e => {
                    console.log(e)
                })
        })
        .catch(e => {
            console.log(e)
        })

    }
    render() {
        return (
            <div className="row">
                <div className="card indigo lighten-4 card-border">
                    <div className="card-content">
                        <span className="card-title">{this.props.name}</span>
                        <p>{this.props.description}</p>
                        <p>Users: {this.props.userArray + " "}</p> {/*could potentially map this array again*/}
                    </div>
                    <div className="card-action">
                        <div className="row">
                            <a className="waves-effect waves-light btn-small blue darken-4 left" name= {this.props.id} onClick={this.handleViewTrip} href='/tripboard' >View Trip</a>
                            <a className="waves-effect waves-light btn-small red darken-4 right" name={this.props.id} onClick={this.handleRemove} >Remove Trip</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default YourTrips;
