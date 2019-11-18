import React, { Component } from 'react';
import '../stylesheets/Main.css';

export default class RegisterNav extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Register Navigation</h1>
                <div className="vertical-list">
                    <button className="button">User Only</button>
                    <button className="button">Customer Only</button>
                    <button className="button">Manager Only</button>
                    <button className="button">Manager-Customer Only</button>
                    <button className="button">Back</button>
                </div>
            </div>
        );
    }
}