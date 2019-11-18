import React, { Component } from 'react';
import '../stylesheets/Main.css';
import RegisterNav from './RegisterNav';

export default class Login extends Component {
    componentDidMount() {
        this.setState({
            register: false,
        });
    }

    register(e) {
        e.preventDefault();
        this.setState({
            register: true,
        });
    }

    render() {
        if (this.state && this.state.register) {
            return (
                <RegisterNav />
            );
        }
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
                        <input className="button" type="submit" value="Register" onClick={e => this.register(e)} />
                    </div>
                </form>
            </div>
        );
    }
}