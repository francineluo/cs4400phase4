import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class CompanyDetail extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Company Detail</h1>
                <p>Name: Landmark</p>
                <p>Employees: Clara Wilson, James Smith</p>
                <p><b>Theaters</b></p>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Manager</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Capacity</th>
                        </tr>
                        <tr>
                            <td>dummy data</td>
                            <td>dummy data</td>
                            <td>dummy data</td>
                            <td>dummy data</td>
                            <td>dummy data</td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-group">
                    <Link to={{ pathname: "/functionality", state: { isAdmin: true } }} className="button">Back</Link>
                </div>
            </div>
        );
    }
}