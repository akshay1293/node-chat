import React, { Component } from 'react';
// import Chat from "../chat-component/chat";
import "../../stylesheet/styles.css";
import Cookies from 'universal-cookie';
import searchIcon from "../../images/search-icon.png";
import Header from '../header-component/header';
import ChatDisplay from '../chatDisplay-component/chatDisplay';
import SendMeessage from '../send-message-component/sendMessage';
import Users from '../users-component/users';

export default class Home extends Component {

    constructor(props) {

        super();
        this.state = {

            searchText: null,
            user: null,
        }

        this.cookie = new Cookies();
    }

    componentWillMount() {
        var token = this.cookie.get("chat_token")
        if (token) {

            //this.props.history.goBack();

            fetch("http://localhost:3003/verify", {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
            })
                .then((response) => { return response.json() })
                .then((responsejson) => {

                    if (!responsejson.auth) {

                        window.location = "http://localhost:3000/";
                    } else {

                        let user = responsejson.decoded;
                        this.setState({ user });
                    }
                })
        } else {

            window.location = "http://localhost:3000/";
        }
    }

    render() {
        console.log("render");
        return (

            <div className="main-container">
                <div className="left-panel">
                    <Users />
                </div>
                <div className="chat-container">
                    <div className="header-container">
                        <Header user={this.state.user} />
                    </div>
                    <div className="chat-display-container">
                        <ChatDisplay />
                    </div>
                    <div className="send-message-container">
                        <SendMeessage />
                    </div>
                </div>
            </div>
        );
    }
}