import React, { Component } from 'react';
import  "../../../css/chatpage.css";

 class SearchBox extends Component {
    render() {
        return (
            <div id="search" className="search">
                <input type="text" className="input" placeholder="Search contacts..." />
                <a href="#" className="search-icon"><i className="fa fa-search" aria-hidden="true"></i></a>

            </div>
        )
    }
}

export default SearchBox