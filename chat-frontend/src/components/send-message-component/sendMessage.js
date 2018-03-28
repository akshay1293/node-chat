import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import Config from '../../config';
import { appendMessage } from '../../redux/actions';

class SendMessage extends Component {

    constructor(props) {

        super();
        this.state = {

            message: null,
        }
        this.config = new Config();
        this.cookie = new Cookies();

    }


    render() {

        return (

            <div className="message-area">

                <div className="message-box-container">
                    <span style={{ alignSelf: "center" }}><i className="far fa-envelope" style={{ fontSize: 18, color: "#FFF", marginLeft: "8px" }}></i></span>
                    <input type="text" className="input-box message" name="message" id="chat-message"
                        placeholder="Type a message"
                        onKeyUp={(e) => {

                            if (e.keyCode === 13) {

                                this.send();
                            }
                        }}
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

        const { socket } = this.props;
        if (this.props.chatRed.connection.to) {

            socket.emit('chat',
                {
                    from: this.props.chatRed.connection.from,
                    to: this.props.chatRed.connection.to,
                    message: this.state.message,
                });

            this.props.appendMessage(
                {
                    to: this.props.chatRed.connection.to,
                    body: { owner: this.props.chatRed.connection.from, message: this.state.message }
                });

            document.getElementById("chat-message").value = null

        } else {

            alert("Please select a user to chat with");
        }




    }
}

export default connect(({ userRed, chatRed }) => ({ userRed, chatRed }), {
    appendMessage

})(SendMessage);