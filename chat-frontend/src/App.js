import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "./components/home-component/home";
import Login from "./components/login-component/login";
import Signup from "./components/signup-component/signup";
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
        </Switch>
      </Provider>
    );
  }
}

export default App;
