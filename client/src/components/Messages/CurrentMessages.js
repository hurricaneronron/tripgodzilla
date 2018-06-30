import React from "react";
import axios from 'axios';

class CurrentMessages extends React.Component {
    state = {
        messager: ""
    }

    handleSelect = value => {
        var selected = value.target.name
        localStorage.setItem("selectedBoxId", selected)
        window.location.reload()
    }

    handleRemove = value => {
        var removed = value.target.name
        console.log(removed)
        var user = localStorage.getItem("userId")
        axios.get('/chatboxes/indivbox/' +removed)
        .then(r => {
            var chater1 = r.data[0].messager
            var chater2 = r.data[0].messagee
            if(user === chater1){
                this.setState({messager: chater2})
                console.log('chater1 will be removed, preserving ' + this.state.messager)
                axios.put('/chatboxes/removebox/' + removed, {
                    messager: this.state.messager
                })
                .then(r => {
                    console.log(r)
                })
                .catch(e => {
                    console.log(e)
                })
            }
            if(user === chater2){
                this.setState({messager: chater1})
                console.log('chater2 will be removed, preserving ' + this.state.messager)
                axios.put('/chatboxes/removebox/' + removed, {
                    messager: this.state.messager
                })
                .then(r => {
                    console.log(r)
                })
                .catch(e => {
                    console.log(e)
                })
            }
        })
        .catch(e => {
            console.log(e)
        })
    }

    render() {
        return(
            <div className="row">
                <p>Chat Between {this.props.messager} and {this.props.messagee}</p>
                <a className="waves-effect waves-light red darken-4 btn-small" name={this.props.box} onClick={this.handleRemove.bind(this)}>REMOVE</a>
                <a className="waves-effect waves-light blue darken-4 btn-small" name={this.props.box} onClick={this.handleSelect.bind(this)}>SELECT</a>
            </div>
        )
    }
}

export default CurrentMessages;

