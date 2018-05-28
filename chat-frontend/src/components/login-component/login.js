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
                <img id="loader" src={loader} className="loader" />
                <div id="login-area" className="login-area">
                    <div className="login-head-container"><p className="login-head">Login To Start Chatting</p></div>
                    <strong id="error-msg"></strong>
                    <div className="input-container">
                        <span><i className="far fa-user-circle" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                        <input type="text" className="input-box" id="handle" placeholder="Username"

                            onChange={() => {
                                this.setState(
                                    {
                                        username: document.getElementById('handle').value,
                                    })
                            }}

                        />
                        <span id="error-user"><i className="fas fa-times" style={{ fontSize: 18, color: "#E73A4C", marginRight: "5px" }}></i></span>
                    </div>
                    <div className="input-container">
                        <span><i className="fas fa-key" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                        <input type="password" className="input-box" id="password" placeholder="Password"

                            onKeyUp={(e) => {

                                if (e.keyCode === 13) {

                                    this.login();
                                }
                            }}

                            onChange={() => {
                                this.setState(
                                    {
                                        password: document.getElementById('password').value,
                                    })
                            }}

                        />
                        <span id="error-pass"><i className="fas fa-times" style={{ fontSize: 18, color: "#E73A4C", marginRight: "5px" }}></i></span>
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
        );
    }

    login() {

        if (this.state.username && this.state.password) {
            document.getElementById('loader').style.display = 'block';
            document.getElementById('login-area').style.filter = "blur(3px)";
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
                                handle: responseJson.handle
                            });
                        this.props.history.push("home");
                    } else {
                        /**show/hide loader and display login errors  */

                        document.getElementById('loader').style.display = 'none';
                        document.getElementById('login-area').style.filter = "blur(0px)"
                        document.getElementById('error-user').style.display = "inline";
                        document.getElementById('error-msg').innerText = responseJson.msg;
                        document.getElementById('error-pass').style.display = "inline";
                        document.getElementById('handle').style.borderBottom = "1px solid #E73A4C";
                        document.getElementById('password').style.borderBottom = "1px solid #E73A4C";
                    }
                })
                .catch((error) => {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('login-area').style.filter = "blur(0px)";
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