import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class Functionality extends Component {
    constructor(props) {
        super(props);
        /*TODO: once we start storing the current user's information, grab the user type
         * from the current user instead of having it passed through the props. if there is
         * no current user (i.e. not logged in), redirect to login page.*/
        if (typeof props.location.state == "undefined") {
            this.state = { loggedIn: false };
        } else {
            this.state = {
                loggedIn: true,
                isCustomer: props.location.state.isCustomer,
                isManager: props.location.state.isManager,
                isAdmin: props.location.state.isAdmin
            };
        }
    }

    userOptions() {
        return (
            <div className="functionality-options">
                <Link to="/" className="button">Explore Theater</Link>
                <Link to="/" className="button">Visit History</Link>
                <Link to="/" className="button">Back</Link>
            </div>
        );
    }

    customerOptions() {
        return (
            <div className="functionality-options">
                <Link to="/" className="button">Explore Movie</Link>
                <Link to="/" className="button">View History</Link>
                <Link to="/" className="button">Explore Theater</Link>
                <Link to="/" className="button">Visit History</Link>
                <Link to="/" className="button">Back</Link>
            </div>
        );
    }

    managerOptions() {
        return (
            <div className="functionality-options">
                <Link to="/" className="button">Theater Overview</Link>
                <Link to="/" className="button">Schedule Movie</Link>
                <Link to="/" className="button">Explore Theater</Link>
                <Link to="/" className="button">Visit History</Link>
                <Link to="/" className="button">Back</Link>
            </div>
        );
    }

    customerManagerOptions() {
        return (
            <div className="functionality-options">
                <Link to="/" className="button">Explore Movie</Link>
                <Link to="/" className="button">View History</Link>
                <Link to="/" className="button">Theater Overview</Link>
                <Link to="/" className="button">Schedule Movie</Link>
                <Link to="/" className="button">Explore Theater</Link>
                <Link to="/" className="button">Visit History</Link>
                <Link to="/" className="button">Back</Link>
            </div>
        );
    }

    adminOptions() {
        return (
            <div className="functionality-options">
                <Link to="/" className="button">Manage User</Link>
                <Link to="/" className="button">Manage Company</Link>
                <Link to="/" className="button">Create Movie</Link>
                <Link to="/" className="button">Explore Theater</Link>
                <Link to="/" className="button">Visit History</Link>
                <Link to="/" className="button">Back</Link>
            </div>
        );
    }

    adminCustomerOptions() {
        return (
            <div className="functionality-options">
                <Link to="/" className="button">Manage User</Link>
                <Link to="/" className="button">Manage Company</Link>
                <Link to="/" className="button">Create Movie</Link>
                <Link to="/" className="button">Explore Movie</Link>
                <Link to="/" className="button">View History</Link>
                <Link to="/" className="button">Explore Theater</Link>
                <Link to="/" className="button">Visit History</Link>
                <Link to="/" className="button">Back</Link>
            </div>
        );
    }

    render() {
        if (!this.state.loggedIn) {
            return (<Redirect to="/login" />);
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
            options = this.customerManagerOptions();
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