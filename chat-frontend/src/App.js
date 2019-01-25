import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "./components/home-component/home";
import Login from "./components/login-component/login";
import Signup from "./components/signup-component/signup";
import InputUsername from './components/reset-password-component/inputUsername';
import Resetpassword from './components/reset-password-component/resetPassword';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/resetpassword' component={Resetpassword} />
          <Route exact path='/inputUsername' component={InputUsername} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
