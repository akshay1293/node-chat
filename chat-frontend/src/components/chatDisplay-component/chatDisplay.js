import React, { Component } from 'react';
import Message from '../message-component/message';
import "../../stylesheet/styles.css";
import { connect } from 'react-redux';
import { appendMessage, setConnection } from '../../redux/actions';


class ChatDisplay extends Component {

    render() {

        console.log(this.props.chatRed.messages);
        return (

            <div className="chat-display" id="chat-display">

                {/* {this.renderMessages()} */}
            </div>
        );
    }

    // componentWillReceiveProps(prev, next) {
    //     console.log(prev);
    //     console.log(next);

    // }

    renderMessages() {

        if (this.props.chatRed.messages.length !== 0) {

            return this.props.chatRed.messages.map((message, index) => {

                return <Message msg={message} key={index} />

            })
        }
    }
}

export default connect(({ userRed, chatRed }) => ({ userRed, chatRed }), {
    appendMessage, setConnection
})(ChatDisplay);