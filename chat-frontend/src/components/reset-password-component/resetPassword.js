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
            user: null,
        }
        this.config = new Config();
        this.cookie = new Cookies();
    }

    componentDidMount() {
       

        var Temptoken = this.props.location.search.split('&')[0];
        var token = Temptoken.split('=')[1] || this.cookie.get("chat_token");

        

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

                        

                        this.setState({

                            isValidToken: true,
                            email: responsejson.decoded.user.email,
                            user: responsejson.decoded.user.handle
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
                    <div className="login-area-container" id="login-area-container">
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
                        {this.cookie.get('chat_token') ? "" : <div className="login-foot">
                            <div className="footer-signup">
                                <p>Click to</p>
                                <a href="/">Login</a>
                            </div>
                        </div>}
                    </div>
                </div >
            );
        }
    }

    handleResetPassword() {

        if (this.state.password && this.state.confirmPassword) {
            document.getElementById('loader').style.display = "block";
            document.getElementById('login-area-container').style.filter = "blur(3px)";
            fetch(this.config.getUrl('resetPassword'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                    user: this.state.user
                }),

            })
                .then((response) => {
                  
                    document.getElementById('login-area-container').style.filter = "blur(0px)";
                    return response.json();
                })
                .then((responseJson) => {
                    document.getElementById('loader').style.display = "none";
                   
                    if (responseJson.success) {
                        document.getElementById("error-msg").style.color = "#043927";
                        document.getElementById("error-msg").innerText = responseJson.msg;

                    } else {

                        document.getElementById("error-msg").innerText = responseJson.msg;
                    }
                })
                .catch((err) => {

                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('login-area-container').style.filter = "blur(0px)";
                    alert("something is wrong please try again later" + err);
                })

        } else {

            alert("All fields are mandatory");
        }

    }
}