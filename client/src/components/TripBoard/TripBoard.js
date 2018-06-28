import React from "react";
import "../../styles/TripBoard.css";
import Navbar from "../Navbar";
import RightSidebar from "../RightSidebar";
import TripItems from "./TripItems";
import TripComments from "./TripComments";
import TripNotes from "./TripNotes";
import axios from 'axios'

class TripBoard extends React.Component {
    state = {
        name: "",
        description: "",
        tripItems: []
    }
    componentDidMount (){
        this.loadContent()
    }
    loadContent = () => {
        axios.get('/pinboards/indivboard/' + localStorage.getItem("tripId"))
        .then(r => {
            console.log(r)
            this.setState({name: r.data[0].name})
            this.setState({description: r.data[0].description})
            let i
            var boardArray = []
            if(r.data[0].contentArray.length > 0) {
                for (i=0; i<r.data[0].userArray.length; i++){
                    boardArray.push({item: r.data[0].contentArray[i] })
                }
            }
            console.log(boardArray)
            this.setState({tripItems: boardArray})
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
                    <div className="col s0 m1"></div>
                    <div className="col s12 m8">
                        <div className="row">
                            <h5>{this.state.name}</h5>
                            <h6>"{this.state.description}"</h6>
                        </div>
                        <div className="row">
                            <div id="pinboard">
                                {this.state.tripItems.map(item => {
                                    return (<TripItems 
                                        key =  {item.item}
                                        item = {item.item.name}
                                        link = {item.item.link}
                                        description = {item.item.description}
                                        />)
                                })}
                            </div>
                        </div>
                        <TripComments />
                        <div className="divider"></div>
                        <TripNotes />
                    </div>
                <RightSidebar />
                </div>
            </div>
        )
    }
}

export default TripBoard;
