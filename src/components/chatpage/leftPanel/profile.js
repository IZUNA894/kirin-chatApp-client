import React, { Component } from 'react'
import {MainContext} from "../../../context/mainContext";

 class profile extends Component {
    static contextType = MainContext;
    state={
        id:null,
        name:null,
        email:null,
        username:null
    }
    componentWillMount(){
    // before rendering a comp. fetch the data from browser storage and store it
    var user = localStorage.getItem('user');
    user = JSON.parse(user);
    this.setState({id:user._id});
    this.setState({name:user.name});
    this.setState({username:user.username});
    this.setState({email:user.email});
    }

    render() {
        var {sender} = this.context;
        return (
            <div id="profile">
                <div className="wrap">
                    <img id="profile-img" src={'http://localhost:3001/users/' + this.state.id + '/avatar'} className="online" alt="" />
                    <p>{ sender }</p>
                    <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                    <div id="status-options">

                        <ul>
                            <li id="status-online" className="active"><span className="status-circle"></span>
                            <p>Online</p>
                            </li>
                            <li id="status-away"><span className="status-circle"></span>
                            <p>Away</p>
                            </li>
                            <li id="status-busy"><span className="status-circle"></span>
                            <p>Busy</p>
                            </li>
                            <li id="status-offline"><span className="status-circle"></span>
                            <p>Offline</p>
                            </li>
                        </ul>
                    </div>
                    <div id="expanded">
                    <label htmlFor="twitter">Name</label>
                    <input name="twitter" type="text" value={this.state.name} />
                    <label htmlFor="twitter">Email</label>
                    <input name="twitter" type="text" value={this.state.email} />
                    </div>
                </div>
            </div>
        )
    }
}

export default profile