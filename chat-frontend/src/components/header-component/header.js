import React, { Component } from 'react';
import "../../stylesheet/styles.css";
import Cookies from 'universal-cookie';


export default class Header extends Component {

    constructor(props) {

        super();
        this.cookie = new Cookies();
    }
    render() {
        console.log(this.props);
        return (

            <div className="top">
                <div class="menu-container">

                </div>
                <div className="top-left">
                    <p>App Name</p>
                </div>
                <div className="top-right">
                    <span className="glyphicon glyphicon-user" style={{ fontSize: 16, marginRight: '8px' }}></span>
                    <div><a href="#">{this.props.user != null ? this.props.user.handle : ""}</a></div>
                    <div class="sign-out" onClick={this.signOut.bind(this)}>
                        <span className="glyphicon glyphicon-triangle-bottom" style={{ fontSize: 16, marginLeft: '10px', }}></span>
                    </div>
                </div>
            </div>
        );
    }

    signOut() {

        this.cookie.remove("chat_token");
        window.location = "http://localhost:3000/";
    }
}

