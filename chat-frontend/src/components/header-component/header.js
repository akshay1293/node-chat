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
            menuIconClass: "fas fa-chevron-circle-down",
        }
    }
    render() {

        let menuContainer = {

            display: this.state.displayMenu ? "flex" : "none",
            position: "absolute",
            background: "rgb(255, 255, 255)",
            minWidth: "150px",
            right: this.props.position === "right" ? "24px" : "935px",
            top: "45px",
            border: "1px solid darkgray",
            borderRadius: "3px",
            animationName: "slide",
            animationDuration: "0.3s"
        }
        return (

            <div className="top">
                <div style={menuContainer}>

                    {this.renderOptions()}

                </div>

                <div className="top-left">

                    <div><p style={{ fontSize: 16 }}>{this.props.position === "left" ? this.props.userRed.handle : this.props.chatRed.connection ? this.props.chatRed.connection.to : ""}</p></div>

                </div>
                <div className="top-right">

                    <div className="sign-out" onClick={() => {
                        this.setState({ displayMenu: !this.state.displayMenu });
                    }
                    }>
                        <span id="menu-down"><i className="fas fa-ellipsis-v" style={{ fontSize: 16, color: "#FFF", marginLeft: "8px" }}></i></span>
                    </div>
                </div>
            </div>
        );
    }

    renderOptions() {

        if (this.props.position === "right") {

            return <ul className="menu-list">
                <li><a href="#">Block</a></li>
                <li><a href="#">View</a></li>
            </ul>;


        } else {

            return <ul className="menu-list">
                <li><a href="#">Profile</a></li>
                <li><a href="#">Requests</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#" onClick={this.signOut.bind(this)}>Sign out</a></li>
            </ul>;
        }
    }

    signOut() {


        fetch(this.config.getUrl("signout?handle=" + this.props.userRed.handle), {

            method: "GET",
            headers: {
                'content-type': 'application/json'
            },
        })
            .then((response) => { return response.json() })
            .then((responsejson) => {

                if (responsejson.signOut) {

                    this.cookie.remove("chat_token");
                    localStorage.removeItem("connection");
                    console.log(this.props.socket);
                    this.props.socket.emit("bye", { from: this.props.userRed.handle, to: this.props.chatRed.connection.to })
                    window.location = "http://172.18.3.99:3000/";

                } else {

                    alert("something went wrong, Please try again later");
                }
            })
    }
}

export default connect(({ chatRed, userRed }) => ({ chatRed, userRed }), {

})(Header);

