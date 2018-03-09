import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "./styles.css";



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
                    <h4><strong>Login to start Chatting</strong></h4>
                    <input type="text" className="form-control" id="handle" placeholder="Username"

                        onChange={() => {
                            this.setState(
                                {
                                    username: document.getElementById('handle').value,
                                })
                        }}

                    />
                    <input type="password" className="form-control" id="password" placeholder="Password"

                        onChange={() => {
                            this.setState(
                                {
                                    password: document.getElementById('password').value,
                                })
                        }}

                    />
                    <a onClick={this.login.bind(this)} className="btn btn-primary" style={{ width: "100%" }}>Login</a>
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
                    if (!responseJson.error) {
                        this.cookie.set('chat_token', responseJson.token);
                        this.props.history.push("home");
                    } else {

                        alert(responseJson.error);
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