import React, { Component } from 'react';
import Message from '../message-component/message';
import "../../stylesheet/styles.css";
import io from "socket.io-client";
import Config from '../../config';



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


export default class ChatDisplay extends Component {



    render() {

        return (

            <div className="chat-display" id="chat-display">
                <Message msg={"hello my name is akshay"} />
                <Message msg={"hello my"} />
                <Message msg={"hello my name is"} />
                <Message msg={"hello my name "} />
                <Message msg={"hello my name is akshay"} />
            </div>
        );
    }
}

