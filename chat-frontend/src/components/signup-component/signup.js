import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import Config from '../../config';
import loader from '../../gif/ajax-loading.gif'


export default class Signup extends Component {

    constructor(props) {

        super();

        this.state = {

            email: null,
            handle: null,
            password: null,
            confirmPassword: null,
            error: null,
            success: null,
        }

        this.config = new Config();
    }

    componentDidMount() {


    }

    render() {

        return (

            <div className="login-container">
                <img id="loader" src={loader} className="loader" />
                <div className="login-area-container" id="login-area-container">
                    <div id="login-area" className="login-area">
                        <div className="login-head-container"><p className="login-head">Create New Account</p></div>
                        <strong id="error-msg"></strong>
                        <div className="input-container">
                            <span><i className="far fa-envelope" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                            <input type="text" onChange={() => {

                                this.setState({ email: document.getElementById("email").value })
                            }}
                                className="input-box" id="email" placeholder="Email"
                            />
                        </div>
                        <div className="input-container">
                            <span><i className="far fa-user" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                            <input type="text" onChange={() => {

                                this.setState({ handle: document.getElementById("username").value });

                            }} className="input-box" id="username" placeholder="Username"
                            />
                        </div>
                        <div className="input-container">
                            <span><i className="fas fa-key" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                            <input type="password" onChange={() => {

                                this.setState({ password: document.getElementById("password").value })

                            }} className="input-box" id="password" placeholder="Password"
                            />
                        </div>
                        <div className="input-container">
                            <span><i className="fas fa-key" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                            <input type="password" onChange={() => {

                                this.setState({ confirmPassword: document.getElementById("confirmPassword").value })

                            }} className="input-box" id="confirmPassword" placeholder="Confirm Password "
                            />
                        </div>
                        <button onClick={this.signup.bind(this)} id="signup" className="login-button" style={{ width: "100%" }}>SIGN UP</button>
                    </div>
                    <div className="login-foot">
                        <div className="footer-signup">
                            <p>Click to</p>
                            <a href="/">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    signup() {

        document.getElementById('loader').style.display = 'block';
        document.getElementById('login-area-container').style.filter = "blur(3px)";
        fetch(this.config.getUrl("create"), {

            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                handle: this.state.handle,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })
        })
            .then((response) => { return response.json(); })
            .then((responseJson) => {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('login-area-container').style.filter = "blur(0px)";
           
                if (responseJson.exists) {

                    document.getElementById('error-msg').innerText = responseJson.msg;
                } else if (!responseJson.valid) {

                    document.getElementById('error-msg').innerText = responseJson.msg;
                    this.clearInputs();
                } else {

                    document.getElementById("error-msg").style.color = "#043927";
                    document.getElementById('error-msg').innerText = responseJson.msg;
                    this.clearInputs();
                }
            })
            .catch((err) => {

                document.getElementById('loader').style.display = 'none';
                document.getElementById('login-area-container').style.filter = "blur(0px)";
                alert("something is wrong please try again later" + err);
            })




    }

    clearInputs() {

        this.setState({

            email: null,
            handle: null,
            password: null,
            confirmPassword: null,
        }, () => {

            document.getElementById("username").value = null;
            document.getElementById("email").value = null;
            document.getElementById("password").value = null;
            document.getElementById("confirmPassword").value = null;
        })
    }

    validateFields() {

        if (!this.state.email || !this.state.handle || !this.state.password || !this.state.confirmPassword) {

            return false;
        } else {

            return true;
        }

    }
}