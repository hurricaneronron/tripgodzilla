import React from "react";
import axios from 'axios';

class TripItems extends React.Component {
    state = {
        itemArray : []
    }
    handleAdminDelete = event => {
        var admin = event.target.name
        var id = event.target.id
        var _target = event.target
        var reconstructedItem = {name: _target.attributes.data.value, link: _target.attributes.datalink.value, description: _target.attributes.datadescription.value}
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
            <span className="card-title">{this.props.item}</span>
            <a href={this.props.link} target="_blank">{this.props.link}</a>
            <p>{this.props.description}</p>
        </div>
    </div>
</div>
        )
    }
}

export default TripItems;
