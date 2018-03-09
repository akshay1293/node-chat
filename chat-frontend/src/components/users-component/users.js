import React, { Component } from 'react';
import UserSearch from '../user-search-component/userSearch';
import "../../stylesheet/styles.css";


export default class Users extends Component {

    render() {

        return (

            <div className="left">
                <UserSearch />
            </div>
        );
    }
}