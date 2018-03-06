import React, { Component } from 'react';
import "./styles.css";
import send from "../../images/send.png";
import io from "socket.io-client";

var connectionOptions = {

    "force new connection": true,
    "reconnectionAttempts": "infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};
const socket = io('http://localhost:3002', connectionOptions);

export default class Chat extends Component {

    constructor(props) {

        super();
        this.state = {

            message: null,
        }
    }

    render() {

        return (

            <div className="chat-box">

                <div className="display-chat"></div>
                <div className="message-area">

                    <div className="message-box-container">
                        <input type="text" className="form-control" name="message" id="chat-message"
                            placeholder="Type a message"
                            onChange={() => {

                                this.setState({

                                    message: document.getElementById("chat-message").value,
                                })
                            }}
                        />
                    </div>
                    <div className="send-button-container">
                        <img src={send} alt="send" onClick={this.sendMessage.bind(this)} className="send-button" />
                    </div>
                </div>
            </div>
        );
    }

    sendMessage() {

        socket.emit('chat message', { msg: this.state.message });
        socket.on('catch it', function (data) {

            console.log(data.message);
        })

    }
}