import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class ManagerCustomerRegistration extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Customer Registration</h1>
                <div id="manager-customer-registration">
                    <div className="input-field input-fname">
                        First Name: <input type="text" name="fname" />
                    </div>
                    <div className="input-field input-lname">
                        Last Name: <input type="text" name="lname" />
                    </div>
                    <div className="input-field input-username">
                        Username: <input type="text" name="username" />
                    </div>
                    <div className="input-field input-company">
                        Company: <input type="text" name="company" />
                    </div>
                    <div className="input-field input-pw">
                        Password: <input type="text" name="pw" />
                    </div>
                    <div className="input-field input-confirmpw">
                        Confirm Password: <input type="text" name="confirmpw" />
                    </div>
                    <div className="input-field input-street">
                        Street Address: <input type="text" name="street" />
                    </div>
                    <div className="input-field input-city">
                        City: <input type="text" name="city" />
                    </div>
                    <div className="input-field input-state">
                        State: <input type="text" name="state" />
                    </div>
                    <div className="input-field input-zip">
                        Zipcode: <input type="text" name="zip" />
                    </div>
                    <div className="credit-card-nums">
                        Credit Card #
                    </div>
                </div>
                <div className="button-group">
                    <Link to="/registernav" className="button">Back</Link>
                    <Link to="/managercustomerfunctionality" className="button">Register</Link>
                </div>
            </div>
        );
    }
}