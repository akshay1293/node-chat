import React from 'react';
import Message from '../message-component/message';
import "../../stylesheet/styles.css";
import { connect } from 'react-redux';
import { appendMessage, setConnection } from '../../redux/actions';


const ChatDisplay = (props) => {

    return (
        renderMessages(props) ? renderMessages(props) : ""
    );
}

function renderMessages(props) {

    const { chatRed } = props;

    if (chatRed.messages[chatRed.connection.to] !== undefined) {

        if (chatRed.messages[chatRed.connection.to].length !== 0) {

            return chatRed.messages[chatRed.connection.to].map((message, index) => {

                return <Message msg={message} key={index} />

            })
        }
    }
}


export default connect(({ userRed, chatRed }) => ({ userRed, chatRed }), {
    appendMessage, setConnection
})(ChatDisplay);