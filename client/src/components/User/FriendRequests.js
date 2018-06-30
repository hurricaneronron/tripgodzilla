import React from "react";
import axios from 'axios'
class FriendRequests extends React.Component {
        state = {
                userFriends: [],
                friendFriends: []
        }
        handleAccept = (e, value) => {
                var id = e.target.name
                var requestee = localStorage.getItem("userId")
                var requester = e.target.id
               // console.log("requester", requester)
                axios.put(`/friendrequests/${id}`, {
                    })
                    .then(r => {
                        console.log(r)
                    })
                    .catch(e => {
                        console.log(e)
                    })
                axios.get('/users/' + requestee)
                    .then(r => {
                            var userArray = r.data[0].friends
                            userArray.push(requester)
                            console.log(userArray)
                            this.setState({userFriends: userArray})
                        axios.put('/users/friends/' + requestee, {
                                friends: this.state.userFriends
                        })
                        .then(r => {
                                console.log(r)
                        })
                        .catch(e => {
                                console.log(e)
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
                axios.get('/users/' + requester)
                    .then(r => {
                        var friendsArray = r.data[0].friends
                        friendsArray.push(requestee)
                        console.log("check", friendsArray)
                        this.setState({friendFriends: friendsArray})
                        axios.put('/users/friends/' + requester, {
                                friends: this.state.friendFriends
                        })
                        .then(r => {
                            console.log(r)
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
                window.location.reload()
        }
        handleDecline = (e, value) => {
            var id = e.target.name
            console.log("idtodelete", id)
            axios.delete('/friendrequests/delete/' + id, {_id: id})
            .then(r => {
                console.log(r)
                window.location.reload()
            })
            .catch(e => {
                console.log(e)
            })
        }

        render () {
        return (
        <div className="row">
                <p>Friend Request from: {this.props.requester}</p>
                <a className="waves-effect waves-light blue darken-4 btn-small" name= {this.props.id} id= {this.props.requester} onClick={this.handleAccept.bind(this)}>ACCEPT</a>
                <a className="waves-effect waves-light red darken-4 btn-small" name={this.props.id} onClick={this.handleDecline}>DECLINE</a>
        </div>
        )
        }
}
export default FriendRequests;
