import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions';



class Login extends Component {

    constructor(props) {

        super();

        this.cookie = new Cookies();

        this.state = {

            username: null,
            password: null
        }
    }

    componentWillMount() {

        var token = this.cookie.get("chat_token")
        if (token) {

            fetch("http://localhost:3004/verify", {

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
                    <p id="error-msg"></p>
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
                    <button className="login-button signup" style={{ width: "100%" }}>SIGN UP</button>
                </div>
            </div>
        );
    }

    login() {

        if (this.state.username && this.state.password) {

            fetch("http://localhost:3004/login", {

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
                    console.log(responseJson);
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

                        document.getElementById('error-user').style.display = "inline";
                        document.getElementById('error-msg').innerText = responseJson.msg;
                        document.getElementById('error-pass').style.display = "inline";
                        document.getElementById('handle').style.borderBottom = "1px solid #E73A4C";
                        document.getElementById('password').style.borderBottom = "1px solid #E73A4C";
                    }
                })
                .catch((error) => {
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