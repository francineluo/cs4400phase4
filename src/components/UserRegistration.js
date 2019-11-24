import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class UserRegistration extends Component {
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
        let pw = document.getElementById("pw").value;
        let confirmpw = document.getElementById("confirmpw").value;

        if (fname.length === 0 || lname.length === 0 || username.length === 0 ||
            pw.length === 0 || confirmpw.length === 0) {
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

        StaticData.registerUser(fname, lname, username, pw);
        this.setState({ redirect: true });
    }

    showMessage() {
        if (this.state.showMessage) {
            return (<p style={{ color: "red" }}>{this.state.message}</p>);
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/functionality" />);
        }

        return (
            <div className="page-content">
                <h1>User Registration</h1>
                {this.showMessage()}
                <div id="user-registration">
                    <div className="input-field input-fname">
                        First Name: <input type="text" name="fname" id="fname" />
                    </div>
                    <div className="input-field input-lname">
                        Last Name: <input type="text" name="lname" id="lname" />
                    </div>
                    <div className="input-field input-username">
                        Username: <input type="text" name="username" id="username" />
                    </div>
                    <div className="input-field input-pw">
                        Password: <input type="text" name="pw" id="pw" />
                    </div>
                    <div className="input-field input-confirmpw">
                        Confirm Password: <input type="text" name="confirmpw" id="confirmpw" />
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