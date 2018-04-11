import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import Config from '../../config';

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
                <div className="login-area">
                    <div className="login-head-container"><p className="login-head">Create New Account</p></div>
                    <strong id="error-msg">{this.state.error ? this.state.error : this.state.success}</strong>
                    <div className="input-container">
                        <span><i className="far fa-envelope" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                        <input type="text" onChange={() => {

                            this.setState({ email: document.getElementById("email").value })
                        }}
                            className="input-box" id="email" placeholder="EMAIL"
                        />
                    </div>
                    <div className="input-container">
                        <span><i className="far fa-user" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                        <input type="text" onChange={() => {

                            this.setState({ handle: document.getElementById("username").value });

                        }} className="input-box" id="username" placeholder="USERNAME"
                        />
                    </div>
                    <div className="input-container">
                        <span><i className="fas fa-key" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                        <input type="password" onChange={() => {

                            this.setState({ password: document.getElementById("password").value })

                        }} className="input-box" id="password" placeholder="PASSWORD"
                        />
                    </div>
                    <div className="input-container">
                        <span><i className="fas fa-key" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                        <input type="password" onChange={() => {

                            this.setState({ confirmPassword: document.getElementById("confirmPassword").value })

                        }} className="input-box" id="confirmPassword" placeholder="CONFIRM PASSWORD"
                        />
                    </div>
                    <button onClick={this.signup.bind(this)} id="signup" className="login-button" style={{ width: "100%" }}>SIGN UP</button>
                </div>
                {}
            </div>
        );
    }

    signup() {


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

                console.log(responseJson);
                if (responseJson.exists) {

                    this.setState({ error: responseJson.msg });
                } else if (!responseJson.valid) {

                    this.setState({ error: responseJson.msg });
                } else if (responseJson.result) {

                    // document.getElementById("error-msg").innerHTML = "<p>account created succesfully</p> <a href=" / ">click here</a> <p>to login</p>"
                    this.setState({ success: "Acoount created succesfully" });
                }
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