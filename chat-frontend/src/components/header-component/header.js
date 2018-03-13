import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import Cookies from 'universal-cookie';


export default class Header extends Component {

    constructor(props) {

        super();
        this.cookie = new Cookies();
    }
    render() {

        return (

            <div className="top">
                <div className="menu-container">

                </div>
                <div className="top-left">
                    <p>App Name</p>
                </div>
                <div className="top-right">
                    <span><i className="far fa-user" style={{ fontSize: 14, color: "#FFF", marginRight: "8px" }}></i></span>
                    <div><a style={{ fontSize: 14 }} href="#">{this.props.user != null ? this.props.user.user.handle : ""}</a></div>
                    <div className="sign-out" onClick={this.signOut.bind(this)}>
                        <span><i className="fas fa-chevron-circle-down" style={{ fontSize: 14, color: "#FFF", marginLeft: "8px" }}></i></span>
                    </div>
                </div>
            </div>
        );
    }

    signOut() {


        fetch("http://localhost:3004/signout?handle=" + this.props.user.user.handle, {

            method: "GET",
            headers: {
                'content-type': 'application/json'
            },
            // body: JSON.stringify({
            //     handle: this.props.user.user.handle,

            // }),
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

