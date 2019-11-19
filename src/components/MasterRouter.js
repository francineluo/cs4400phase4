import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import '../stylesheets/Main.css';
import Login from './Login';
import RegisterNav from './RegisterNav';
import UserRegistration from './UserRegistration';
import CustomerRegistration from './CustomerRegistration';
import ManagerRegistration from './ManagerRegistration';
import ManagerCustomerRegistration from './ManagerCustomerRegistration';
import Functionality from './Functionality';

function MasterRouter({ location }) {
    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                timeout={{ enter: 400, exit: 200 }}
                classNames={"fade"}
            >
                <div className="route-section">
                    <Switch location={location}>
                        <Route path="/login" component={Login} />
                        <Route path="/registernav" component={RegisterNav} />
                        <Route path="/userregistration" component={UserRegistration} />
                        <Route path="/customerregistration" component={CustomerRegistration} />
                        <Route path="/managerregistration" component={ManagerRegistration} />
                        <Route path="/managercustomerregistration" component={ManagerCustomerRegistration} />
                        <Route path="/functionality" component={Functionality} />
                        <Route path="/">
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default withRouter(MasterRouter);
