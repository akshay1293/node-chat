import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";
import Config from '../../config';
import loader from '../../gif/ajax-loading.gif'

export default class InputEmail extends Component {

    constructor(props) {

        super(props);

        this.state = {

            email: null,
        }
        this.config = new Config();
    }

    render() {

        return (

            <div className="login-container">
                <img id="loader" src={loader} className="loader" />
                <div id="login-area" className="login-area">
                    <div className="login-head-container"><p className="login-head">Enter Registered Email</p></div>
                    <strong id="error-msg"></strong>
                    <div className="input-container">
                        <span><i className="fas fa-envelope" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                        <input type="email" className="input-box" id="registered-email" placeholder="Email"

                            onChange={(e) => {
                                this.setState(
                                    {
                                        email: e.target.value,
                                    })

                            }}


                        />
                        <span id="error-user"><i className="fas fa-times" style={{ fontSize: 18, color: "#E73A4C", marginRight: "5px" }}></i></span>
                    </div>
                    <button className="login-button" onClick={this.sendPasswordResetMail.bind(this)} style={{ width: "100%" }}>SUBMIT</button>


                </div>
                <div className="login-foot">
                    <div className="footer-signup">
                        <p>Don't have an account?</p>
                        <a href="/signup">Sign up</a>
                    </div>
                </div>
            </div>
        );
    }

    sendPasswordResetMail() {

        if (this.state.email) {

            document.getElementById('loader').style.display = "block";

            fetch(this.config.getUrl('forgotPassword') + "?email=" + this.state.email, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {

                    return response.json();
                })
                .then((responseJson) => {

                    console.log(responseJson);
                    document.getElementById('loader').style.display = "none";
                    if (!responseJson.success) {

                        document.getElementById('error-msg').innerText = responseJson.msg;
                    } else {

                        document.getElementById('error-msg').style.color = "#043927";
                        document.getElementById('error-msg').innerText = responseJson.msg;
                    }
                })
                .catch((err) => {

                    console.log(err);
                })
        } else {

            alert("please provide email");
        }

    }
}