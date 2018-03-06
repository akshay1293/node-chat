import React, { Component } from 'react';
import Chat from "../chat-component/chat";
import "./styles.css";

export default class Home extends Component {

    render() {

        return (

            <div className="home-container">
                <div className="profiles-container"></div>
                <div className="chat-container">
                    <Chat />
                </div>
            </div>
        );
    }
}