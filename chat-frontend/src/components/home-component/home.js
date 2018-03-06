import React, { Component } from 'react';
import Chat from "../chat-component/chat";
import "./styles.css";
import searchIcon from "../../images/search-icon.png";

export default class Home extends Component {

    constructor(props) {

        super();
        this.state = {

            searchText: null,
        }
    }

    render() {

        return (

            <div className="home-container">
                <div className="profiles-container">
                    <div className="search-box-container">

                        <input type="text" className="search-txt-box" name="search" id="search-box"
                            placeholder="search a user"
                            onChange={() => {

                                this.setState({

                                    searchText: document.getElementById("search-box").value,
                                })
                            }}
                        />

                        <span className="search-icon-container">
                            <img src={searchIcon} alt="search" className="search-icon" />
                        </span>

                    </div>
                    <div className="profile-list">

                    </div>
                </div>
                <div className="chat-container">
                    <Chat />
                </div>
            </div>
        );
    }
}