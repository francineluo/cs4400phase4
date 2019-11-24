import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class ManageUser extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Manage User</h1>
                <div className="vertical-list">
                    <div className="horizontal-list">
                        <div className="input-field">
                            Username: <input type="text" name="username" />
                        </div>
                        <div className="input-field">
                            Status: <input type="text" name="status" />
                        </div>
                    </div>
                    <div className="button-group">
                        <div className="button">Filter</div>
                        <div className="button">Approve</div>
                        <div className="button">Decline</div>
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Credit Card Count</th>
                            <th>User Type</th>
                            <th>Status</th>
                        </tr>
                        <tr>
                            <td>dummy data</td>
                            <td>dummy data</td>
                            <td>dummy data</td>
                            <td>dummy data</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={{ pathname: "/functionality", state: { isAdmin: true } }} className="button" style={{ width: "fit-content" }}>Back</Link>
                </div>
            </div>
        );
    }
}