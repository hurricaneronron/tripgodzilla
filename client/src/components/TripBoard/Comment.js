import React from "react";
import axios from 'axios';
class Comment extends React.Component {
    handleDelete = event => {
        var id = event.target.name
        var admin = event.target.attributes.admin.value
        var poster = event.target.attributes.poster.value
        console.log("You're trying to delete me, Dave.")
        if(localStorage.getItem("userId") === admin || localStorage.getItem("userId") === poster) {
            axios.delete('/tripcomments/delete/' + id, {_id: id})
            .then(r => {
                console.log(r)
                window.location.reload()
            })
            .catch(e => {
                console.log(e)
            })
        } else {
            alert("Sorry, you must be either the user who posted this comment or the trip admin to delete.")
        }
    }
    render () {
        return (
    <div className="card">
        <div className="card-content">
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
