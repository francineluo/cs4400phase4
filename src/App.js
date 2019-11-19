import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import RegisterNav from './components/RegisterNav';
import UserRegistration from './components/UserRegistration';
import CustomerRegistration from './components/CustomerRegistration';
import ManagerRegistration from './components/ManagerRegistration';
import ManagerCustomerRegistration from './components/ManagerCustomerRegistration';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/registernav">
                        <RegisterNav />
                    </Route>
                    <Route path="/userregistration">
                        <UserRegistration />
                    </Route>
                    <Route path="/customerregistration">
                        <CustomerRegistration />
                    </Route>
                    <Route path="/managerregistration">
                        <ManagerRegistration />
                    </Route>
                    <Route path="/managercustomerregistration">
                        <ManagerCustomerRegistration />
                    </Route>
                    <Route path="/">
                        <Redirect to="/login" />
                    </Route>
                </Switch>
            </Router>
        );
    /*return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload. 
        </p>
      </div>
    );*/
  }
}

/*function App({ location }) {
    return (
        <Router>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames={"fade"}
                >
                    <div className="route-section">
                        <Switch location={location}>
                            <Route path="/login" component={Login} />
                            <Route path="/registernav" component={RegisterNav} />
                            <Route path="/userregistration" component={UserRegistration} />
                            <Route path="/">
                                <Redirect to="/login" />
                            </Route>
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </Router>
    );
}*/

export default App;
