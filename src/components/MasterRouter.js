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
import ManageUser from './ManageUser';
import ManageCompany from './ManageCompany';
import CreateTheater from './CreateTheater';
import CompanyDetail from './CompanyDetail';
import CreateMovie from './CreateMovie';
import TheaterOverview from './TheaterOverview';
import ScheduleMovie from './ScheduleMovie';
import ExploreMovie from './ExploreMovie';
import ViewHistory from './ViewHistory';
import ExploreTheater from './ExploreTheater';
import VisitHistory from './VisitHistory';
//import PrivateRoute from './PrivateRoute';
import StaticData from '../data/StaticData';

function MasterRouter({ location }) {
    /*let currentUser = StaticData.getCurrentUser();
    let loggedIn = typeof currentUser !== "undefined";*/
    //TODO: redirect if not logged in
    
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
                        <Route path="/manageuser" component={ManageUser} />
                        <Route path="/managecompany" component={ManageCompany} />
                        <Route path="/createtheater" component={CreateTheater} />
                        <Route path="/companydetail" component={CompanyDetail} />
                        <Route path="/createmovie" component={CreateMovie} />
                        <Route path="/theateroverview" component={TheaterOverview} />
                        <Route path="/schedulemovie" component={ScheduleMovie} />
                        <Route path="/exploremovie" component={ExploreMovie} />
                        <Route path="/viewhistory" component={ViewHistory} />
                        <Route path="/exploretheater" component={ExploreTheater} />
                        <Route path="/visithistory" component={VisitHistory} />
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
