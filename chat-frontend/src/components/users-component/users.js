import React, { Component } from 'react';
import UserSearch from '../user-search-component/userSearch';
import Cookies from 'universal-cookie';
import "../../stylesheet/styles.css";
import Config from '../../config';
import UserList from '../userlist-component/userList';
import { connect } from 'react-redux';
import { appendMessage, setConnection, createConversation } from '../../redux/actions';
import Sound from 'react-sound';
import incomingMessageSound from '../../sounds/incomingMessage.mp3';




class Users extends Component {

    constructor(props) {

        super();

        this.cookie = new Cookies();
        this.config = new Config();
        this.state = {

            userArray: [],
            connected: false,
            playing: false,
        }


    }



    componentDidMount() {


        const { socket, appendMessage, setConnection, chatRed, createConversation } = this.props;


        socket.on('msg', async function (data) {

            this.setState({ playing: true });
            await setConnection({ to: data.from, from: data.to });
            localStorage.setItem("connection", JSON.stringify({ to: data.from, from: data.to }));


            if (!(data.from in chatRed.messages)) {

                await createConversation(data.from);
                // console.log((chatRed.connection.to in chatRed.messages));
            }

            await appendMessage(
                {
                    to: data.from,
                    body: { owner: data.from, message: data.msg }
                });
        }.bind(this))

        socket.on('hi', function (data) {

            this.getUsers();

        }.bind(this))

        socket.on('signedOut', function (data) {

            this.getUsers();

        }.bind(this))

        this.getUsers();


    }

    getUsers() {

        let token = this.cookie.get('chat_token');

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
            .catch((err) => {

                window.location = this.config.baseUrl;

            })

    }

    render() {

        return (

            <div className="left">
                <Sound
                    url={incomingMessageSound}
                    playStatus={this.state.playing === true ? Sound.status.PLAYING : ""}
                />
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