import React from "react";
class YourTrips extends React.Component {
    
    handleViewTrip = e => {
        console.log(e.target.name)
        localStorage.setItem("tripId", e.target.name)
    }

    render() {
        return (
    <div className="row">
        <div className="card">
            <div className="card-content">
                <span className="card-title">{this.props.name}</span>
                <p>{this.props.description}</p>
                <p>Users: {this.props.userArray}</p>
            </div>
            <div className="card-action">
                <div className="row">
                    <a className="waves-effect waves-light btn-small yellow black-text left" name= {this.props.id} onClick={this.handleViewTrip} href='/tripboard' >View Trip</a>
                    <a className="waves-effect waves-light btn-small red darken-4 right" >Delete Trip</a>
                </div>
            </div>
        </div>
    </div>
        )
    }
}
export default YourTrips;
