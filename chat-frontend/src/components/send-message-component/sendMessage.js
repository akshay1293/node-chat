import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import io from "socket.io-client";
import Cookies from 'universal-cookie';

var connectionOptions = {

    "force new connection": true,
    "reconnectionAttempts": "infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};
const socket = io('http://localhost:3003', connectionOptions);

socket.emit('join', { id: 0 });

socket.on("msg", function (data) {
    console.log(data.msg);
});

export default class SendMessage extends Component {

    constructor(props) {

        super();
        this.state = {

            message: null,
        }
        this.cookie = new Cookies();
    }

    render() {

        return (

            <div className="message-area">

                <div className="message-box-container">
                    <span style={{ alignSelf: "center" }}><i className="far fa-envelope" style={{ fontSize: 18, color: "#FFF", marginLeft: "8px" }}></i></span>
                    <input type="text" className="input-box message" name="message" id="chat-message"
                        placeholder="Type a message"
                        onChange={() => {

                            this.setState({

                                message: document.getElementById("chat-message").value,
                            })
                        }}
                    />
                </div>
                <div className="send-button-container">
                    <span style={{ alignSelf: "center" }}><i className="fas fa-paper-plane send" style={{ fontSize: 26, color: "#FFF", marginLeft: "8px", cursor: "pointer" }}></i></span>
                </div>
            </div>
        );
    }

    send() {

        // socket.emit('chat message', { msg: this.state.message, id: socket.id });
        // socket.on('catch it', function (data) {

        //     console.log(data);
        // })
    }
}