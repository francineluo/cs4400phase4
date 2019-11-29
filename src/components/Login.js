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
                userInfo: [],
                invalidLogin: false
            };
        } else {
            this.state = {
                redirectFromLogout: props.location.state.loggedOut,
                redirect: false,
                userInfo: [],
                invalidLogin: false
            };
        }
        this.login = this.login.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.userInfo !== this.state.userInfo) {
            if (this.state.userInfo.length === 0) {
                this.setState({ redirectFromLogout: false, invalidLogin: true });
            } else {
                this.setState({
                    redirectFromLogout: false,
                    redirect: true,
                    invalidLogin: false
                });
            }
        }
    }

    login(e) {
        e.preventDefault();
        var url = new URL("http://" + window.location.host + "/api/user_login");
        var params = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => response.json())
            .then(fetch("/api/get_user_info")
            .then(response => response.json())
            .then(data => {
                StaticData.setCurrentUser(data);
                this.setState({ userInfo: data });
            }));
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
            return (<Redirect to="/functionality" />);
        }

        return (
            <div className="page-content">
                <h1>Atlanta Movie Login</h1>
                {this.logoutMsg()}
                {this.invalidLogin()}
                <form className="vertical-list">
                    <div className="input-field">
                        Username: <input type="text" name="username" id="username" />
                    </div>
                    <div className="input-field">
                        Password: <input type="password" name="password" id="password" />
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