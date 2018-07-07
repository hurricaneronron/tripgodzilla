import React from "react";
import axios from 'axios';
import socketIOClient from 'socket.io-client';

class TripItems extends React.Component {
    state = {
        itemArray : [],
        endpoint: "http://localhost:4001", // this is where we are connecting to the sockets
    }
    handleAdminDelete = event => {
        var admin = event.target.name
        var id = event.target.id
        var name = ""
        var link = ""
        var description = ""
        if (event.target.attributes.data) {
            name = event.target.attributes.data.value
        }
        if (event.target.attributes.datalink) {
            link = event.target.attributes.datalink.value
        }
        if (event.target.attributes.datadescription) {
            description = event.target.attributes.datadescription.value
        }
        var reconstructedItem = {name: name, link: link, description: description}
        console.log("attempt here", reconstructedItem)
        if (localStorage.getItem("userId") === admin ){
            axios.get('/pinboards/indivboard/' + id)
            .then(r => {
                console.log(r)
                var itemArray = []
                var exists = -1
                let i
                for (i=0; i < r.data[0].contentArray.length; i++) {
                    itemArray.push(r.data[0].contentArray[i])
                    if (r.data[0].contentArray[i].name === reconstructedItem.name &&
                        r.data[0].contentArray[i].link === reconstructedItem.link &&
                        r.data[0].contentArray[i].description === reconstructedItem.description){
                            exists = i
                        }
                }
                console.log(exists) 
                console.log(itemArray)
                itemArray.splice(exists, 1)
                console.log("here new", itemArray)
                axios.put('/pinboards/indiv/newcontent/' + id, {
                    contentArray: itemArray
                })
                .then(r => {
                    console.log(r)
                    const socket = socketIOClient(this.state.endpoint)
                    socket.emit('update tripitem', localStorage.getItem("tripId"))
                    this.props.refresh()
                })
                .catch(e => {
                    console.log(e)
                })
            })
            .catch(e => {
                console.log(e)
            })
        }
        else {
            alert(`Only the admin (${admin}) can delete trip items.`)
        }
    }
    render () {
        return (
<div className="col s12 m4">
    <div className="card yellow lighten-3">
        <div className="card-content">
            <a className="waves-effect waves-light red darken-4 btn-small right" id={this.props.id} data={this.props.item} datalink={this.props.link} datadescription={this.props.description} name={this.props.admin} onClick={this.handleAdminDelete.bind(this)}>X</a>
            <span className="card-title truncate">{this.props.item}</span>
            <a className="truncate" href={this.props.link} target="_blank">{this.props.link}</a>
            <p>{this.props.description}</p>
        </div>
    </div>
</div>
        )
    }
}

export default TripItems;
