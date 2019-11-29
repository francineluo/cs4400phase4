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
            message: "",
            allUsernames: [],
            userInfo: []
        }
        this.getAllUsernames = this.getAllUsernames.bind(this);
    }

    componentDidMount() {
        this.getAllUsernames();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.userInfo !== this.state.userInfo) {
            StaticData.setCurrentUser(this.state.userInfo);
            this.setState({ redirect: true });
        }
    }

    getAllUsernames() {
        fetch("/api/get_all_usernames")
            .then(response => response.json())
            .then(data => this.setState({ allUsernames: data }));
    }

    checkFields() {
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
            return false;
        }

        let usernameArray = [];
        for (let i in this.state.allUsernames) {
            usernameArray.push(this.state.allUsernames[i].username);
        }
        if (usernameArray.includes(username)) {
            this.setState({
                showMessage: true,
                message: "Username is taken"
            });
            return false;
        } else if (pw.length < 8) {
            this.setState({
                showMessage: true,
                message: "Password must be at least 8 characters"
            });
            return false;
        } else if (pw !== confirmpw) {
            this.setState({
                showMessage: true,
                message: "Confirm password does not match password"
            });
            return false;
        }
        return true;
    }

    register(e) {
        e.preventDefault();
        if (this.checkFields()) {
            //register
            var url = new URL("http://" + window.location.host + "/api/user_register");
            var params = {
                username: document.getElementById("username").value,
                password: document.getElementById("pw").value,
                fname: document.getElementById("fname").value,
                lname: document.getElementById("lname").value
            };
            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json());

            //login
            url = new URL("http://" + window.location.host + "/api/user_login");
            params = {
                username: document.getElementById("username").value,
                password: document.getElementById("pw").value
            };
            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json());

            fetch("/api/get_user_info")
                .then(response => response.json())
                .then(data => this.setState({ userInfo: data }));
        }
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
                        Password: <input type="password" name="pw" id="pw" />
                    </div>
                    <div className="input-field input-confirmpw">
                        Confirm Password: <input type="password" name="confirmpw" id="confirmpw" />
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