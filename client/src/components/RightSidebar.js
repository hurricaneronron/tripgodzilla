import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios'
import MessageBox from "./Messages/MessageBox";
import "../styles/RightSidebar.css";
import socketIOClient from 'socket.io-client';

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
    const socket = socketIOClient(this.state.endpoint)
    socket.on('update message', (page) => {
        if (page === localStorage.getItem("selectedBoxId")) {
        console.log("firing in messages.js")
        this._MessageBox.loadMessages()
        }
    })
        return (
            <div className="col s12 m3 l3">
                <div id="container">
                <div className="row">
                        <h6>Chat</h6>
                    </div>
                    <MessageBox ref={(MessageBox) => { this._MessageBox = MessageBox; }}/>
                    <div className="divider"></div>
                    <div className="row">
                        <h6>Add to Trip</h6>
                    </div>
                    <form>
                        <div className="row">
                            <div className="input-field">
                                <input id="item_name" ref="name" name= "name" type="text" onChange={this.handleChange} />
                                <label className="active" htmlFor="item_name">Item Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <input id="item_link" type="text" ref="link" name="link" value="https://" onChange={this.handleChange} />
                                <label className="active" htmlFor="item_link">Link</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <textarea id="item_description" ref="description" name="description" onChange={this.handleChange} className="materialize-textarea"></textarea>
                                <label className="active" htmlFor="item_description">Description</label>
                            </div>
                        </div>
                        <div className="row">
                        <InputLabel htmlFor="age-simple">Select Trip: </InputLabel>
                            <Select
                                value={this.state.select}
                                onChange={this.handleChange}
                                inputProps={{
                                name: 'select',
                                }}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {this.state.pinboards.map(board => {
                                return (<MenuItem 
                                    key = {board.board}
                                    value =  {board.board}
                                    name = {board.name}
                                    description = {board.description}
                                    >{board.name}</MenuItem>)
                                })}
                            </Select>
                        </div>
                        <div className="row">
                            <a className="waves-effect waves-light btn-small blue darken-4" onClick={this.handleAdd}>ADD</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default RightSidebar;
