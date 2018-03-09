import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "./components/home-component/home";
import Login from "./components/login-component/login";



class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Home} />
      </Switch>
    );
  }
}

export default App;
