import React from "react";
import axios from 'axios';


class YourFriends extends React.Component {
        handleDelete = value => {
            var friend = value.target.name
            var userId = localStorage.getItem("userId")
            console.log(friend, userId)
            axios.get('/users/'+ userId)
            .then(r => {
                console.log(r)
                var friendsArray = r.data[0].friends
                var exFriendIndex = friendsArray.indexOf(friend)
                console.log(exFriendIndex)
                friendsArray.splice(exFriendIndex, 1)
                console.log(friendsArray)
                axios.put('/users/friends/' + userId, {
                    friends: friendsArray
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
            axios.get('/users/'+ friend)
            .then(r => {
                console.log(r)
                var friendsArray = r.data[0].friends
                var exFriendIndex = friendsArray.indexOf(userId)
                console.log(exFriendIndex)
                friendsArray.splice(exFriendIndex, 1)
                console.log(friendsArray)
                axios.put('/users/friends/' + friend, {
                    friends: friendsArray
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
        render () {
            return (
                <div className="row">
                        <p>{this.props.name}</p>
                        <a className="waves-effect waves-light red darken-4 btn-small" name={this.props.name} onClick={this.handleDelete.bind(this)}>DELETE</a>
                </div>
            )
        }
}
export default YourFriends;
