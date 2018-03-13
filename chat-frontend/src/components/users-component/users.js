import React, { Component } from 'react';
import UserSearch from '../user-search-component/userSearch';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";
import UserList from '../userlist-component/userList';


export default class Users extends Component {

    constructor(props) {

        super();

        this.cookie = new Cookies();
        this.state = {

            userArray: [],
        }
    }

    componentWillMount() {

        let token = this.cookie.get('chat_token');

        fetch("http://localhost:3004/list", {

            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            }
        })
            .then((response) => { return response.json() })
            .then((responseJson) => {

                let userArray = responseJson;
                this.setState({ userArray });
            })
    }

    render() {

        return (

            <div className="left">
                <div className="user-search-container">
                    <UserSearch />
                </div>
                <p className="user-list-heading">Users</p>
                <div className="user-list-container">
                    {this.renderUsers()}
                </div>
                <div className="footer">
                    Footer
                </div>
            </div>
        );
    }

    renderUsers() {

        if (this.state.userArray.length != 0) {

            return this.state.userArray.map((user, index) => {

                return <UserList user={user} key={index} />
            })
        }
    }

}