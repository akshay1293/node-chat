import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";

export default class UserList extends Component {

    render() {

        const styles = {

            online: {

                color: this.props.user.online === true ? "#5EF034" : "darkgray",
            }
        }
       
        return (

            <div className="user-list">
                <div>
                    <p><strong>{this.props.user.handle}</strong></p>
                    <i style={{ color: "darkgray" }}>{this.props.user.online === true ? "online" : "offline"}</i>
                </div>
                <div><i className="fas fa-circle" style={styles.online}></i></div>
            </div>
        );
    }
}

