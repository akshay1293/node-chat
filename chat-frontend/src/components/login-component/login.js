import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions';
import Config from '../../config';
import loader from '../../gif/ajax-loading.gif'



class Login extends Component {


    constructor(props) {

        super();

        this.cookie = new Cookies();
        this.config = new Config();
        // this.date = new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear()
        this.state = {

            username: null,
            password: null,
        }
    }

    componentWillMount() {

        var token = this.cookie.get("chat_token")
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

                        this.props.history.push("home");
                    }
                })
        }
    }

    render() {

        return (

            <div className="login-container">
                <img id="loader" src={loader} className="loader" alt="loading..." />
                <div className="login-area-container" id="login-area-container">
                    <div id="login-area" className="login-area">
                        <div className="login-head-container"><p className="login-head">Login To Start Chatting</p></div>
                        <strong id="error-msg"></strong>
                        <div className="input-container">
                            <span><i className="far fa-user-circle" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                            <input type="text" className="input-box" id="username" placeholder="Username"

                                onChange={(e) => {
                                    this.setState(
                                        {
                                            username: e.target.value,
                                        })
                                }}

                            />
                            <span id="error-user" onClick={this.clearInputs.bind(this, "username")}><i className="fas fa-times" style={{ fontSize: 18, color: "rgb(124,10,2)", marginRight: "5px" }}></i></span>
                        </div>
                        <div className="input-container">
                            <span><i className="fas fa-key" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                            <input type="password" className="input-box" id="password" placeholder="Password"

                                onKeyUp={(e) => {

                                    if (e.keyCode === 13) {

                                        this.login();
                                    }
                                }}

                                onChange={(e) => {
                                    this.setState(
                                        {
                                            password: e.target.value,
                                        })
                                }}

                            />
                            <span id="error-pass" onClick={this.clearInputs.bind(this, "password")}><i className="fas fa-times" style={{ fontSize: 18, color: "rgb(124,10,2)", marginRight: "5px" }}></i></span>
                        </div>

                        <button onClick={this.login.bind(this)} className="login-button" style={{ width: "100%" }}>LOG IN</button>
                    </div>
                    <div className="login-foot">
                        <div className="footer-signup">
                            <p>Don't have an account?</p>
                            <a href="/signup">Sign up</a>
                        </div>
                        <div>
                            <a href="/inputUsername">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    clearInputs(input) {

        document.getElementById(input).value = null
        input === "username" ? this.setState({ username: null }) : this.setState({ password: null });
    }

    login() {

        if (this.state.username && this.state.password) {
            document.getElementById('loader').style.display = 'block';
            document.getElementById('login-area-container').style.filter = "blur(3px)";
            fetch(this.config.getUrl("login"), {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    handle: this.state.username,
                    password: this.state.password,
                }),
            })
                .then((response) => { return response.json() })
                .then((responseJson) => {
                    // console.log(responseJson);
                    if (responseJson.success) {
                        this.cookie.set('chat_token', responseJson.token);
                        this.props.setUser(
                            {
                                id: responseJson.id,
                                email: responseJson.email,
                                handle: responseJson.handle,
                                gender: responseJson.gender,
                                status: responseJson.status,
                            });
                        this.props.history.push("home");
                    } else {
                        /**show/hide loader and display login errors  */

                        document.getElementById('loader').style.display = 'none';
                        document.getElementById('login-area-container').style.filter = "blur(0px)"
                        document.getElementById('error-user').style.display = "inline";
                        document.getElementById('error-msg').innerText = responseJson.msg;
                        document.getElementById('error-pass').style.display = "inline";
                        document.getElementById('username').style.borderBottom = "1px solid rgb(124,10,2)";
                        document.getElementById('password').style.borderBottom = "1px solid rgb(124,10,2)";
                    }
                })
                .catch((error) => {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('login-area-container').style.filter = "blur(0px)";
                    alert("something is wrong please try again later" + error);
                });

        } else if (!this.state.username) {

            alert("Please enter your username");

        } else {

            alert("Please enter your password");
        }

    }
}

export default connect(({ userRed }) => ({ userRed }), {
    setUser,
})(Login);