import React from "react";
import axios from 'axios';
import socketIOClient from 'socket.io-client';

class Comment extends React.Component {
    state = {
        alert: this.props.empty,
        endpoint: "http://localhost:4001", // this is where we are connecting to the sockets
    }

    handleDelete = event => {
        var id = event.target.name
        var admin = event.target.attributes.admin.value
        var poster = event.target.attributes.poster.value
        if(localStorage.getItem("userId") === admin || localStorage.getItem("userId") === poster) {
            axios.delete('/tripcomments/delete/' + id, {_id: id})
            .then(r => {
               // console.log(r)
                const socket = socketIOClient(this.state.endpoint)
                socket.emit('update tripcomment', localStorage.getItem("tripId"))
                this.props.refresh()
            })
            .catch(e => {
                console.log(e)
            })
        } else {
            this.setState({alert: "Sorry, you must be either the user who posted this comment or the trip admin to delete."})
            setTimeout(
                function() {
                    this.setState({alert:""});
                }
                .bind(this),
                2500
            );
        }
    }
    render () {
        return (
            <div className="card">
                <div className="card-content">
                <span className="red-text" id="alert">
                {this.state.alert}
                </span>
                    <a className="waves-effect waves-light red darken-4 btn-small right" poster={this.props.user} admin={this.props.admin} name={this.props.id} onClick={this.handleDelete.bind(this)}>X</a>
                    <span className="card-title">{this.props.user}</span>
                    <p>{this.props.comment}</p>
                    <p>{this.props.timestamp}</p>
                </div>
            </div>
        )
    }
}
export default Comment;
