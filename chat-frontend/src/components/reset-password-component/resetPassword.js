import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";
import Config from '../../config';
import loader from '../../gif/ajax-loading.gif'

export default class ResetPassword extends Component {

    constructor(props) {

        super(props);

        this.state = {

            isValidToken: false,
            errorMessage: null,
            email: null,
            password: null,
            confirmPassword: null,
        }
        this.config = new Config();
    }

    componentDidMount() {

        var token = this.props.location.search.split('=')[1];

        if (token) {

            fetch(this.config.getUrl('verify'), {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
            })
                .then((response) => { return response.json() })
                .then((responsejson) => {

                    if (responsejson.auth) {

                        console.log(responsejson);

                        this.setState({

                            isValidToken: true,
                            email: responsejson.decoded.email
                        })
                    } else {

                        this.setState({

                            errorMessage: "Your link has expired, Please try again."
                        })
                    }


                }).catch((err) => {

                    console.log(err);
                })
        } else {

            this.setState({

                errorMessage: "something went wrong Please try again later."
            })
        }


    }

    render() {

        if (!this.state.isValidToken) {

            return <p>{this.state.errorMessage ? this.state.errorMessage : "please wait..."}</p>

        } else {

            return (

                <div className="login-container">
                    <img id="loader" src={loader} className="loader" />
                    <div id="login-area" className="login-area">
                        <div className="login-head-container"><p className="login-head">Please provide new password</p></div>
                        <strong id="error-msg"></strong>
                        <div className="input-container">
                            <span><i className="fas fa-key" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                            <input type="password" className="input-box" id="new-password" placeholder="New Password"

                                onChange={(e) => {
                                    this.setState({

                                        password: e.target.value
                                    })
                                }}

                            />
                            <span id="error-user"><i className="fas fa-times" style={{ fontSize: 18, color: "#E73A4C", marginRight: "5px" }}></i></span>
                        </div>
                        <div className="input-container">
                            <span><i className="fas fa-key" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                            <input type="password" className="input-box" id="confirm-new-password" placeholder="Confirm Password"
                                onChange={(e) => {
                                    this.setState({

                                        confirmPassword: e.target.value
                                    })
                                }}
                            />
                            <span id="error-pass"><i className="fas fa-times" style={{ fontSize: 18, color: "#E73A4C", marginRight: "5px" }}></i></span>
                        </div>

                        <button className="login-button" onClick={this.handleResetPassword.bind(this)} style={{ width: "100%" }}>RESET PASSWORD</button>


                    </div>
                    <div className="login-foot">
                        <div className="footer-signup">
                            <p>Click to</p>
                            <a href="/">Login</a>

                        </div>
                    </div>
                </div>
            );
        }
    }

    handleResetPassword() {

        if (this.state.password && this.state.confirmPassword) {
            document.getElementById('loader').style.display = "block";
            fetch(this.config.getUrl('resetPassword'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                }),

            })
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((responseJson) => {
                    document.getElementById('loader').style.display = "none";
                    console.log(responseJson);
                    if (responseJson.success) {
                        document.getElementById("error-msg").style.color = "#043927";
                        document.getElementById("error-msg").innerText = responseJson.msg;
                        document.getElementById("error-msg").appendChild('<a href="#">click here</a>');
                    } else {

                        document.getElementById("error-msg").innerText = responseJson.msg;
                    }
                })

        } else {

            alert("All fields are mandatory");
        }

    }
}