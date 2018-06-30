import React from "react";
import axios from 'axios'

class YourFilters extends React.Component {
        handleRemove = event => {
                var remove = event.target.name
                axios.get('/users/' + localStorage.getItem("userId"))
                .then(r => {
                    console.log(r)
                    var filtersArray = r.data[0].filters
                    var exFilterIndex = filtersArray.indexOf(remove)
                        console.log(exFilterIndex)
                        filtersArray.splice(exFilterIndex, 1)
                    console.log(filtersArray)
                    axios.put('/users/filters/' + localStorage.getItem("userId"), {
                        filters: filtersArray
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
        render() {
                return (
                <div className="row">
                        <p>{this.props.name}</p>
                        <a className="waves-effect waves-light red darken-4 btn-small" name={this.props.name} onClick={this.handleRemove.bind(this)}>REMOVE</a>
                </div>
                )
        }
}

export default YourFilters;
