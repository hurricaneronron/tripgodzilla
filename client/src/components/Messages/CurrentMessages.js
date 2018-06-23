import React from "react";

class CurrentMessages extends React.Component {
    handleSelect = value => {
        var selected = value.target.name
        localStorage.setItem("selectedBoxId", selected)
        window.location.reload()
    }

    render() {
        return(
            <div className="row">
                <p>Chat Between {this.props.messager} and {this.props.messagee}</p>
                <p>Chat ID: {this.props.box}</p>
                <a className="waves-effect waves-light red darken-4 btn-small">DELETE</a>
                <a className="waves-effect waves-light blue darken-4 btn-small" name={this.props.box} onClick={this.handleSelect.bind(this)}>SELECT</a>
            </div>
        )
    }
}

export default CurrentMessages;

