import React, { Component } from 'react';
import "../stylesheet/styles.css";
import { connect } from 'react-redux';
import man from '../img/avatars/man.png';
import girl from '../img/avatars/girl.png';

class PopUpQuestion extends Component {

    render() {
        console.log(this.props.userRed);
        const styles = {

            container: {

                display: this.props.visible ? "flex" : "none",
            }
        }

        return (
            <div style={styles.container} id="popup-container" className="popup-container">
                <div className="popup-main">
                    <div className="popup-header">
                        <p><i className="fas fa-pencil-alt" style={{ fontSize: 16 }}></i></p>
                        <p onClick={() => { this.props.togglePopUp() }} className="popup-close"><i className="fas fa-times"></i></p>
                    </div>
                    <div className="popup-content">
                        {this.renderContent(this.props.contentType)}
                    </div>
                </div >
            </div >
        );
    }

    renderContent(type) {

        switch (type) {

            case "Profile": return this.profileContent();

            case "Settings": return this.settingsContent();

            default: return "no content found";

        }

    }

    settingsContent() {

        return (
            <div>
                <a href='/resetpassword'>Reset Password</a>
            </div>
        );
    }

    profileContent() {

        return (

            <div>
                <img src={this.props.userRed.gender === "m" ? man : girl} className="profile-avatar" alt="profile avatar" />
                <h4><b>{this.props.userRed.handle}</b></h4>
                <p><b>{this.props.userRed.status ? "active" : "Inactive"}</b></p>
                <p><i>{this.props.userRed.email}</i></p>
            </div>
        );
    }
}

export default connect(({ userRed }) => ({ userRed }), {

})(PopUpQuestion);