import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class UserRegistration extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>User Registration</h1>
                <div id="user-registration">
                    <div className="input-field input-fname">
                        First Name: <input type="text" name="fname" />
                    </div>
                    <div className="input-field input-lname">
                        Last Name: <input type="text" name="lname" />
                    </div>
                    <div className="input-field input-username">
                        Username: <input type="text" name="username" />
                    </div>
                    <div className="input-field input-pw">
                        Password: <input type="text" name="pw" />
                    </div>
                    <div className="input-field input-confirmpw">
                        Confirm Password: <input type="text" name="confirmpw" />
                    </div>
                </div>
                <div className="button-group">
                    <Link to="/registernav" className="button">Back</Link>
                    <Link to={{ pathname: "/functionality", state: {} }} className="button">Register</Link>
                </div>
            </div>
        );
    }
}