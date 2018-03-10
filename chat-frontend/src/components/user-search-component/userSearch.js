import React, { Component } from 'react';
import "../../stylesheet/styles.css";



export default class UserSearch extends Component {

    constructor(props) {

        super();

        this.state = {

            searchText: null
        }
    }
    render() {

        return (

            <div className="search-box-container">

                <input type="text" className="input-box search" name="search" id="search-box"
                    placeholder="search a user"
                    onChange={() => {

                        this.setState({

                            searchText: document.getElementById("search-box").value,
                        })
                    }}
                />

                <span className="search-icon-container">
                    <i className="fas fa-search" style={{ fontSize: 18, color: "#FFF", marginBottom: "6px" }} />
                </span>
            </div>
        );
    }
}