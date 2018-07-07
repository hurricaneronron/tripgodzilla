import React from "react";
import axios from 'axios'
import MessageBox from "./Messages/MessageBox";
import socketIOClient from 'socket.io-client';
import AddToTrip from "./Home/AddToTrip"

class RightSidebar extends React.Component {
state = {
    select: "",
    pinboards: [],
    itemArray: [],
    endpoint: "http://localhost:4001", // this is where we are connecting to the sockets
}

componentDidMount () {
   this.loadElements()    
}

loadElements = () => {
    console.log("working")
    axios.get('/pinboards/' + localStorage.getItem("userId"))
            .then(r => {
                console.log("existing", r)
                let i
                var boardArray = []
                for (i=0; i<r.data.length; i++){
                    boardArray.push({board: r.data[i]._id, name:r.data[i].name, description: r.data[i].description})
                }
                console.log("boardArray", boardArray)
                this.setState({pinboards: boardArray})
            })
            .catch(e => {
                console.log(e)
            })
}

handleChange = event => {
    this.setState({
        select: event.target.value,
    })
    const { name, value } = event.target;
    this.setState({
      [name]: value
    }); 
}

handleAdd = () => {
    console.log(this.state.select)
    console.log(this.state.name)
    console.log(this.state.link)
    console.log(this.state.description)
    axios.get('/pinboards/indivboard/' +this.state.select)
    .then(r => {
        var itemArray = []
        //for (i=0; i<r.data.length; i++){
           // itemArray.push(r.data[0].contentArray)
            if (r.data[0].contentArray.length > 0) {
                this.setState({itemArray: r.data[0].contentArray})
            }
        itemArray = {name: this.state.name, link: this.state.link, description: this.state.description}
        var middleArray = this.state.itemArray
        middleArray.push(itemArray)
        console.log("middle", middleArray)
        this.setState({itemArray: middleArray})
        axios.put('/pinboards/indiv/newcontent/' + this.state.select, {
            contentArray: this.state.itemArray
        })
        .then(r => {
            console.log(r)
            this.refs.name.value=""
            this.refs.link.value=""
            this.refs.description.value=""
            const socket = socketIOClient(this.state.endpoint)
            socket.emit('update tripitem', localStorage.getItem("tripId"))
        })
    })
    .catch(e => {
        console.log(e)
    })
}

    render() {
    const notMessagesRoute = (!window.location.pathname.includes('Messages'))
    const socket = socketIOClient(this.state.endpoint)
    socket.on('update message', (page) => {
        if (page === localStorage.getItem("selectedBoxId") && notMessagesRoute) {
        console.log("firing in messages.js")
        this._MessageBox.loadMessages()
        }
    })
        return (
            <div className="col s12 m3 l3">
                <div className="content-container">
                    {notMessagesRoute && (
                    <div className="row">
                        <h5>Chat</h5>
                        <MessageBox ref={(MessageBox) => { this._MessageBox = MessageBox; }}/>
                    </div>
                    )}
                    <AddToTrip />
                </div>
            </div>
        )
    }
}

export default RightSidebar;
