import React, { Component } from 'react';
import Message from '../message-component/message';
import "../../stylesheet/styles.css";
import io from "socket.io-client";
import Config from '../../config';
import { connect } from 'react-redux';
import { appendMessage, setConnection } from '../../redux/actions';



// var connectionOptions = {

//     "force new connection": true,
//     "reconnectionAttempts": "infinity",
//     "timeout": 10000,
//     "transports": ["websocket"]
// };
// var config = new Config();
// const socket = io(config.getUrl(), connectionOptions);

// socket.on("msg", function (data) {
//     console.log(data.msg);
// });


class ChatDisplay extends Component {


    componentDidMount() {

        const { socket, appendMessage, setConnection } = this.props;

        socket.on('msg', function (data) {

            appendMessage({ owner: data.from, message: data.msg });
            setConnection({ to: data.from, from: data.to });
            localStorage.setItem("connection", JSON.stringify({ to: data.from, from: data.to }));


        })
    }



    render() {


        return (

            <div className="chat-display" id="chat-display">

                {this.renderMessages()}
            </div>
        );
    }

    renderMessages() {

        if (this.props.chatRed.messages.length != 0) {

            return this.props.chatRed.messages.map((message, index) => {

                return <Message msg={message} key={index} />
            })
        }
    }
}

export default connect(({ userRed, chatRed }) => ({ userRed, chatRed }), {
    appendMessage, setConnection
})(ChatDisplay);