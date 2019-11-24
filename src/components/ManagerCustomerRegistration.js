import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class ManagerCustomerRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showMessage: false,
            message: ""
        }
    }

    register(e) {
        e.preventDefault();
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let username = document.getElementById("username").value;
        let company = document.getElementById("company").value;
        let pw = document.getElementById("pw").value;
        let confirmpw = document.getElementById("confirmpw").value;
        let street = document.getElementById("street").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let zip = document.getElementById("zip").value;
        //TODO: credit card nums

        if (fname.length === 0 || lname.length === 0 || username.length === 0 ||
            pw.length === 0 || confirmpw.length === 0 || company.length === 0 ||
            street.length === 0 || city.length === 0 || state.length === 0 || zip.length === 0) {
            this.setState({
                showMessage: true,
                message: "Please fill out all fields"
            });
            return;
        }

        let allUsernames = StaticData.getAllUsernames();
        if (allUsernames.includes(username)) {
            this.setState({
                showMessage: true,
                message: "Username is taken"
            });
            return;
        } else if (pw.length < 8) {
            this.setState({
                showMessage: true,
                message: "Password must be at least 8 characters"
            });
            return;
        } else if (pw !== confirmpw) {
            this.setState({
                showMessage: true,
                message: "Confirm password does not match password"
            });
            return;
        }
        //TODO: check for unique address

        StaticData.registerManagerCustomer(fname, lname, username, pw);
        this.setState({ redirect: true });
    }

    showMessage() {
        if (this.state.showMessage) {
            return (<p style={{ color: "red" }}>{this.state.message}</p>);
        }
    }

    companyDropdown() {
        //TODO: retrieve company list
        return (
            <select name="company" id="company">
                <option value="AMC">AMC</option>
            </select>
        );
    }

    stateDropdown() {
        //TODO: retrieve state list
        return (
            <select name="state" id="state">
                <option value="GA">GA</option>
            </select>
        );
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/functionality" />);
        }

        return (
            <div className="page-content">
                <h1>Manager-Customer Registration</h1>
                {this.showMessage()}
                <div id="manager-customer-registration">
                    <div className="input-field input-fname">
                        First Name: <input type="text" name="fname" id="fname" />
                    </div>
                    <div className="input-field input-lname">
                        Last Name: <input type="text" name="lname" id="lname" />
                    </div>
                    <div className="input-field input-username">
                        Username: <input type="text" name="username" id="username" />
                    </div>
                    <div className="input-field input-company">
                        Company: {this.companyDropdown()}
                    </div>
                    <div className="input-field input-pw">
                        Password: <input type="text" name="pw" id="pw" />
                    </div>
                    <div className="input-field input-confirmpw">
                        Confirm Password: <input type="text" name="confirmpw" id="confirmpw" />
                    </div>
                    <div className="input-field input-street">
                        Street Address: <input type="text" name="street" id="street" />
                    </div>
                    <div className="input-field input-city">
                        City: <input type="text" name="city" id="city" />
                    </div>
                    <div className="input-field input-state">
                        State: {this.stateDropdown()}
                    </div>
                    <div className="input-field input-zip">
                        Zipcode: <input type="text" name="zip" id="zip" />
                    </div>
                    <div className="credit-card-nums">
                        Credit Card #
                    </div>
                </div>
                <div className="button-group">
                    <Link to="/registernav" className="button">Back</Link>
                    <input className="button" type="submit" value="Register" onClick={e => this.register(e)} />
                </div>
            </div>
        );
    }
}