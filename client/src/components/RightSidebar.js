import React from "react";
import RecentMessages from "./RecentMessages";
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MessageBox from "./Messages/MessageBox";
import "../styles/RightSidebar.css";

class RightSidebar extends React.Component {
state = {
    select: ""
}

handleChange = event => {
    this.setState({
        select: event.target.value
    })
}

    render() {
        return (
            <div className="col s12 m3 l3 yellow">
                <div id="container">
                    <div className="row">
                        <h6>Add to Trip</h6>
                    </div>
                    <form>
                        <div className="row">
                            <div className="input-field">
                                <input placeholder="Item Name" id="item_name" type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <input placeholder="Link" id="item_link" type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <textarea placeholder="Description" id="item_description" className="materialize-textarea"></textarea>
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
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                        <div className="row">
                            <a className="waves-effect waves-light btn-small blue darken-4">ADD</a>
                        </div>
                    </form>
                    <div className="divider"></div>
                    <div className="row">
                        <h6>Recent Messages</h6>
                    </div>
                <MessageBox />
                </div>
            </div>
        )
    }
}

export default RightSidebar;
