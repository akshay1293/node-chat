import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";
import { connect } from 'react-redux';
import { setConnection } from '../../redux/actions';

class UserList extends Component {

    render() {

        const styles = {

            online: {

                color: this.props.user.online === true ? "#5EF034" : "darkgray",
            }
        }

        return (

            <div className="user-list" onClick={() => {

                this.props.setConnection({ from: this.props.userRed.handle, to: this.props.user.handle });
            }}>
                <div>
                    <p><strong>{this.props.user.handle}</strong></p>
                    <i style={{ color: "darkgray" }}>{this.props.user.online === true ? "online" : "offline"}</i>
                </div>
                <div><i className="fas fa-circle" style={styles.online}></i></div>
            </div>
        );
    }
}

export default connect(({ userRed }) => ({ userRed }), {
    setConnection,
})(UserList);

