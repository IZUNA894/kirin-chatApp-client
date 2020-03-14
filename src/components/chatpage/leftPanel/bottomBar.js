import React, { Component } from 'react'
import {Link } from "react-router-dom";

 class bottomBar extends Component {
    render() {
        return (
            <div id="bottom-bar">
                <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span><Link to = "/peopleList" >Add contact</Link></span></button>
                <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
            </div>
        )
    }
}

export default bottomBar
