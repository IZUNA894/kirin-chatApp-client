import React, { Component } from 'react'
import {Link } from "react-router-dom";

 class bottomBar extends Component {
    render() {
        return (
            <div id="bottom-bar">
                <button id="addcontact"> <span><Link to = "/peopleList" ><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>Add contact</Link></span></button>
                <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
            </div>
        )
    }
}

export default bottomBar
