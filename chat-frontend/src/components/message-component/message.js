import React, { Component } from 'react';
import "../../stylesheet/styles.css";


class Message extends Component {

    render() {

        return (

            <div className="chat-message">
                <div className="message-owner">
                    <a>me</a>
                </div>{this.props.msg}</div>
        );
    }
}

export default Message;