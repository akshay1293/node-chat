import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";



export default class Login extends Component {

    constructor(props) {

        super();

        this.cookie = new Cookies();

        this.state = {

            username: null,
            password: null
        }
    }

    componentWillMount() {
        console.log("ouidh");
        var token = this.cookie.get("chat_token")
        if (token) {

            fetch("http://localhost:3003/verify", {

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
                <div className="login-area">
                    {/* <h4><strong>Login to start Chatting</strong></h4> */}
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
                    </div>
                    <div className="input-container">
                        <span><i className="fas fa-key" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                        <input type="password" className="input-box" id="password" placeholder="Password"

                            onChange={() => {
                                this.setState(
                                    {
                                        password: document.getElementById('password').value,
                                    })
                            }}

                        />
                    </div>
                    <button onClick={this.login.bind(this)} className="login-button" style={{ width: "100%" }}>LOG IN</button>
                </div>
            </div>
        );
    }

    login() {

        if (this.state.username && this.state.password) {

            fetch("http://localhost:3003/login", {

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
                    if (!responseJson.success) {
                        this.cookie.set('chat_token', responseJson.token);
                        this.props.history.push("home");
                    } else {

                        alert(responseJson.msg);
                    }
                })
                .catch((error) => {
                    alert("something is wrong please try again later");
                });

        } else if (!this.state.username) {

            alert("Please enter your username");

        } else {

            alert("Please enter your password");
        }

    }
}

