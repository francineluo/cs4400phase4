import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class Functionality extends Component {
    constructor(props) {
        super(props);
        let currentUser = StaticData.getCurrentUser();
        if (typeof currentUser === "undefined") {
            this.state = { loggedIn: false };
        } else {
            this.state = {
                loggedIn: true,
                isCustomer: currentUser.isCustomer,
                isAdmin: currentUser.isAdmin,
                isManager: currentUser.isManager
            };
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        StaticData.logoutCurrentUser();
        this.setState({
            loggedIn: false,
            currentUser: undefined
        });
    }

    userOptions() {
        return (
            <div className="functionality-options">
                <Link to="/exploretheater" className="button">Explore Theater</Link>
                <Link to="/visithistory" className="button">Visit History</Link>
                <div className="button" onClick={this.logout}>Back</div>
            </div>
        );
    }

    customerOptions() {
        return (
            <div className="functionality-options">
                <Link to="/exploremovie" className="button">Explore Movie</Link>
                <Link to="/viewhistory" className="button">View History</Link>
                <Link to="/exploretheater" className="button">Explore Theater</Link>
                <Link to="/visithistory" className="button">Visit History</Link>
                <div className="button" onClick={this.logout}>Back</div>
            </div>
        );
    }

    managerOptions() {
        return (
            <div className="functionality-options">
                <Link to="/theateroverview" className="button">Theater Overview</Link>
                <Link to="/schedulemovie" className="button">Schedule Movie</Link>
                <Link to="/exploretheater" className="button">Explore Theater</Link>
                <Link to="/visithistory" className="button">Visit History</Link>
                <div className="button" onClick={this.logout}>Back</div>
            </div>
        );
    }

    managerCustomerOptions() {
        return (
            <div className="functionality-options">
                <Link to="/exploremovie" className="button">Explore Movie</Link>
                <Link to="/viewhistory" className="button">View History</Link>
                <Link to="/theateroverview" className="button">Theater Overview</Link>
                <Link to="/schedulemovie" className="button">Schedule Movie</Link>
                <Link to="/exploretheater" className="button">Explore Theater</Link>
                <Link to="/visithistory" className="button">Visit History</Link>
                <div className="button" onClick={this.logout}>Back</div>
            </div>
        );
    }

    adminOptions() {
        return (
            <div className="functionality-options">
                <Link to="/manageuser" className="button">Manage User</Link>
                <Link to="/managecompany" className="button">Manage Company</Link>
                <Link to="/createmovie" className="button">Create Movie</Link>
                <Link to="/exploretheater" className="button">Explore Theater</Link>
                <Link to="/visithistory" className="button">Visit History</Link>
                <div className="button" onClick={this.logout}>Back</div>
            </div>
        );
    }

    adminCustomerOptions() {
        return (
            <div className="functionality-options">
                <Link to="/manageuser" className="button">Manage User</Link>
                <Link to="/managecompany" className="button">Manage Company</Link>
                <Link to="/createmovie" className="button">Create Movie</Link>
                <Link to="/exploremovie" className="button">Explore Movie</Link>
                <Link to="/viewhistory" className="button">View History</Link>
                <Link to="/exploretheater" className="button">Explore Theater</Link>
                <Link to="/visithistory" className="button">Visit History</Link>
                <div className="button" onClick={this.logout}>Back</div>
            </div>
        );
    }

    render() {
        if (!this.state.loggedIn) {
            return (<Redirect to={{
                pathname: "/login", state: { loggedOut: true }
            }} />);
        }

        let userType;
        let options;
        if (this.state.isAdmin && this.state.isCustomer) {
            userType = "Admin-Customer";
            options = this.adminCustomerOptions();
        } else if (this.state.isAdmin) {
            userType = "Admin-Only";
            options = this.adminOptions();
        } else if (this.state.isCustomer && this.state.isManager) {
            userType = "Manager-Customer";
            options = this.managerCustomerOptions();
        } else if (this.state.isCustomer) {
            userType = "Customer";
            options = this.customerOptions();
        } else if (this.state.isManager) {
            userType = "Manager-Only";
            options = this.managerOptions();
        } else {
            userType = "User";
            options = this.userOptions();
        }

        return (
            <div className="page-content">
                <h1>{userType} Functionality</h1>
                {options}
            </div>
        );
    }
}