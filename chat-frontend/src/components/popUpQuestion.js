import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../stylesheet/styles.css";
import { connect } from 'react-redux';
import Config from '../config';
import loader from '../gif/ajax-loading.gif'

class PopUpQuestion extends Component {

    constructor(props) {

        super(props);
    }

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
                        <p>{this.props.contentType}</p>
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
                break;
            case "Settings": return this.settingsContent();
                break;
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
                <p><b>{this.props.userRed.handle}</b></p>
                <p><i>{this.props.userRed.email}</i></p>
            </div>
        );
    }
}

export default connect(({ userRed }) => ({ userRed }), {

})(PopUpQuestion);