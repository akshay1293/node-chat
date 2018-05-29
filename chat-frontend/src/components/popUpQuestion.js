import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../stylesheet/styles.css";
import Config from '../config';
import loader from '../gif/ajax-loading.gif'

export default class PopUpQuestion extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        const styles = {

            container: {

                display: this.props.visible ? "flex" : "none",
            }
        }

        return (
            <div style={styles.container} id="popup-container" className="popup-container">
                <div className="popup-main">
                    <div className="popup-header">
                        <p onClick={() => { this.props.togglePopUp() }}>cancel</p>
                    </div>
                    <div class="popup-content">
                        <p>{this.renderContent(this.props.contentType)}</p>
                    </div>
                </div >
            </div >
        );
    }

    renderContent(type) {

        switch (type) {

            case "profile": return (<div>profile</div>);
                break;
            case "settings": return this.settingsContent();
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
}