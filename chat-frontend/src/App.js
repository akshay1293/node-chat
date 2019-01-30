import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "./components/home-component/home";
import Login from "./components/login-component/login";
import Signup from "./components/signup-component/signup";
import InputUsername from './components/reset-password-component/inputUsername';
import Resetpassword from './components/reset-password-component/resetPassword';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';
import Cookies from 'universal-cookie';
import Config from "./config";
import Loader from "./components/loader";



class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      isVerified: null,
      user: null,
    }

    this.cookie = new Cookies();
    this.config = new Config();
  }

  authenticateUser() {
    var token = this.cookie.get("chat_token")
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

            this.setState({ isVerified: false })
          } else {

            this.setState({
              isVerified: true,
              user: responsejson.decoded.user
            });

          }
        }).catch((err) => {

          this.showAlert("unable to get data");
          this.setState({ isVerified: false })
        })
    } else {

      this.setState({ isVerified: false })
    }
  }

  componentDidMount() {

    this.authenticateUser();
  }

  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/' render={() => {

            switch (this.state.isVerified) {

              case false:
                return <Login />
              case true:
                return <Home user={this.state.user} />
              default:
                return <Loader display={true} />
            }
          }} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/resetpassword' component={Resetpassword} />
          <Route exact path='/inputUsername' component={InputUsername} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
