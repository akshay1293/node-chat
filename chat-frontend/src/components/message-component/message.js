import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import { connect } from 'react-redux';


class Message extends Component {

    render() {

        return (
            <div style={{ float: "right", clear: "both" }}>
                <div className="chat-message" style={{ alignSelf: this.props.msg.owner !== this.props.userRed.handle ? "flex-start" : "flex-end" }}>
                    <div className="message-owner">
                        <a>{this.props.msg.owner === this.props.userRed.handle ? "me" : this.props.msg.owner}</a>
                    </div>{this.props.msg.message}
                </div>
            </div>

        );
    }
}

export default connect(({ userRed, chatRed }) => ({ userRed, chatRed }), {

})(Message);