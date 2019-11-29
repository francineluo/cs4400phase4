import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class RegisterNav extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Register Navigation</h1>
                <div className="vertical-list">
                    <Link to="/userregistration" className="button">User Only</Link>
                    <Link to="/customerregistration" className="button">Customer Only</Link>
                    <Link to="/managerregistration" className="button">Manager Only</Link>
                    <Link to="/managercustomerregistration" className="button">Manager-Customer</Link>
                    <Link to="/login" className="button">Back</Link>
                </div>
            </div>
        );
    }
}