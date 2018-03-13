import React, { Component } from 'react';
// import Chat from "../chat-component/chat";
import "../../stylesheet/styles.css";
import Cookies from 'universal-cookie';
import Header from '../header-component/header';
import ChatDisplay from '../chatDisplay-component/chatDisplay';
import SendMeessage from '../send-message-component/sendMessage';
import Users from '../users-component/users';
import io from "socket.io-client";
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions';

class Home extends Component {

    constructor(props) {



        super();
        this.state = {

            searchText: null,

        }

        this.cookie = new Cookies();


    }

    componentWillMount() {
        // console.log("componentwillmount");

        var connectionOptions = {

            "force new connection": true,
            "reconnectionAttempts": "infinity",
            "timeout": 10000,
            "transports": ["websocket"]
        };

        const socket = io('http://localhost:3004', connectionOptions);

        var token = this.cookie.get("chat_token")
        if (token) {

            //this.props.history.goBack();

            fetch("http://localhost:3004/verify", {

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
                        // console.log(responsejson.decoded.user);
                        this.props.setUser(responsejson.decoded.user)
                        socket.emit('join', { id: user.user.id, user: user.user.handle });

                        socket.on("msg", function (data) {
                            console.log(data.msg);
                        });
                    }
                })
        } else {

            window.location = "http://localhost:3000/";
        }
    }

    render() {
        console.log(this.props.userRed);
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

export default connect(({ userRed }) => ({ userRed }), {
    setUser
})(Home);