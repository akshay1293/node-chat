import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import Cookies from 'universal-cookie';
import Header from '../header-component/header';
import ChatDisplay from '../chatDisplay-component/chatDisplay';
import SendMeessage from '../send-message-component/sendMessage';
import Users from '../users-component/users';
import io from "socket.io-client";
import { connect } from 'react-redux';
import { setUser, setConnection, createConversation } from '../../redux/actions';
import Config from '../../config';
import Info from '../info-component/info';


var connectionOptions = {

    "force new connection": true,
    "reconnectionAttempts": "infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};
const config = new Config();
const socket = io(config.getUrl(), connectionOptions);

class Home extends Component {

    constructor(props) {



        super();
        this.state = {

            searchText: null,

        }

        this.cookie = new Cookies();
        this.config = new Config();


    }

    componentDidMount() {

        var token = this.cookie.get("chat_token")
        if (token) {


            fetch(this.config.getUrl('verify'), {

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
                        // console.log(responsejson.decoded.user);
                        this.props.setUser(responsejson.decoded.user);
                        let connection = JSON.parse(localStorage.getItem("connection"));
                        if (connection) {
                            this.props.setConnection(connection);
                            this.props.createConversation(connection.to);
                        }

                        socket.emit('join',
                            {
                                user: this.props.userRed.handle,

                            });

                    }
                })
        } else {

            window.location = "http://localhost:3000/";
        }
    }

    render() {
        // console.log(this.props.chatRed);
        // console.log("this.props.chatRed.messages");
        return (

            <div className="main-container">
                <div className="left-panel">
                    <div className="header-container">
                        <Header position={"left"} />
                    </div>
                    <Users socket={socket} />
                </div>

                {this.renderChatOrInfo()}
            </div>
        );
    }

    renderChatOrInfo() {

        let connection = JSON.parse(localStorage.getItem("connection"));

        if (!connection) {

            return <div className="info-container">
                <Info />
            </div>
        } else {

            return <div className="chat-container">
                <div className="header-container">
                    <Header position={"right"} />
                </div>
                <div className="chat-display-container">
                    <ChatDisplay socket={socket} />
                </div>
                <div className="send-message-container">
                    <SendMeessage socket={socket} />
                </div>
            </div>
        }
    }

}

export default connect(({ userRed, chatRed }) => ({ userRed, chatRed }), {
    setUser, setConnection, createConversation
})(Home);