import React, { Component } from 'react';
import "./styles.css";
import send from "../../images/send.png";

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
                        <img src={send} alt="send" className="send-button" />
                    </div>
                </div>
            </div>
        );
    }
}