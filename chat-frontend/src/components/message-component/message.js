import React from 'react';
import "../../stylesheet/styles.css";
import { connect } from 'react-redux';




const Message = (props) => {

    return (
        <div style={{ float: "right", clear: "both" }}>
            <div className="chat-message" style={{ alignSelf: props.msg.owner !== props.userRed.handle ? "flex-start" : "flex-end" }}>
                <div className="message-owner">
                    <a>{props.msg.owner === props.userRed.handle ? "me" : props.msg.owner}</a>
                </div>{props.msg.message}
            </div>
        </div>

    );
}


export default connect(({ userRed, chatRed }) => ({ userRed, chatRed }), {

})(Message);