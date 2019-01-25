import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import { connect } from 'react-redux';
import { setConnection, createConversation } from '../../redux/actions';

class UserList extends Component {

    constructor(props) {

        super();

        this.state = {

            clicked: false,
        }
    }

    render() {

        const styles = {

            online: {

                color: this.props.user.online ? "#5EF034" : "darkgray",
            },
            active: {

                background: this.props.active ? "rgba(208, 245, 207,0.4)" : "",
            },
        }
        //console.log(styles.online);
        return (

            <div className="user-list" style={styles.active} onClick={this.props.user.online ? this.userClickHandler.bind(this) : () => alert(this.props.user.handle + " " + "is offline")}>
                <div>
                    <p><strong>{this.props.user.handle}</strong></p>
                    <i style={styles.online}>{this.props.user.online === true ? "online" : "offline"}</i>
                </div>
            </div >
        );
    }

    userClickHandler() {


        this.props.setConnection({ from: this.props.userRed.handle, to: this.props.user.handle });
        this.setState({ clicked: true })
        let connection = JSON.stringify({ from: this.props.userRed.handle, to: this.props.user.handle });
        let conversation = {};
        conversation[this.props.user.handle] = [];

        if (!this.state.clicked) {

            this.props.createConversation(this.props.user.handle);
        }

        localStorage.setItem("connection", connection);
    }
}

export default connect(({ userRed, chatRed }) => ({ userRed, chatRed }), {
    setConnection, createConversation
})(UserList);

