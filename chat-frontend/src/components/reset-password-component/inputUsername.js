import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";
import Config from '../../config';
import loader from '../../gif/ajax-loading.gif'

export default class InputUsername extends Component {

    constructor(props) {

        super(props);

        this.state = {

            username: null,
            isLoggedin: true,
        }
        this.config = new Config();
        this.cookie = new Cookies();
    }

    componentDidMount() {



        var token = this.cookie.get("chat_token");

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

                    if (!responsejson.auth) {



                        this.setState({

                            isLoggedin: false,
                        })
                    } else {

                        window.location = this.config.baseUrl + '/home';
                    }
                }).catch((err) => {

                    console.log(err);
                })
        } else {

            this.setState({

                isLoggedin: false,
            })
        }


    }

    render() {

        if (!this.state.isLoggedin) {

            return (

                <div className="login-container">
                    <img id="loader" src={loader} className="loader" />
                    <div className="login-area-container" id="login-area-container">
                        <div id="login-area" className="login-area">
                            <div className="login-head-container"><p className="login-head">Enter Username</p></div>
                            <strong id="error-msg"></strong>
                            <div className="input-container">
                                <span><i className="far fa-user-circle" style={{ fontSize: 16, color: "#FFF", marginRight: "5px" }}></i></span>
                                <input type="text" className="input-box" id="username" placeholder="username"

                                    onChange={(e) => {
                                        this.setState(
                                            {
                                                username: e.target.value,
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
                </div>
            );
        } else {

            return <img id="loader" src={loader} className="loader-visible" />
        }


    }

    sendPasswordResetMail() {

        if (this.state.username) {

            document.getElementById('loader').style.display = "block";
            document.getElementById('login-area-container').style.filter = "blur(3px)";
            fetch(this.config.getUrl('forgotPassword') + "?user=" + this.state.username, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {

                    return response.json();
                })
                .then((responseJson) => {


                    document.getElementById('loader').style.display = "none";
                    document.getElementById('login-area-container').style.filter = "blur(0px)";
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

            alert("please provide username");
        }

    }
}