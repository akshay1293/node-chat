import React, { Component } from 'react';
import UserSearch from '../user-search-component/userSearch';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";
import Config from '../../config';
import UserList from '../userlist-component/userList';
import { connect } from 'react-redux';
import { appendMessage, setConnection, createConversation } from '../../redux/actions';



class Users extends Component {

    constructor(props) {

        super();

        this.cookie = new Cookies();
        this.config = new Config();
        this.state = {

            userArray: [],
            connected: false
        }


    }



    componentDidMount() {

        let token = this.cookie.get('chat_token');
        const { socket, appendMessage, setConnection, chatRed, createConversation } = this.props;


        socket.on('msg', async function (data) {
            console.log(data);
            await setConnection({ to: data.from, from: data.to });
            localStorage.setItem("connection", JSON.stringify({ to: data.from, from: data.to }));


            if (!(data.from in chatRed.messages)) {

                await createConversation(data.from);
                // console.log((chatRed.connection.to in chatRed.messages));
            }
            console.log(chatRed.messages);
            await appendMessage(
                {
                    to: data.from,
                    body: { owner: data.from, message: data.msg }
                });
        })

        socket.on('hi', function (data) {

            document.getElementById(data.user).style.color = "#5EF034";
            document.getElementById(data.user + "-" + "status").innerText = "online";
        })

        socket.on('signedOut', function (data) {

            document.getElementById(data.from).style.color = "darkgray";
            document.getElementById(data.from + "-" + "status").innerText = "offline";
        })


        fetch(this.config.getUrl("list"), {

            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            }
        })
            .then((response) => { return response.json() })
            .then((responseJson) => {

                let userArray = responseJson;
                this.setState({ userArray });
            })
    }

    render() {

        return (

            <div className="left">
                <div className="user-search-container">
                    <UserSearch />
                </div>
                <p className="user-list-heading">Users</p>
                <div className="user-list-container">
                    {this.renderUsers()}
                </div>
                <div className="footer">
                    Footer
                </div>
            </div>
        );
    }

    renderUsers() {

        const { chatRed } = this.props;

        if (this.state.userArray.length !== 0) {

            return this.state.userArray.map((user, index) => {
                if (user.handle !== this.props.userRed.handle) {
                    if (user.handle === chatRed.connection.to) {

                        return <UserList user={user} key={index} active={true} />
                    } else
                        return <UserList user={user} key={index} />
                }

            })
        }
    }

}

export default connect(({ userRed, chatRed }) => ({ userRed, chatRed }), {
    appendMessage, setConnection, createConversation
})(Users);