import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import StaticData from '../data/StaticData';
import '../stylesheets/Main.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        if (typeof props.location.state === "undefined") {
            this.state = {
                redirectFromLogout: false,
                redirect: false,
                isAdmin: false,
                isCustomer: false,
                isManager: false,
                invalidLogin: false
            };
        } else {
            this.state = {
                redirectFromLogout: props.location.state.loggedOut,
                redirect: false,
                isAdmin: false,
                isCustomer: false,
                isManager: false,
                invalidLogin: false
            };
        }
    }

    login(e) {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let allUsernames = StaticData.getAllUsernames();
        if (allUsernames.includes(username)) {
            if (password === StaticData.getPassword(username)) {
                StaticData.setCurrentUser(username);
                let userType = StaticData.getUserType(username);
                this.setState({
                    redirect: true,
                    isAdmin: userType[0],
                    isCustomer: userType[1],
                    isManager: userType[2],
                    invalidLogin: false
                });
            }
        } else {
            this.setState({ invalidLogin: true });
        }
    }

    logoutMsg() {
        if (this.state.redirectFromLogout) {
            return (<p style={{ color: "red" }}>You have been logged out.</p>);
        }
    }

    invalidLogin() {
        if (this.state.invalidLogin) {
            return (<p style={{ color: "red" }}>Invalid login.</p>);
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={{
                pathname: "/functionality",
                state: {
                    isAdmin: this.state.isAdmin,
                    isCustomer: this.state.isCustomer,
                    isManager: this.state.isManager
                }
            }} />);
        }

        return (
            <div className="page-content">
                <h1>Atlanta Movie Login</h1>
                {this.logoutMsg()}
                {this.invalidLogin()}
                <form className="vertical-list">
                    <div className="input-field">
                        Username: <input type="text" name="username" id="username"/>
                    </div>
                    <div className="input-field">
                        Password: <input type="text" name="password" id="password"/>
                    </div>
                    <div className="button-group">
                        <input className="button" type="submit" value="Login" onClick={e => this.login(e)} />
                        <Link to="/registernav" className="button">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}