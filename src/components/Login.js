import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class Login extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Atlanta Movie Login</h1>
                <form className="vertical-list">
                    <div className="input-field">
                        Username: <input type="text" name="username" />
                    </div>
                    <div className="input-field">
                        Password: <input type="text" name="password" />
                    </div>
                    <div className="button-group">
                        <input className="button" type="submit" value="Login" />
                        <Link to="/registernav">
                            <input className="button" type="submit" value="Register" />
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}