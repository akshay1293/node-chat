import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import Cookies from 'universal-cookie';
import Config from '../../config';
import { connect } from 'react-redux';

class Header extends Component {

    constructor(props) {

        super();
        this.cookie = new Cookies();
        this.config = new Config();
        this.state = {

            displayMenu: false,
        }
    }
    render() {

        let menuContainer = {

            display: this.state.displayMenu ? "flex" : "none",
            position: "absolute",
            background: "rgba(255, 255, 255, 0.7)",
            width: "150px",
            right: "24px",
            top: "45px",
            borderRadius: "5px 0px 5px 5px",
            border: "1px solid darkgray",
            animationName: "slide",
            animationDuration: "0.1s"
        }
        return (

            <div className="top">
                <div style={menuContainer}>
                    <button onClick={this.signOut.bind(this)} className="login-button sign-out">SIGN OUT</button>
                </div>
                <div className="top-left">
                    <p>{this.props.chatRed.connection.to ? this.props.chatRed.connection.to : ''}</p>
                </div>
                <div className="top-right">
                    <span><i className="far fa-user" style={{ fontSize: 14, color: "#FFF", marginRight: "8px" }}></i></span>
                    <div><a style={{ fontSize: 14 }} href="#">{this.props.user != null ? this.props.user.handle : ""}</a></div>
                    <div className="sign-out" onClick={() => this.setState({ displayMenu: !this.state.displayMenu })}>
                        <span><i className="fas fa-chevron-circle-down" style={{ fontSize: 14, color: "#FFF", marginLeft: "8px" }}></i></span>
                    </div>
                </div>
            </div>
        );
    }

    signOut() {


        fetch(this.config.getUrl("signout?handle=" + this.props.user.handle), {

            method: "GET",
            headers: {
                'content-type': 'application/json'
            },
        })
            .then((response) => { return response.json() })
            .then((responsejson) => {

                if (responsejson.signOut) {

                    this.cookie.remove("chat_token");
                    window.location = "http://localhost:3000/";

                } else {

                    alert("something went wrong, Please try again later");
                }
            })
    }
}

export default connect(({ chatRed }) => ({ chatRed }), {

})(Header);

