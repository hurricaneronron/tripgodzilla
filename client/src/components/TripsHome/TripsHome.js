import React from "react";
import "../../styles/TripsHome.css";
import Navbar from "../Navbar";
import RightSidebar from "../RightSidebar";
import YourTrips from "./YourTrips";
import axios from 'axios'

class TripsHome extends React.Component {
    state = {
        name: "",
        description: "",
        users: "",
        usersArray: [],
        pinboards: []
    }
    componentDidMount (){
        this.loadPinboards()
    }
    loadPinboards = () => {
        axios.get('/pinboards/' + localStorage.getItem("userId"))
            .then(r => {
                console.log("existing", r)
                let i
                var boardArray = []
                for (i=0; i<r.data.length; i++){
                    boardArray.push({board: r.data[i]._id, name:r.data[i].name, description: r.data[i].description, userArray: r.data[i].userArray, contentArray: r.data[i].contentArray })
                }
                this.setState({pinboards: boardArray})
                console.log("pinboards", this.state.pinboards[0].contentArray)
            })
            .catch(e => {
                console.log(e)
            })
    }
    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleCreate = () => {
        var name = this.state.name
        var description = this.state.description
        var fixArray = [localStorage.getItem("userId")]
        this.setState({usersArray: fixArray})
       //the setState above isn't working, will fix console.log(this.state.usersArray)
       if(name.length > 0) {
        axios.post('/pinboards', {
            name: name,
            admin: localStorage.getItem("userId"),
            description: description,
            userArray: fixArray,
            contentArray: []
        })
        .then(r => {
            console.log(r)
            this.refs.name.value=""
            this.refs.description.value=""
            this.loadPinboards()
        })
      .catch(e => {
        console.log(e)
      })
    } else {
        alert("Oops! You must name your trip!")
    }
    };

    render() {
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col s12 m9 l9">
                      <div className="container">
                            <h5>Create New Trip</h5>
                            <form>
                                <div className="row">
                                    <div className="input-field">
                                        <input placeholder="Trip Name" id="trip_name" name="name" ref="name" onChange={this.handleInputChange} type="text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field">
                                        <textarea placeholder="Description" id="trip_description" ref="description" name="description" onChange={this.handleInputChange} className="materialize-textarea"></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <a className="waves-effect waves-light btn-small blue darken-4 right" onClick={this.handleCreate}>CREATE</a>
                                </div>
                            </form>
                            <div className="divider"></div>
                            {this.state.pinboards.map(board => {
                                return (<YourTrips 
                                    key =  {board.board}
                                    id = {board.board}
                                    name = {board.name}
                                    description = {board.description}
                                    userArray = {board.userArray}
                                    />)
                                })}
                         </div>
                    </div>
                <RightSidebar />
                </div>
             </div>
        )
    }
}

export default TripsHome;
