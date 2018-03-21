import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import { connect } from 'react-redux';


class Message extends Component {

    render() {

        return (

            <div className="chat-message">
                <div className="message-owner">
                    <a>{this.props.msg.owner === this.props.userRed.handle ? "me" : this.props.msg.owner}</a>
                </div>{this.props.msg.message}</div>
        );
    }
}

export default connect(({ userRed, chatRed }) => ({ userRed, chatRed }), {

})(Message);